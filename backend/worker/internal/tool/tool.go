package tool

import (
	"fmt"
	"os"
)

func ChecksEnvFile(s *string) {
	_, err := os.Stat(*s)
	if err != nil {
		fmt.Println("Error while looking for .env, using .env.example instead...")
		*s = ".env.example"
	}
}

func FileExists(s string) bool {
	if _, err := os.Stat(s); err != nil {
		return false
	}
	return true
}