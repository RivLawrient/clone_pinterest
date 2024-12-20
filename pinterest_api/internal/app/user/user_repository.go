package user

import (
	"gorm.io/gorm"
)

type UserRepository struct {
}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (r *UserRepository) Create(db *gorm.DB, user *User) error {
	return db.Create(user).Error
}

func (r *UserRepository) Update(db *gorm.DB, user *User) error {
	return db.Save(user).Error
}

func (r *UserRepository) FindByUsername(db *gorm.DB, user *User, username string) error {
	return db.Where("username = ?", username).First(user).Error
}

func (r *UserRepository) FindIdByUsername(db *gorm.DB, username string) string {
	type result struct {
		Id string
	}
	data := new(result)
	query := db.Raw(`SELECT users.id FROM users WHERE users.username = ?`, username).Scan(data)

	if query.RowsAffected == 0 {
		return ""
	}

	return data.Id
}

func (r *UserRepository) FindIdByEmail(db *gorm.DB, email string) string {
	type result struct {
		Id string
	}

	data := new(result)
	query := db.Raw(`SELECT users.id FROM users WHERE users.email = ?`, email).Scan(data)

	if query.RowsAffected == 0 {
		return ""
	}

	return data.Id
}

func (r *UserRepository) FindAllByEmail(db *gorm.DB, email string) *User {
	data := new(User)
	query := db.Raw(`SELECT * FROM users WHERE users.email = ?`, email).Scan(data)

	if query.RowsAffected == 0 {
		return nil
	}

	return data
}

func (r *UserRepository) FindIdByToken(db *gorm.DB, token string) string {
	type result struct {
		Id string
	}

	data := new(result)
	query := db.Raw(`SELECT users.id FROM users WHERE users.token = ?`, token).Scan(data)

	if query.RowsAffected == 0 {
		return ""
	}

	return data.Id
}

func (r *UserRepository) FindAllByToken(db *gorm.DB, token string) *User {
	data := new(User)
	query := db.Raw(`SELECT * FROM users WHERE users.token = ?`, token).Scan(data)

	if query.RowsAffected == 0 {
		return nil
	}

	return data
}

func (r *UserRepository) FindOtherByUsername(db *gorm.DB, username string) *UserOtherResult {
	data := new(UserOtherResult)
	query := db.Raw(`SELECT users.id, users.username, users.profile_img FROM users WHERE users.username = ?`, username).Scan(data)

	if query.RowsAffected == 0 {
		return nil
	}

	return &UserOtherResult{
		Id:         data.Id,
		Username:   data.Username,
		FirstName:  data.FirstName,
		LastName:   data.LastName,
		ProfileImg: data.ProfileImg,
	}
}

func (r *UserRepository) UpdateBirthDateById(db *gorm.DB, userId string, birthDate string) *gorm.DB {
	return db.Exec(`UPDATE users SET birth_date = ? WHERE id = ?`, birthDate, userId)
}
