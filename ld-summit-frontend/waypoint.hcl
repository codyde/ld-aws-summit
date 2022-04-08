project = "darkly-demo"

app "ldd" {

    build {
        use "docker" {}
    }

    deploy {
        use "docker" {}
    }
}