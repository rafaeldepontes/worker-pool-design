package messagebroker

type Service interface {
	Worker(id int)
}
