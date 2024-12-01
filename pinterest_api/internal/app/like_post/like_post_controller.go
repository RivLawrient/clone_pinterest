package likePost

type LikePostController struct {
	LikePostUsecase *LikePostUsecase
}

func NewLikePostController(likePostUsecase *LikePostUsecase) *LikePostController {
	return &LikePostController{
		LikePostUsecase: likePostUsecase,
	}
}
