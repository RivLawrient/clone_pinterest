package model

type WebResponse[T any] struct {
	StatusCode int    `json:"status_code"`
	Data       T      `json:"data,omitempty"`
	Errors     string `json:"errors,omitempty"`
}
