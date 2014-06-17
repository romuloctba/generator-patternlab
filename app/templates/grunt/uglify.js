module.exports = {
    app: {
        files: {
            '<%= paths.dest.js %>/app.js': [
                '<%= paths.src.js %>/global.js'
            ]
        }
    }
};