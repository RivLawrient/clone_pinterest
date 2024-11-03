package user

type UserUsecase struct {
	UserRepository *UserRepository
}

func NewUserUsecase(userRepository *UserRepository) *UserUsecase {
	return &UserUsecase{
		UserRepository: userRepository,
	}
}
