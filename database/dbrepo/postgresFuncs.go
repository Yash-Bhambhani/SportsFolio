package dbrepo

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"sportsfolio/models"
	"sportsfolio/models/RecievedData"
	"time"
)

func (m *PostgresDBRepo) CreateNewUser(user models.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	query := `INSERT INTO users (fullname, username, email, password)
VALUES ($1, $2, $3, $4)`
	NewPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)
	if err != nil {
		return err
	}
	_, err = m.DB.ExecContext(ctx, query, user.Fullname, user.Username, user.Email, NewPassword)
	if err != nil {
		fmt.Println("Error in inserting new User", err)
		return err
	}
	return nil
}

func (m *PostgresDBRepo) CheckLoginUser(user models.User) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	var givenPassword string
	query := `select password from users where username = $1 `
	row := m.DB.QueryRowContext(ctx, query, user.Username)
	if row == nil {
		return false, nil
	}
	err := row.Scan(&givenPassword)
	if err != nil {
		fmt.Println("Error in checking user", err)
		return false, err
	}
	err = bcrypt.CompareHashAndPassword([]byte(givenPassword), []byte(user.Password))
	if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
		return false, nil
	} else if err != nil {
		fmt.Println("Error in decrypting password", err)
		return false, err
	}
	return true, nil
}

func (m *PostgresDBRepo) CreateNewTournament(tournament models.TournamentDetails) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `INSERT INTO public.tournaments (
        username, eventname, sport, email, participants, tagline, venue, application_open, application_close, sportsthon_open, sportsthon_close
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    );`
	_, err := m.DB.ExecContext(ctx, query, tournament.UserName, tournament.EventName, tournament.Sport, tournament.Email,
		tournament.Participants, tournament.Tagline, tournament.Venue, tournament.ApplicationOpen, tournament.ApplicationClose,
		tournament.SportsthonOpen, tournament.SportsthonClose)
	if err != nil {
		return err
	}
	return nil
}

func (m *PostgresDBRepo) GetCardDetails(username string) ([]models.TournamentCard, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `SELECT sport, username, tagline, venue,eventname FROM tournaments WHERE username = $1`
	rows, err := m.DB.QueryContext(ctx, query, username)
	if err != nil {
		fmt.Println("Error in executing query:", err)
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			fmt.Println("Error in closing rows:", err)
			return
		}
	}(rows)

	var cards []models.TournamentCard
	for rows.Next() {
		var card models.TournamentCard
		err := rows.Scan(&card.Sport, &card.Username, &card.Tagline, &card.Venue, &card.EventName)
		if err != nil {
			fmt.Println("Error in scanning tournament details:", err)
			return nil, err
		}
		cards = append(cards, card)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error in iterating over rows:", err)
		return nil, err
	}
	if len(cards) == 0 {
		return []models.TournamentCard{}, nil
	}

	return cards, nil
}

func (m *PostgresDBRepo) GetAllCards() ([]models.TournamentCard, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `SELECT sport, username, tagline, venue,eventname FROM tournaments`
	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		fmt.Println("Error in executing query:", err)
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			fmt.Println("Error in closing rows:", err)
			return
		}
	}(rows)

	var cards []models.TournamentCard
	for rows.Next() {
		var card models.TournamentCard
		err := rows.Scan(&card.Sport, &card.Username, &card.Tagline, &card.Venue, &card.EventName)
		if err != nil {
			fmt.Println("Error in scanning tournament details:", err)
			return nil, err
		}
		cards = append(cards, card)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error in iterating over rows:", err)
		return nil, err
	}
	if len(cards) == 0 {
		return []models.TournamentCard{}, nil
	}

	return cards, nil
}

func (m *PostgresDBRepo) GetTournamentDetailsByEventName(eventname string) (models.TournamentDetails, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `SELECT sport, tagline, venue,eventname,sportsthon_open,sportsthon_close FROM tournaments WHERE eventname = $1`

	var card models.TournamentDetails
	row := m.DB.QueryRowContext(ctx, query, eventname)
	err := row.Scan(&card.Sport, &card.Tagline, &card.Venue, &card.EventName, &card.SportsthonOpen, &card.SportsthonClose)
	if err != nil {
		fmt.Println("Error in scanning tournament details:", err)
		return models.TournamentDetails{}, err
	}
	return card, nil
}

func (m *PostgresDBRepo) CreateNewTeam(details RecievedData.TeamDetails) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	query := `INSERT INTO teamDetails (username,eventname,teamname,playername,teamsize,phonenumber,captain) 
				values ($1, $2, $3, $4, $5, $6, $7)`
	_, err := m.DB.QueryContext(ctx, query, details.Username, details.Data.Eventname, details.Teamname, details.Playername, details.Teamsize, details.Phonenumber, details.Captain)
	if err != nil {
		fmt.Println("Error in executing query:", err)
		return err
	}
	return nil
}

