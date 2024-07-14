package models

import "time"

type TournamentDetails struct {
	UserName         string    `json:"userId"`
	EventName        string    `json:"name"`
	Sport            string    `json:"sport"`
	Email            string    `json:"email"`
	Participants     int       `json:"participants"`
	Tagline          string    `json:"tagline"`
	Venue            string    `json:"venue"`
	ApplicationOpen  time.Time `json:"application_open"`
	ApplicationClose time.Time `json:"application_close"`
	SportsthonOpen   time.Time `json:"sportsthon_open"`
	SportsthonClose  time.Time `json:"sportsthon_close"`
}

type TournamentCard struct {
	EventName string `json:"_id"`
	Sport     string `json:"sport"`
	Username  string `json:"name"`
	Tagline   string `json:"tagline"`
	Venue     string `json:"venue"`
}

type Player struct {
	PlayerName string `json:"playerName"`
	PhoneNo    string `json:"phoneNo"`
}
