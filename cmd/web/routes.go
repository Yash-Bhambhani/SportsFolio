package main

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"net/http"
	"sportsfolio/Handlers"
)

func routes() http.Handler {
	mux := chi.NewRouter()

	mux.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:1234", "http://localhost:1234/signup", "*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "application/json"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	mux.Post("/signup", Handlers.Repo.Signup)
	mux.Post("/login", Handlers.Repo.Login)
	mux.Post("/landingpage/registration", Handlers.Repo.NewTournament)
	mux.Post("/landingpage/Host", Handlers.Repo.HostCardsGeneration)
	mux.Delete("/landingpage/Host", Handlers.Repo.DeleteTournament)
	mux.Post("/landingpage/HostCard", Handlers.Repo.HostCardForJoining)
	mux.Post("/landingpage/details", Handlers.Repo.TournamentDetails)
	mux.Post("/details/join", Handlers.Repo.NewTeam)
	mux.Post("/pastTeams", Handlers.Repo.PastTeam)
	mux.Post("/details/join/team", Handlers.Repo.JoinTeam)
	mux.Post("/details/join/team/o", Handlers.Repo.Captain)
	mux.Put("/landingpage/registration", Handlers.Repo.UpdateEvent)

	return mux
}
