package database

import (
	"sportsfolio/models"
	"sportsfolio/models/RecievedData"
)

type DatabaseRepo interface {
	UpdateEvent(details models.TournamentDetails) error
	DeleteEvent(eventname string) error
	GetPlayersOfOneTeam(userdata RecievedData.PastTeamDetails) ([]models.Player, error)
	GetCaptainDetails(userdata RecievedData.PastTeamDetails) (models.Player, error)
	GetDetailsByTeamname(details RecievedData.TeamDetails) (RecievedData.TeamDetails, bool, error)
	CheckForUserInEvent(userData RecievedData.PastTeamDetails) (bool, error)
	CreateNewTeam(details RecievedData.TeamDetails) error
	GetTournamentDetailsByEventName(eventname string) (models.TournamentDetails, error)
	GetAllCards() ([]models.TournamentCard, error)
	GetCardDetails(username string) ([]models.TournamentCard, error)
	CreateNewTournament(tournament models.TournamentDetails) error
	CheckLoginUser(user models.User) (bool, error)
	CreateNewUser(user models.User) error
}
