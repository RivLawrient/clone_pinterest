package main

import (
	"pinterest_api/internal/config"
)

func main() {
	app := config.NewFiber()
	app.Listen(":4000")
}
