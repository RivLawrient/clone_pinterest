package user

import (
	"time"
)

type RegisterUserByEmailRequest struct {
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=8,max=100"`
	BirthDate int64  `json:"birth_date" validate:"required"`
}

type RegisterUserResponse struct {
	Id         string    `json:"id,omitempty"`
	Username   string    `json:"username,omitempty"`
	FirstName  string    `json:"first_name,omitempty"`
	LastName   string    `json:"last_name,omitempty"`
	Email      string    `json:"email,omitempty"`
	IsGoogle   bool      `json:"is_google,omitempty"`
	IsFacebook bool      `json:"is_facebook,omitempty"`
	BirthDate  time.Time `json:"birth_date,omitempty"`
	ProfileImg string    `json:"profile_img,omitempty"`
	Token      string    `json:"token,omitempty"`
	CreatedAt  time.Time `json:"created_at,omitempty"`
}

type LoginUserByEmailRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=100"`
}

type LoginUserResponse struct {
	Email string `json:"email,omitempty"`
	Token string `json:"token,omitempty"`
}

type GoogleUser struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	FamilyName    string `json:"family_name"`
	GivenName     string `json:"given_name"`
	Picture       string `json:"picture"`
}

type UserResponse struct {
	Id         string    `json:"id,omitempty"`
	Username   string    `json:"username,"`
	FirstName  string    `json:"first_name,omitempty"`
	LastName   string    `json:"last_name,omitempty"`
	Email      string    `json:"email,omitempty"`
	IsGoogle   bool      `json:"is_google,omitempty"`
	IsFacebook bool      `json:"is_facebook,omitempty"`
	BirthDate  time.Time `json:"birth_date,omitempty"`
	ProfileImg string    `json:"profile_img,"`
	CreatedAt  time.Time `json:"created_at,omitempty"`
}

type UserOtherResponse struct {
	Username   string `json:"username,"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	ProfileImg string `json:"profile_img,"`
	Follow     any    `json:"follow,omitempty"`
	Post       any    `json:"post,omitempty"`
	Saved      any    `json:"saved,omitempty"`
}
