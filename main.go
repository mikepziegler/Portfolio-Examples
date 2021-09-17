package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type reponse struct {
}

type repo struct {
}

func main() {

	os.Remove("response.json")

	res, err := http.Get("https://api.github.com/users/mikezyeman/repos")
	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalln(err)
	}
	//Convert the body to type string
	sb := string(body)

	d1 := []byte(sb)
	f, err := os.Create("response.json")

	check(err)
	_, err = f.Write(d1)

	if err != nil {
		log.Fatal(err)
	}

}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
