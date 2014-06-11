module.exports = {
    app: {
        files: {
            '<%= paths.dest.js %>/app.js': [
                '<%= paths.src.js %>/components/modernize.js',
                '<%= paths.src.js %>/components/primaryNav.js',
                '<%= paths.src.js %>/components/modalShare.js',
                '<%= paths.src.js %>/components/repositionContent.js',
                '<%= paths.src.js %>/components/tabs.js',
                '<%= paths.src.js %>/global.js'
            ]
        }
    }
};