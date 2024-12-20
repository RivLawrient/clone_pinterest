package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func NewDatabase(viper *viper.Viper) *gorm.DB {
	username := viper.GetString("database.username")
	password := viper.GetString("database.password")
	host := viper.GetString("database.host")
	port := viper.GetInt("database.port")
	database := viper.GetString("database.name")
	idleConnection := viper.GetInt("database.pool.idle")
	maxConnection := viper.GetInt("database.pool.max")
	maxLifeTimeConnection := viper.GetInt("database.pool.lifetime")

	// dsnss := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, database)

	// db, err := gorm.Open(mysql.Open(dsn))a

	// dsn := "host=localhost user=lawrient  dbname=pinterest_clone port=5432 sslmode=disable TimeZone=Asia/Shanghai"

	// dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s TimeZone=Asia/Makassar", host, username, password, database, port, "disable")
	var dsn string
	if password == "" {
		// Jika password kosong, tidak sertakan parameter password
		dsn = fmt.Sprintf(
			"host=%s user=%s dbname=%s port=%d sslmode=%s TimeZone=Asia/Makassar",
			host, username, database, port, "disable",
		)
	} else {
		// Jika password ada, sertakan parameter password
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%d sslmode=%s TimeZone=Asia/Makassar",
			host, username, password, database, port, "disable",
		)
	}

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // Output log ke stdout
		logger.Config{
			SlowThreshold:             time.Second, // Threshold untuk query lambat
			LogLevel:                  logger.Info, // Level log (Info, Warn, Error, Silent)
			IgnoreRecordNotFoundError: true,        // Abaikan error "record not found"
			Colorful:                  true,        // Warna pada output log
		},
	)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{Logger: newLogger})
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
