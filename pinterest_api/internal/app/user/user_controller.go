package user

type UserController struct {
	UserUsecase *UserUsecase
}

func NewUserController(userUsecase *UserUsecase) *UserController {
	return &UserController{
		UserUsecase: userUsecase,
	}
}
