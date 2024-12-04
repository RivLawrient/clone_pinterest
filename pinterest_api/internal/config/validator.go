package config

import (
	"reflect"
	"strings"

	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	enTranslations "github.com/go-playground/validator/v10/translations/en"
	"github.com/spf13/viper"
)

type Validator struct {
	Validate *validator.Validate
	Trans    ut.Translator
}

func NewValidator(viper *viper.Viper) *Validator {
	validate := validator.New()
	eng := en.New()
	uni := ut.New(eng, eng)
	trans, _ := uni.GetTranslator("en")
	enTranslations.RegisterDefaultTranslations(validate, trans)

	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		tag := fld.Tag.Get("json")
		if tag == "-" || tag == "" {
			return fld.Name // Kembali ke nama field default jika json tidak ada
		}
		return strings.Split(tag, ",")[0] // Ambil nama pertama dari tag json
	})

	return &Validator{Validate: validate, Trans: trans}
}

// func (v *Validator) ValidateStruct(s interface{}) []string {
// 	var translatedErrors []string

// 	err := v.Validate.Struct(s)
// 	if err != nil {
// 		if valErr, ok := err.(validator.ValidationErrors); ok {
// 			for _, e := range valErr {
// 				translatedErrors = append(translatedErrors, e.Translate(v.Trans))
// 			}
// 		}
// 	}
// 	return translatedErrors
// }

// func (v *Validator) ValidateVar(field interface{}, tag string) []string {
// 	var messages []string
// 	err := v.Validate.Var(field, tag)
// 	if err != nil {
// 		if validationErrors, ok := err.(validator.ValidationErrors); ok {
// 			for _, e := range validationErrors {
// 				messages = append(messages, e.Translate(v.Trans))
// 			}
// 		}
// 	}
// 	return messages
// }

func (v *Validator) TranslateErrors(err error) string {
	var messages []string

	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, e := range validationErrors {
			messages = append(messages, e.Translate(v.Trans))
		}
	}

	return strings.Join(messages, ", ")
}
