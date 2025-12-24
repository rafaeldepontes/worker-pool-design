package process

type Process[T any] struct {
	Data T      `json:"data"`
	Type string `json:"type"`
}
