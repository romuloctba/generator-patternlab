module.exports = {
    app: {
        files: {
            '<%%= paths.dest.js %>/global.js': [
            	<% if (includeJquery) { %>
            	'<%%= paths.src.bower %>/jquery/dist/jquery.js',
            	<% } %>
                '<%%= paths.src.js %>/global.js'
            ]
        }
    }
};