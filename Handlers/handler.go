package Handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sportsfolio/database"
	"sportsfolio/database/dbrepo"
	"sportsfolio/drivers"
	"sportsfolio/models"
	RecievedData2 "sportsfolio/models/RecievedData"
	"time"
)

var Repo *Repository

type Repository struct {
	DB database.DatabaseRepo
}

func NewRepository(db *drivers.DB) *Repository {
	return &Repository{
		dbrepo.NewPostgresRepo(db.SQL),
	}
}

func NewHandler(r *Repository) {
	Repo = r
}

func (m *Repository) Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error in decoding JSON", http.StatusBadRequest)
		fmt.Println("Error in decoding JSON:", err)
		return
	}

	fmt.Println(user)

	err = m.DB.CreateNewUser(user)
	if err != nil {
		http.Error(w, "Error in creating user", http.StatusInternalServerError)
		fmt.Println("Error in creating user:", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode("User created successfully")
	if err != nil {
		fmt.Println("Error in encoding JSON:", err)
		return
	}
}

func (m *Repository) Login(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		fmt.Println("Error in decoding login JSON")
		return
	}
	fmt.Println(user)

	b, err := m.DB.CheckLoginUser(user)
	if err != nil {
		fmt.Println("Error in checking login user")
		return
	}
	response := map[string]interface{}{}
	if b {
		response = map[string]interface{}{
			"message": "Login Successfully",
			"check":   []map[string]string{{"_id": user.Username}},
		}

	} else {
		response = map[string]interface{}{
			"message": "Login Unsuccessful",
			"check":   []map[string]string{{"_id": user.Username}},
		}
	}
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		fmt.Println("Error in encoding response", err)
		return
	}
}

func (m *Repository) NewTournament(w http.ResponseWriter, r *http.Request) {
	var RecievedData RecievedData2.TournamentDetails
	var tournament models.TournamentDetails
	err := json.NewDecoder(r.Body).Decode(&RecievedData)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	fmt.Println(RecievedData)
	tournament.UserName = RecievedData.UserName
	tournament.EventName = RecievedData.EventName
	tournament.Email = RecievedData.Email
	tournament.Sport = RecievedData.Sport
	tournament.Participants = RecievedData.Participants
	tournament.Tagline = RecievedData.Tagline
	tournament.Venue = RecievedData.Venue
	layout := "2006-01-02"
	tournament.ApplicationOpen, err = time.Parse(layout, RecievedData.ApplicationOpen)
	if err != nil {
		fmt.Println("Error in parsing application open", err)
		return
	}
	tournament.ApplicationClose, err = time.Parse(layout, RecievedData.ApplicationClose)
	if err != nil {
		fmt.Println("Error in parsing application close")
	}
	tournament.SportsthonOpen, err = time.Parse(layout, RecievedData.SportsthonOpen)
	if err != nil {
		fmt.Println("Error in parsing sportsthonOpen")
	}
	tournament.SportsthonClose, err = time.Parse(layout, RecievedData.SportsthonClose)
	if err != nil {
		fmt.Println("Error in parsing sportsthonClose")
	}
	err = m.DB.CreateNewTournament(tournament)
	if err != nil {
		fmt.Println("Error in creating tournament", err)
		return
	}
	response := map[string]interface{}{
		"message": "exist",
	}
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		fmt.Println("Error in encoding response", err)
		return
	}
}

type HostName struct {
	Username string `json:"username"`
}

func (m *Repository) HostCardsGeneration(w http.ResponseWriter, r *http.Request) {
	var name HostName
	err := json.NewDecoder(r.Body).Decode(&name)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	//fmt.Println(name)
	var Cards []models.TournamentCard
	Cards, err = m.DB.GetCardDetails(name.Username)
	if err != nil {
		fmt.Println("Error in getting card details", err)
	}
	response := map[string]interface{}{
		"data": Cards,
	}
	//fmt.Println(Card)
	err = json.NewEncoder(w).Encode(response)
}

func (m *Repository) HostCardForJoining(w http.ResponseWriter, r *http.Request) {
	//var cards []models.TournamentCard
	cards, err := m.DB.GetAllCards()
	if err != nil {
		fmt.Println("Error in getting all cards", err)
		return
	}
	response := map[string]interface{}{
		"data": cards,
	}
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		fmt.Println("Error in encoding response", err)
		return
	}
}

func (m *Repository) TournamentDetails(w http.ResponseWriter, r *http.Request) {
	//eventname := chi.URLParam(r, "id")
	//fmt.Println(eventname)
	var tName RecievedData2.DetailsRequest
	err := json.NewDecoder(r.Body).Decode(&tName)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	//var cards []models.TournamentCard
	fmt.Println(tName.Data.Eventname)
	details, err := m.DB.GetTournamentDetailsByEventName(tName.Data.Eventname)
	if err != nil {
		fmt.Println("Error in getting card details", err)
		return
	}
	data := map[string]interface{}{
		"sport":   details.Sport,
		"tagline": details.Tagline,
		//"venue":details.Venue,
		//"ene"details.EventName
		"sportsthon_open":  details.SportsthonOpen,
		"sportsthon_close": details.SportsthonClose,
	}
	response := map[string]interface{}{
		"data": data,
	}
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		fmt.Println("Error in encoding response", err)
		return
	}
}

