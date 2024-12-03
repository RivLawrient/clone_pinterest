package person

import "time"

type Person struct {
	ID        string `gorm:"primaryKey"`
	Name      string `gorm:"not null;unique"`
	CreatedAt time.Time
}

func (p *Person) TableName() string {
	return "person"
}
