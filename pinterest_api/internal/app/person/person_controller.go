package person

import (
	"fmt"
	"pinterest_api/internal/config"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PersonController struct {
	DB       *gorm.DB
	Validate *config.Validator
}

func NewPersonController(db *gorm.DB, validate *config.Validator) *PersonController {
	return &PersonController{
		DB:       db,
		Validate: validate,
	}
}

type PersonRequest struct {
	Name      string `json:"name" validate:"required,alpha,min=100"`
	AgePerson int    `json:"age" validate:"required,numeric"`
}

func (p *PersonController) Insert(ctx *fiber.Ctx) error {
	request := new(PersonRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		fmt.Println("1", err)
		return err
	}

	// err = p.Validate.Validate.Struct(request)
	// if err != nil {
	// 	fmt.Println(len(p.Validate.TranslateErrors(err)))
	// 	return ctx.JSON(fiber.Map{
	// 		"error": strings.Join(p.Validate.TranslateErrors(err), ", "),
	// 	})
	// }
	// p.Validate.Validate.RegisterTranslation("")
	// if err := p.Validate.Validate.Struct(request); err != nil {
	// 	if _, ok := err.(*validator.InvalidValidationError); ok {
	// 		fmt.Println(err)
	// 		return ctx.SendString(err.Error())
	// 	}

	// 	for _, err := range err.(validator.ValidationErrors) {

	// 		fmt.Println(err.Namespace())
	// 		fmt.Println(err.Field())
	// 		fmt.Println(err.StructNamespace())
	// 		fmt.Println(err.StructField())
	// 		fmt.Println(err.Tag())
	// 		fmt.Println(err.ActualTag())
	// 		fmt.Println(err.Kind())
	// 		fmt.Println(err.Type())
	// 		fmt.Println(err.Value())
	// 		fmt.Println(err.Param())
	// 		fmt.Println()
	// 	}

	// 	return ctx.SendString(err.Error())
	// }

	// if request.Name == "" {
	// 	return ctx.SendString("gaboleh kosong cuy")
	// }
	person := new(Person)
	person.ID = uuid.New().String()
	person.Name = request.Name

	if err := p.DB.Create(person).Error; err != nil {
		fmt.Println("2", err)
		return err
	}

	fmt.Println(person)
	return ctx.JSON(person)
}