func (m *Repository) NewTeam(w http.ResponseWriter, r *http.Request) {
	var teamDetails RecievedData2.TeamDetails
	err := json.NewDecoder(r.Body).Decode(&teamDetails)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	fmt.Println(teamDetails)
	teamDetails.Captain = teamDetails.Playername
	err = m.DB.CreateNewTeam(teamDetails)
	if err != nil {
		fmt.Println("Error in creating team", err)
		return
	}

}

func (m *Repository) PastTeam(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("Hello")
	var pastTeamDetails RecievedData2.PastTeamDetails
	err := json.NewDecoder(r.Body).Decode(&pastTeamDetails)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	fmt.Println(pastTeamDetails)
	exists, err := m.DB.CheckForUserInEvent(pastTeamDetails)
	if err != nil {
		fmt.Println("Error in checking if user exists", err)
		return
	}
	type ResponseData struct {
		Status bool `json:"status"`
	}
	//var players []models.Player
	//players = append(players, player)
	//cap := models.Player{PlayerName: "Captain Name", PhoneNo: "1234567890"}
	var response ResponseData
	response.Status = exists

	//fmt.Println(response)
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(response)
}

func (m *Repository) JoinTeam(w http.ResponseWriter, r *http.Request) {
	var teamDetails RecievedData2.TeamDetails
	err := json.NewDecoder(r.Body).Decode(&teamDetails)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	fmt.Println(teamDetails)
	teamDetails, b, err := m.DB.GetDetailsByTeamname(teamDetails)
	response := map[string]interface{}{
		"status": b,
	}
	if err != nil {
		fmt.Println("Error in getting details by team name", err)
		return
	}
	if b {
		fmt.Println(teamDetails)
		err := m.DB.CreateNewTeam(teamDetails)
		if err != nil {
			fmt.Println("Error in creating team", err)
			return
		}
	}
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		fmt.Println("Error in encoding response", err)
		return
	}
}

func (m *Repository) Captain(w http.ResponseWriter, r *http.Request) {
	var reqData struct {
		RequestData struct {
			Eventname string `json:"eventName"`
			ID        string `json:"id"`
		} `json:"data"`
	}

	if err := json.NewDecoder(r.Body).Decode(&reqData); err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	fmt.Println(reqData)
	var teamDetails RecievedData2.PastTeamDetails
	teamDetails.Username = reqData.RequestData.ID
	teamDetails.Data.Eventname = reqData.RequestData.Eventname
	fmt.Println(teamDetails)
	captain, err := m.DB.GetCaptainDetails(teamDetails)
	if err != nil {
		fmt.Println("Error in getting captain details", err)
		return
	}
	players, err := m.DB.GetPlayersOfOneTeam(teamDetails)
	if err != nil {
		return
	}
	type ResponseData struct {
		Data []models.Player `json:"data"`
		Cap  models.Player   `json:"cap"`
	}

	resData := ResponseData{
		Data: players,
		Cap:  captain,
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resData); err != nil {
		fmt.Println("Error in encoding response", err)
	}
}

func (m *Repository) DeleteTournament(w http.ResponseWriter, r *http.Request) {
	//var details RecievedData2.DetailsRequest
	var reqBody struct {
		ID string `json:"id"`
	}
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	//fmt.Println(reqBody)
	err = m.DB.DeleteEvent(reqBody.ID)
	if err != nil {
		fmt.Println("Error in deleting event", err)
		return
	}

}

func (m *Repository) UpdateEvent(w http.ResponseWriter, r *http.Request) {
	var RecievedData RecievedData2.TournamentDetails
	var tournament models.TournamentDetails
	err := json.NewDecoder(r.Body).Decode(&RecievedData)
	if err != nil {
		fmt.Println("Error in decoding JSON", err)
		return
	}
	fmt.Println(RecievedData)
	tournament.UserName = RecievedData.UserName
	tournament.EventName = RecievedData.EventName
	tournament.Email = RecievedData.Email
	tournament.Sport = RecievedData.Sport
	tournament.Participants = RecievedData.Participants
	tournament.Tagline = RecievedData.Tagline
	tournament.Venue = RecievedData.Venue
	layout := "2006-01-02"
	tournament.ApplicationOpen, err = time.Parse(layout, RecievedData.ApplicationOpen)
	if err != nil {
		fmt.Println("Error in parsing application open", err)
		return
	}
	tournament.ApplicationClose, err = time.Parse(layout, RecievedData.ApplicationClose)
	if err != nil {
		fmt.Println("Error in parsing application close")
	}
	tournament.SportsthonOpen, err = time.Parse(layout, RecievedData.SportsthonOpen)
	if err != nil {
		fmt.Println("Error in parsing sportsthonOpen")
	}
	tournament.SportsthonClose, err = time.Parse(layout, RecievedData.SportsthonClose)
	if err != nil {
		fmt.Println("Error in parsing sportsthonClose")
	}
	//fmt.Println(tournament)
	err = m.DB.UpdateEvent(tournament)
	if err != nil {
		fmt.Println("Error in updating event", err)
		return
	}
	response := map[string]interface{}{
		"message": "exist",
	}
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		fmt.Println("Error in encoding response", err)
		return
	}
}
