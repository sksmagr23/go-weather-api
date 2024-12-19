package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"weather-go/config"
	"weather-go/models"
)

func FetchWeatherData(city string) (models.Weather, error) {
	apiKey := config.GetEnv("WEATHER_API_KEY")
	url := fmt.Sprintf("https://api.weatherapi.com/v1/current.json?key=%s&q=%s", apiKey, city)

	res, err := http.Get(url)
	if err != nil {
		return models.Weather{}, errors.New("failed to fetch data from API")
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		return models.Weather{}, errors.New("unable to complete the request")
	}

	var result struct {
		Location struct {
			Name      string `json:"name"`
			Country   string `json:"country"`
			Localtime string `json:"localtime"`
		} `json:"location"`
		Current struct {
			TempC     float64 `json:"temp_c"`
			Humidity  float64 `json:"humidity"`
			WindSpeed float64 `json:"wind_kph"`
			Pressure  float64 `json:"pressure_in"`
			Condition struct {
				Text string `json:"text"`
				Icon string `json:"icon"`
			} `json:"condition"`
		} `json:"current"`
	}

	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return models.Weather{}, errors.New("failed to decode weather data from json")
	}

	return models.Weather{
		City:        result.Location.Name,
		Country:     result.Location.Country,
		Temperature: fmt.Sprintf("%.1f°C", result.Current.TempC),
		Condition:   result.Current.Condition.Text,
		Humidity:    fmt.Sprintf("%.1f %%", result.Current.Humidity),
		WindSpeed:   fmt.Sprintf("%.1f km/h", result.Current.WindSpeed),
		Pressure:    fmt.Sprintf("%.1f inHg", result.Current.Pressure),
		Icon:        result.Current.Condition.Icon,
		Localtime:   result.Location.Localtime,
	}, nil
}
