package config

import (
	"fmt"
	"time"

	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewDatabase(viper *viper.Viper) *gorm.DB {
	username := viper.GetString("database.username")
	// password := viper.GetString("database.password")
	host := viper.GetString("database.host")
	port := viper.GetInt("database.port")
	database := viper.GetString("database.name")
	idleConnection := viper.GetInt("database.pool.idle")
	maxConnection := viper.GetInt("database.pool.max")
	maxLifeTimeConnection := viper.GetInt("database.pool.lifetime")

	// dsnss := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, database)

	// db, err := gorm.Open(mysql.Open(dsn))a

	// dsn := "host=localhost user=lawrient  dbname=pinterest_clone port=5432 sslmode=disable TimeZone=Asia/Shanghai"

	dsn := fmt.Sprintf("host=%s user=%s dbname=%s port=%d sslmode=%s TimeZone=Asia/Makassar", host, username, database, port, "disable")
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		fmt.Println("failed to connect database:", err)
	}

	connection, err := db.DB()
	if err != nil {
		fmt.Println("failed to connect database:", err)
	}

	connection.SetMaxIdleConns(idleConnection)
	connection.SetMaxOpenConns(maxConnection)
	connection.SetConnMaxLifetime(time.Second * time.Duration(maxLifeTimeConnection))

	return db
}
