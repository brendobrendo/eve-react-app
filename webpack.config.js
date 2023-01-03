module.exports = {
    // Other webpack configuration options...
    resolve: {
        fallback: {
            "https": require.resolve("https-browserify")
        }
    }
};