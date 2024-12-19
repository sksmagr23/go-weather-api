package utils

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Data    interface{} `json:"weather-data,omitempty"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func RespondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	response := Response{
		Data:    data,
	}
	json.NewEncoder(w).Encode(response)
}

func RespondErrorJSON(w http.ResponseWriter, status int, errorMessage string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	response := ErrorResponse{
		Error: errorMessage,
	}
	json.NewEncoder(w).Encode(response)
}
