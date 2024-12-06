package user

func UserToRegisterUserResponse(user *User) *RegisterUserResponse {
	return &RegisterUserResponse{
		Id:         user.ID,
		Username:   user.Username,
		FirstName:  user.FirstName,
		LastName:   *user.LastName,
		Email:      user.Email,
		IsGoogle:   user.IsGoogle,
		IsFacebook: user.IsFacebook,
		BirthDate:  user.BirthDate.Format("2006-01-02"),
		ProfileImg: *user.ProfileImg,
		Token:      user.Token,
		CreatedAt:  user.CreatedAt,
	}
}

func UserToUserResponse(user *User) *UserResponse {

	birth := new(string)
	if user.BirthDate != nil {
		result := user.BirthDate.Format("2006-01-02")
		birth = &result
	}

	return &UserResponse{
		Id:         user.ID,
		Username:   user.Username,
		FirstName:  user.FirstName,
		LastName:   *user.LastName,
		Email:      user.Email,
		IsGoogle:   user.IsGoogle,
		IsFacebook: user.IsFacebook,
		BirthDate:  birth,
		ProfileImg: *user.ProfileImg,
		Token:      user.Token,
		CreatedAt:  user.CreatedAt,
	}
}
