package models

type Weather struct {
	ID          string `bson:"_id,omitempty" json:"id,omitempty"`
	City        string `json:"city"`
	Country     string `json:"country"`
	Temperature string `json:"temperature"`
	Condition   string `json:"condition"`
	Localtime   string `json:"localtime"`
	Humidity    string `json:"humidity"`
	WindSpeed   string `json:"wind_speed"`
	Pressure    string `json:"pressure"`
	Icon        string `json:"icon"`
}
