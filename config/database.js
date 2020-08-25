if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI:
            "<your production db>"
    }
}
else {
    module.exports = {
        mongoURI:
            "mongodb://localhost/smol"
    }
}