package save

import (
	"fmt"
	"pinterest_api/internal/model"
	"sync"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

type SaveController struct {
	SaveUsecase *SaveUsecase
}

func NewSaveController(saveUsecase *SaveUsecase) *SaveController {
	return &SaveController{
		SaveUsecase: saveUsecase,
	}
}

func (s *SaveController) HandleSavePost(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postid")

	response, err := s.SaveUsecase.SavePost(ctx.UserContext(), auth, postId)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[SaveResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (s *SaveController) HandleUnSavePost(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postid")

	response, err := s.SaveUsecase.UnSavePost(ctx.UserContext(), auth, postId)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[SaveResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

var clients = make(map[*websocket.Conn]bool) // Store all active clients
var mutex = &sync.Mutex{}

func broadcastMessage(mt int, message string) {
	mutex.Lock()
	defer mutex.Unlock()

	for client := range clients {
		if err := client.WriteMessage(mt, []byte(message)); err != nil {
			fmt.Println("Broadcast error:", err)
			client.Close()
			delete(clients, client)
		}
	}
}

func (s *SaveController) HandleSavePostWS(w *websocket.Conn) {
	mutex.Lock()
	clients[w] = true
	mutex.Unlock()

	fmt.Println("New client connected")
	defer func() {
		// Unregister client
		mutex.Lock()
		delete(clients, w)
		mutex.Unlock()
		w.Close()
	}()

	for {
		// Read message from client
		mt, msg, err := w.ReadMessage()
		if err != nil {
			fmt.Println("Read error:", err)
			break
		}
		fmt.Printf("Message received: %s", msg)

		// Process the "like_post" action
		if string(msg) == "like_post" {
			fmt.Println("Post liked by a user")
			broadcastMessage(mt, "Post liked successfully!")
		}
	}
}
