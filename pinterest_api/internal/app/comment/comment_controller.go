package comment

import (
	"context"
	"encoding/json"
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
		req := new(CommentRequest)
		typ, message, err := w.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}

		if err := json.Unmarshal(message, &req); err != nil {
			log.Println("Invalid message format:", err)
			continue
		}

		ctx := context.Background()
		_, fiberErr := c.CommentUsecase.AddComment(ctx, auth, postId, req)
		if fiberErr != nil {
			log.Println("Error adding comment:", fiberErr.Message)
			continue
		}

		comments := c.CommentUsecase.ListCommentByPost(ctx, postId)
		response, err := json.Marshal(comments)
		if err != nil {
			log.Println("Error marshalling broadcast data:", err)
			continue
		}

		c.Clients.Range(func(key, value any) bool {
			client := key.(*websocket.Conn)
			val := value.(string)

			if val == postId {
				if err := client.WriteMessage(typ, response); err != nil {
					log.Println("error:", err)
				}

			}
			return true
		})
	}

}

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
