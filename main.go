package main

import (
	"flag"
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	"net/url"
	"path/filepath"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Vault  VaultConfig  `yaml:"vault"`
	Server ServerConfig `yaml:"server"`
}

type VaultConfig struct {
	Url string `yaml:"url"`
}

type ServerConfig struct {
	Port        string `yaml:"port"`
	Secure      bool   `yaml:"secure"`
	Certificate string `yaml:"certificate"`
	PrivateKey  string `yaml:"private_key"`
}

var config Config

func main() {

	var configFileName = flag.String("c", "./config.yaml", "When supplied defines the path to the config yaml file")
	flag.Parse()

	ReadConfiguration(*configFileName)

	http.Handle("/v1/", NewProxy())
	http.Handle("/", http.FileServer(http.Dir("./static")))

	if config.Server.Secure {
		http.ListenAndServeTLS(":"+config.Server.Port, config.Server.Certificate, config.Server.PrivateKey, nil)
	} else {
		http.ListenAndServe(":"+config.Server.Port, nil)
	}
}

func NewProxy() http.Handler {
	director := func(req *http.Request) {
		out, _ := url.Parse(config.Vault.Url)

		req.URL.Scheme = out.Scheme
		req.URL.Host = out.Host
	}
	return &httputil.ReverseProxy{Director: director}
}

func ReadConfiguration(configFileName string) {
	filename, _ := filepath.Abs(configFileName)
	yamlFile, err := ioutil.ReadFile(filename)

	if err != nil {
		panic("You must supply a config.yaml file")
	}

	err = yaml.Unmarshal(yamlFile, &config)
	if err != nil {
		panic("Invalid yaml file")
	}
}
