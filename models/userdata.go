package models

type User struct {
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Confirm  string `json:"confirm"`
}
