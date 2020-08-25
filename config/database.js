if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI:
            "mongodb://ohduck1:ohduck2@ds261377.mlab.com:61377/smol"
    }
}
else {
    module.exports = {
        mongoURI:
            "mongodb://localhost/smol"
    }
}