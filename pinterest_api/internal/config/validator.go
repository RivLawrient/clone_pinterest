package config

import (
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	enTranslations "github.com/go-playground/validator/v10/translations/en"
	"github.com/spf13/viper"
)

var (
	validate *validator.Validate
	trans    ut.Translator
)

func NewValidator(viper *viper.Viper) *validator.Validate {
	validate = validator.New()

	eng := en.New()
	uni := ut.New(eng, eng)
	trans, _ = uni.GetTranslator("en")

	enTranslations.RegisterDefaultTranslations(validate, trans)

	return validate
}

func ValidateStruct(s interface{}) []string {
	var translatedErrors []string

	err := validate.Struct(s)
	if err != nil {
		if valErr, ok := err.(validator.ValidationErrors); ok {
			for _, e := range valErr {
				translatedErrors = append(translatedErrors, e.Translate(trans))
			}
		}
	}

	return translatedErrors
}
