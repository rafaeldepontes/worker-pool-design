package process

type Process[T any] struct {
	IDs  []int64 `json:"ids"`
	Data T       `json:"data"`
	Type string  `json:"type"`
}
