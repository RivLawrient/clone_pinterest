package user

import "time"

type User struct {
	ID         string
	Username   string
	FirstName  string
	LastName   *string
	Email      string
	Password   *string
	IsGoogle   bool
	IsFacebook bool
	BirthDate  *time.Time
	ProfileImg *string
	Token      string
	CreatedAt  time.Time
}

func (u *User) TableName() string {
	return "users"
}
