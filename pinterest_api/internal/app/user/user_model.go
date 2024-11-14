package user

import "time"

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
