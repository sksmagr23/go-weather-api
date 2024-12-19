package routes

import (
	"weather-go/controllers"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

func WeatherRoutes(router *mux.Router, db *mongo.Database) {
	controller := &controllers.WeatherController{DB: db}
	
	router.HandleFunc("/weather", controller.GetWeather).Methods("GET")
}
