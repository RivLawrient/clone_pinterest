package user

type User struct {
	ID         string  `gorm:"column:id;primaryKey"`
	Username   string  `gorm:"column:username"`
	FirstName  string  `gorm:"column:first_name"`
	LastName   *string `gorm:"column:last_name"`
	Email      string  `gorm:"column:email;unique"`
	Password   *string `gorm:"column:password"`
	IsGoogle   bool    `gorm:"column:is_google"`
	IsFacebook bool    `gorm:"column:is_facebook"`
	BirthDate  int64   `gorm:"column:birth_date"`
	ProfileImg string  `gorm:"column:profile_img"`
	Token      string  `gorm:"column:token"`
	CreatedAt  int64   `gorm:"column:created_at;autoCreateTime:milli"`
}

func (u *User) TableName() string {
	return "user"
}
