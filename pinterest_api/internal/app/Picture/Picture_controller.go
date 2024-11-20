package picture

import (
	"path/filepath"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type PictureController struct {
}

func NewPictureController() *PictureController {
	return &PictureController{}
}

func (p *PictureController) GetPicture(ctx *fiber.Ctx) error {
	filename := ctx.Params("filename")
	imageDir := "./external/img/"

	return ctx.SendFile(imageDir + filename)
}

func (p *PictureController) UploadPicture(ctx *fiber.Ctx) error {
	file, err := ctx.FormFile("image")
	// const maxFileSize = 20 * 1024 * 1024
	// if file.Size > maxFileSize {
	// 	return ctx.Status(fiber.StatusRequestEntityTooLarge).JSON(fiber.Map{
	// 		"error": "File size exceeds 20 MB",
	// 	})
	// }

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to upload image",
		})
	}

	ext := strings.ToLower(filepath.Ext(file.Filename)) // Ambil ekstensi file (misal .jpg)
	if ext != ".jpg" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Only .jpg files are allowed",
		})
	}

	file.Filename = uuid.New().String() + ".jpg"
	savePath := "./external/img/" + file.Filename

	// Simpan file
	if err := ctx.SaveFile(file, savePath); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to save image",
		})
	}

	// Kembalikan respon sukses
	return ctx.JSON(fiber.Map{
		"message": "Image uploaded successfully",
		"link":    "http://127.0.0.1:4000/img/" + file.Filename,
	})
}
