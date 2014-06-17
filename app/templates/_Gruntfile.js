module.exports = function(grunt) {

    var paths = {
        src: {
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
            css: 'app/css',
            fonts: 'app/fonts',
            js: 'app/js',
            html: 'app/patterns',
            images: 'app/images'
        }
    };

    require('load-grunt-config')(grunt, {
        config: {
            paths: paths
        }
    });

};