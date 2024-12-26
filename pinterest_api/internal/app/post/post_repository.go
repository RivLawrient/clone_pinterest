package post

import (
	"gorm.io/gorm"
)

type PostRepository struct {
}

func NewPostRepository() *PostRepository {
	return &PostRepository{}
}

func (r *PostRepository) Create(db *gorm.DB, post *Post) error {
	return db.Create(post).Error
}

func (r *PostRepository) CheckByImage(db *gorm.DB, post *Post, image string) error {

	return db.Table("post").Select("post.id as id").Where("post.image = ? ", image).First(post).Error
}

func (r *PostRepository) FindById(db *gorm.DB, post *Post, id string) error {
	return db.First(post, "id = ? ", id).Error
}

func (r *PostRepository) ListRandomExcept(db *gorm.DB, post *Post, posts *[]Post, id string) error {
	return db.Where("user_id != ?", id).Model(post).Limit(25).Order("RANDOM()").Find(posts).Error
}

func (r *PostRepository) ListByUser(db *gorm.DB, post *Post, posts *[]Post, user_id string) error {
	return db.Where("user_id = ? ", user_id).Model(post).Find(posts).Error
}

func (r *PostRepository) FindListRandom(db *gorm.DB, list *[]ListPost, userId string) error {
	return db.Table("post").
		Select(`post.id as id, post.image,
		CASE 
		WHEN save.id IS NOT NULL THEN TRUE
		ELSE FALSE 
		END AS save_status`).
		Joins("LEFT JOIN save ON post.id = save.post_id AND save.user_id = ?", userId).
		Limit(25).
		Order("RANDOM()").
		Scan(&list).Error
}

func (r *PostRepository) FindListByUser(db *gorm.DB, result *[]ListPost, userPost string, userId string) *gorm.DB {
	return db.Raw(`
SELECT
	post.id AS id,
	post.image,
	CASE
		WHEN save.id IS NOT NULL THEN TRUE
		ELSE FALSE
	END AS save_status
FROM
	"post"
	LEFT JOIN save ON post.id = save.post_id
	AND save.user_id = ?
WHERE
	post.user_id = ?;
	
	`, userId, userPost).Scan(result)
}

func (r *PostRepository) FindDetail(db *gorm.DB, post *DetailPostResult, userId string, postId string) *gorm.DB {
	return db.Table("post").
		Select(`
		post.id as id,
		post.title,
		post.description,
		post.image,
		users.username,
		users.profile_img,
		COUNT(L.id) AS total_like,
		CASE
			WHEN like_post.id IS NOT NULL THEN TRUE
			ELSE FALSE
		END AS like_status,
		CASE
			WHEN save.id IS NOT NULL THEN TRUE
			ELSE FALSE
		END AS save_status
		`).
		Joins("JOIN users ON users.id = post.user_id").
		Joins("LEFT JOIN like_post AS L ON L.post_id = post.id").
		Joins("LEFT JOIN like_post ON like_post.post_id = post.id AND like_post.user_id = ? ", userId).
		Joins("LEFT JOIN save ON save.post_id = post.id AND save.user_id = ? ", userId).
		Where("post.id = ? ", postId).
		Group(`
		post.id,
		post.title,
		post.description,
		post.image,
		users.username,
		users.profile_img,
		like_post.id,
		save.id
		`).Scan(post)

}

func (r *PostRepository) RemoveById(db *gorm.DB, userId string, postId string) *gorm.DB {
	return db.Where("id = ? AND user_id = ?", postId, userId).Delete(&Post{})
}
