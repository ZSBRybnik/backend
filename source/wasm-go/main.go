package main

func main() {
	c := make(chan struct{}, 0)
	<-c
}
