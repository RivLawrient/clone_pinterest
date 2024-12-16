package comment

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"sync"

	"github.com/gofiber/websocket/v2"
)

type CommentController struct {
	CommentUsecase *CommentUsecase
	Clients        sync.Map
}

func NewCommentController(commentUsecase *CommentUsecase) *CommentController {
	return &CommentController{
		CommentUsecase: commentUsecase,
	}
}

func (c *CommentController) Handle(w *websocket.Conn) {
	postId := w.Params("postid")
	auth := w.Cookies("auth-token")
	log.Printf("%s Connected on %s", auth, postId)

	defer func() {
		log.Println("WebSocket disconnected")
		c.Clients.Delete(w) // Hapus koneksi saat terputus
		w.Close()
	}()

	c.Clients.Store(w, postId)

	for {
		typ, message, err := w.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}

		log.Printf("Received: %s", message)
		if err := w.WriteMessage(typ, message); err != nil {
			log.Println("error:", err)
		}
	}

}

func (c *CommentController) HandleAddComment(w *websocket.Conn) {
	log.Println("WebSocket connected for comment_post")

	// c.Clients.Store(w, true)

	// Print all active connections
	// c.Clients.Range(func(key, value interface{}) bool {
	// 	clientConn, ok := key.(*websocket.Conn)
	// 	if ok {
	// 		log.Printf("Active connection: %v\n", clientConn.RemoteAddr())
	// 	}
	// 	return true
	// })
	// c.Clients.Store()

	defer func() {
		log.Println("WebSocket disconnected")
		c.Clients.Delete(w) // Hapus koneksi saat terputus
		w.Close()
	}()

	// Tambahkan koneksi ke map
	c.Clients.Store(w, true)

	for {
		_, message, err := w.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}

		log.Printf("Like Post Received: %s\n", message)

		auth := w.Cookies("auth-token")
		postId := w.Params("postid")
		fmt.Println(postId)
		req := new(CommentRequest)

		if err := json.Unmarshal(message, &req); err != nil {
			log.Println("Invalid message format:", err)
			continue
		}
		fmt.Println(auth)
		fmt.Println("aku")
		ctx := context.Background()
		_, fiberErr := c.CommentUsecase.AddComment(ctx, auth, req)
		if fiberErr != nil {
			log.Println("Error adding comment:", fiberErr.Message)
			continue
		}

		comments := c.CommentUsecase.ListCommentByPost(ctx, req.PostId)
		broadcastData, err := json.Marshal(comments)
		if err != nil {
			log.Println("Error marshalling broadcast data:", err)
			continue
		}
		// Broadcast ke semua klien
		// fmt.Println(string(resp))
		c.Broadcast(broadcastData)

		// broadcastMessage := "Data diupdate"

		// Broadcast pesan "data diupdate" ke semua klien
		// c.Clients.Range(func(key, value interface{}) bool {
		// 	clientConn, ok := key.(*websocket.Conn)
		// 	if ok {
		// 		err := clientConn.WriteMessage(websocket.TextMessage, []byte(broadcastMessage))
		// 		if err != nil {
		// 			log.Println("Error sending message to client:", err)
		// 		}
		// 	}
		// 	return true
		// })
	}
}

// func (c *CommentController) Broadcast(message []byte) {
// 	c.Clients.Range(func(key, value interface{}) bool {
// 		conn, ok := key.(*websocket.Conn)
// 		if !ok {
// 			log.Println("Error: client is not a valid WebSocket connection")
// 			return true
// 		}

// 		err := conn.WriteMessage(websocket.TextMessage, message)
// 		if err != nil {
// 			log.Println("Error sending message to client:", err)
// 			conn.Close()
// 			c.Clients.Delete(conn)
// 		}

// 		return true
// 	})
// }

// // Broadcast mengirim pesan ke semua klien yang terhubung
func (c *CommentController) Broadcast(message []byte) {
	c.Clients.Range(
		func(key, value interface{}) bool {
			client := key.(*websocket.Conn)
			if err := client.WriteMessage(websocket.TextMessage, message); err != nil {
				log.Println("Broadcast error:", err)
				client.Close()
				c.Clients.Delete(client)
			}
			return true
		})
}

// func (c *CommentController) HandleAddComment(ctx *fiber.Ctx) error {
// 	auth := ctx.Cookies("auth-token")
// 	postId := ctx.Params("postid")

// 	request := new(CommentRequest)

// 	err := ctx.BodyParser(request)
// 	if err != nil {
// 		error := fiber.ErrBadRequest
// 		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
// 			StatusCode: error.Code,
// 			Errors:     "invalid request body",
// 		})
// 	}

// 	response, error := c.CommentUsecase.AddComment(ctx.UserContext(), auth, postId, request)
// 	if error != nil {
// 		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
// 			StatusCode: error.Code,
// 			Errors:     error.Message,
// 		})
// 	}

// 	return ctx.JSON(model.WebResponse[CommentResponse]{
// 		StatusCode: ctx.Response().StatusCode(),
// 		Data:       *response,
// 	})
// }
