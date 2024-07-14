package RecievedData

type TournamentDetails struct {
	UserName         string `json:"userId"`
	EventName        string `json:"name"`
	Sport            string `json:"sport"`
	Email            string `json:"email"`
	Participants     int    `json:"participants"`
	Tagline          string `json:"tagline"`
	Venue            string `json:"venue"`
	ApplicationOpen  string `json:"application_open"`
	ApplicationClose string `json:"application_close"`
	SportsthonOpen   string `json:"sportsthon_open"`
	SportsthonClose  string `json:"sportsthon_close"`
}
type DetailsRequest struct {
	Data struct {
		Eventname string `json:"id"`
	} `json:"data"`
}
type TeamDetails struct {
	Username string `json:"userId"`
	Data     struct {
		Eventname string `json:"id"`
	} `json:"data"`
	Playername  string `json:"name"`
	Teamname    string `json:"team"`
	Teamsize    int    `json:"size"`
	Phonenumber string `json:"phone"`
	Captain     string
}

type PastTeamDetails struct {
	Data struct {
		Eventname string `json:"id"`
	} `json:"data"`
	Username string `json:"userId"`
}

//name\":\"yash\",\"team\":\"aa\",\"size\":\"10\",\"phone\":\"8866700874\
