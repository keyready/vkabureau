package utils

import "golang.org/x/crypto/bcrypt"

func GenerateHash(plainText string) (string, error) {
	hashByte, err := bcrypt.GenerateFromPassword([]byte(plainText), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashByte), nil
}

func CompareHash(hashText, plainText string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashText), []byte(plainText)) == nil
}
