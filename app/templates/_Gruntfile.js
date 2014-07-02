module.exports = function(grunt) {

    var paths = {
        src: {
            bower: 'bower_components',
            css: 'source/css',
            fonts: 'source/fonts',
            js: 'source/js/source'
        },
        dest: {
            css: 'source/css',
            fonts: 'source/fonts',
            js: 'source/js',
            html: 'public/patterns',
            images: 'source/images',
            patterns: 'source/_patterns'
        },
        app: {
            css: 'export/css',
            fonts: 'export/fonts',
            js: 'export/js',
            html: 'export/patterns',
            images: 'export/images'
        }
    };

    require('load-grunt-config')(grunt, {
        config: {
            paths: paths
        }
    });
<% if (includePagespeed) { %>
    grunt.registerTask('ngrok', 'Run pagespeed with ngrok', function() {
        var ngrok = require('ngrok');
        var done = this.async();
        var port = 8888;

        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });
    
<% } %>
};