package person

import "time"

type Person struct {
	ID        string    `gorm:"primaryKey"`
	Name      string    `gorm:"not null;unique"`
	CreatedAt time.Time `gorm:"timestamp"`
}

func (p *Person) TableName() string {
	return "person"
}
