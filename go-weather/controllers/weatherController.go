package controllers

import (
	"context"
	"net/http"
	"weather-go/services"
	"weather-go/utils"

	"go.mongodb.org/mongo-driver/mongo"
)

type WeatherController struct {
	DB *mongo.Database
}

func (wc *WeatherController) GetWeather(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	city := query.Get("city")
	if city == "" {
		utils.RespondErrorJSON(w, http.StatusBadRequest, "City name is required")
		return
	}

	weatherData, err := services.FetchWeatherData(city)
	if err != nil {
		utils.RespondErrorJSON(w, http.StatusInternalServerError, err.Error())
		return
	}

	collection := wc.DB.Collection("weather")
	_, err = collection.InsertOne(context.Background(), weatherData)
	if err != nil {
		utils.RespondErrorJSON(w, http.StatusInternalServerError, "Failed to save current weather data to database")
		return
	}

	utils.RespondJSON(w, http.StatusOK, weatherData)
}

