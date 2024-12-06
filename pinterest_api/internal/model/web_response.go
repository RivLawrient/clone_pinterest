package model

type WebResponse[T any] struct {
	StatusCode int    `json:"status_code"`
	Data       T      `json:"data"`
	Errors     string `json:"errors,omitempty"`
}
