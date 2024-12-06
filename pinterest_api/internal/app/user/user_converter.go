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