func (m *PostgresDBRepo) CheckForUserInEvent(userData RecievedData.PastTeamDetails) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	//var player models.Player
	//var players []models.Player
	query := `select count(*) from teamdetails where username = $1 and eventname = $2;`

	var count int
	Row := m.DB.QueryRowContext(ctx, query, userData.Username, userData.Data.Eventname)
	err := Row.Scan(&count)
	if err != nil {
		fmt.Println("Error in scanning tournament details:", err)
		return false, err
	}
	if count <= 0 {
		return false, errors.New("user does not exist")
	}
	return true, nil
}

func (m *PostgresDBRepo) GetDetailsByTeamname(details RecievedData.TeamDetails) (RecievedData.TeamDetails, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	query := `select teamsize,captain from teamdetails where teamname = $1 and eventname = $2`
	var teamDetails RecievedData.TeamDetails
	Row := m.DB.QueryRowContext(ctx, query, details.Teamname, details.Data.Eventname)
	err := Row.Scan(&teamDetails.Teamsize, &teamDetails.Captain)
	if errors.Is(err, sql.ErrNoRows) {
		fmt.Println("No rows were returned")
		return RecievedData.TeamDetails{}, false, err
	} else if err != nil {
		fmt.Println("Error in scanning team details:", err)
		return RecievedData.TeamDetails{}, false, err
	}
	teamDetails.Teamname = details.Teamname
	teamDetails.Playername = details.Playername
	teamDetails.Username = details.Username
	teamDetails.Data.Eventname = details.Data.Eventname
	teamDetails.Phonenumber = details.Phonenumber
	return teamDetails, true, nil
}

func (m *PostgresDBRepo) GetCaptainDetails(userdata RecievedData.PastTeamDetails) (models.Player, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	var CaptainDetails models.Player
	//var captain string
	query1 := `select captain from teamdetails where username = $1 and eventname = $2`
	row := m.DB.QueryRowContext(ctx, query1, userdata.Username, userdata.Data.Eventname)
	err := row.Scan(&CaptainDetails.PlayerName)
	if err != nil {
		fmt.Println("Error in scanning first query:", err)
		return models.Player{}, err
	}
	query2 := `select playername,phonenumber from teamdetails where playername = $1 and eventname = $2`
	row2 := m.DB.QueryRowContext(ctx, query2, CaptainDetails.PlayerName, userdata.Data.Eventname)
	err = row2.Scan(&CaptainDetails.PlayerName, &CaptainDetails.PhoneNo)
	if err != nil {
		fmt.Println("Error in scanning second query:", err)
		return models.Player{}, err
	}
	return CaptainDetails, nil
}

func (m *PostgresDBRepo) GetPlayersOfOneTeam(userdata RecievedData.PastTeamDetails) ([]models.Player, error) {
	//query := `select playername,playerid from teamdetails where username = $1 and eventname = $2`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	var players []models.Player
	query := `select playername,phonenumber,count(*) from teamdetails where teamname= 
    (select teamname from teamdetails where username = $1 and eventname = $2) and playername !=captain
	GROUP BY playername,phonenumber;`
	var count int
	rows, err := m.DB.QueryContext(ctx, query, userdata.Username, userdata.Data.Eventname)
	if err != nil {
		fmt.Println("Error in executing query:", err)
		return []models.Player{}, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			fmt.Println("Error in closing rows:", err)
			return
		}
	}(rows)

	for rows.Next() {
		var player models.Player
		err := rows.Scan(&player.PlayerName, &player.PhoneNo, &count)
		if err != nil {
			fmt.Println("Error in iterating over rows:", err)
			return []models.Player{}, err
		}
		if count <= 0 {
			fmt.Println("No rows returned", count)
			return []models.Player{}, nil
		}
		players = append(players, player)
	}
	if len(players) == 0 {
		fmt.Println("No players found")
		return []models.Player{}, nil
	}
	return players, nil
}

func (m *PostgresDBRepo) DeleteEvent(eventname string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	query := `DELETE FROM tournaments WHERE eventname =$1`
	_, err := m.DB.ExecContext(ctx, query, eventname)
	if err != nil {
		fmt.Println("Error in executing query:", err)
		return err
	}
	return nil
}

func (m *PostgresDBRepo) UpdateEvent(details models.TournamentDetails) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	query := `Update tournaments set username=$1,sport=$2,email=$3,participants=$4,tagline=$5,
				venue=$6,application_open=$7,application_close=$8,sportsthon_open=$9,sportsthon_close=$10
				where eventname=$11`
	_, err := m.DB.ExecContext(ctx, query, details.UserName, details.Sport, details.Email, details.Participants, details.Tagline,
		details.Venue, details.ApplicationOpen, details.ApplicationClose, details.SportsthonOpen, details.SportsthonClose, details.EventName)
	if err != nil {
		fmt.Println("Error in executing query:", err)
		return err
	}
	return nil
}
