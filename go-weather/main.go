package main

import (
	"context"
	"log"
	"net/http"
	"weather-go/config"
	"weather-go/routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	config.LoadEnv()

	mongoURI := config.GetEnv("MONGO_URI")
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}

	err = client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	dbName := config.GetEnv("DB_NAME")
	db := client.Database(dbName)

	router := mux.NewRouter()
	routes.WeatherRoutes(router, db)

	allowedHeaders := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})

	port := config.GetEnv("PORT")
	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(allowedHeaders, allowedMethods, allowedOrigins)(router)))
}
