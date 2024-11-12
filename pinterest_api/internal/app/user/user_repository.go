package user

import "gorm.io/gorm"

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

func (r *UserRepository) UpdateTokenByEmail(db *gorm.DB, user *User, email string, token string) error {
	return db.Model(user).Where("email = ? ", email).Update("token", token).Error
}

func (r *UserRepository) FindByEmail(db *gorm.DB, user *User, email string) error {
	return db.Where("email = ?", email).First(user).Error
}

func (r *UserRepository) FindByUsername(db *gorm.DB, user *User, username string) error {
	return db.Where("username = ?", username).First(user).Error
}

func (r *UserRepository) FindyByToken(db *gorm.DB, user *User, token string) error {
	return db.Where("token = ?", token).First(user).Error
}
