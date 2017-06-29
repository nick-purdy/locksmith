package main

import (
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	"net/url"
	"path/filepath"

	"gopkg.in/yaml.v2"
)

type Config struct {
	VaultUrl string `yaml:"vault_url"`
	Port     string `yaml:"port"`
}

var config Config

func main() {
	ReadConfiguration()

	http.Handle("/v1/", NewProxy())
	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.ListenAndServe(":"+config.Port, nil)
}

func NewProxy() http.Handler {
	director := func(req *http.Request) {
		out, _ := url.Parse(config.VaultUrl)

		req.URL.Scheme = out.Scheme
		req.URL.Host = out.Host
	}
	return &httputil.ReverseProxy{Director: director}
}

func ReadConfiguration() {
	filename, _ := filepath.Abs("./config.yaml")
	yamlFile, err := ioutil.ReadFile(filename)

	if err != nil {
		panic("You must supply a config.yaml file")
	}

	err = yaml.Unmarshal(yamlFile, &config)
	if err != nil {
		panic("Invalid yaml file")
	}
}
