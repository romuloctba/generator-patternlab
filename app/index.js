'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PatternlabGenerator = module.exports = yeoman.generators.Base.extend({

    initializing: function() {
        this.pkg = require('../package.json');
    },

    prompting: function() {
        var cb = this.async();

        this.log(yosay('Welcome to the marvelous Pattern Lab generator!'));

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'What is the name of this project?',
                default: 'Pattern Lab Project'
            },
            {
                type: 'checkbox',
                message: 'Wanna install some stuff?',
                name: 'features',
                choices: [
                    {
                        name: 'jQuery (~1.11.1)',
                        value: 'includeJquery'
                    },

                    {
                        name: 'Modernizr/Grunt-Modernizr (Latest)',
                        value: 'includeModernizr'
                    },

                    {
                        name: 'Require.js (~2.1.14)',
                        value: 'includeRequire'
                    }
                ]
            },
            {
                type: 'list',
                message: 'What type of project is this?',
                name: 'projectType',
                choices: [
                    {
                        name: 'No Platform',
                        value: 'master'
                    },
                    {
                        name: 'Magento',
                        value: 'magento'
                    },
                    {
                        name: 'WordPress',
                        value: 'wordpress'
                    }
                ]
            }
        ];

        this.prompt(prompts, function(props) {
            var features = props.features;
            function hasFeature (feat) {
                return features.indexOf(feat) !== -1;
            }

            this.currentYear = new Date().getFullYear();

            this.projectName = props.projectName;
            this.includeJquery = hasFeature('includeJquery');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeRequire = hasFeature('includeRequire');
            this.projectType = props.projectType;

            this.dependencies = {};

            if ( this.includeJquery ) {
                this.dependencies["jquery"] = "~1.11.1";
            }

            if ( this.includeModernizr ) {
                this.dependencies["modernizr"] = "latest";
            }

            cb();

        }.bind(this));

    },

    copyingDependencyFiles: function() {
        var done = this.async();

        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('_Gruntfile.js', 'Gruntfile.js');

        this.mkdir('grunt');
        this.copy('grunt/_aliases.yaml', 'grunt/aliases.yaml');
        this.copy('grunt/_compass.js', 'grunt/compass.js');
        this.copy('grunt/_copy.js', 'grunt/copy.js');
        this.copy('grunt/_shell.js', 'grunt/shell.js');
        this.copy('grunt/_watch.js', 'grunt/watch.js');
        if (this.includeRequire) {
            this.copy('grunt/_bower.js', 'grunt/bower.js');
        } else {
            this.template('grunt/_uglify.js', 'grunt/uglify.js');
        }
        if (this.includeModernizr) {
            this.copy('grunt/_modernizr.js', 'grunt/modernizr.js');
        }

        done();
    },

    cloningPatternLab: function() {
        var done = this.async();

        this.remote('pattern-lab', 'patternlab-php', 'master', function(err, remote) {
            remote.directory('.', '');
            done();
        });

    },

    cloningPatternLabTemplates: function() {
        var done = this.async();

        this.remote('degdigital', 'patternlab-templates', this.projectType, function(err, remote) {
            remote.directory('.', 'source');
            done();
        });
    },

    copyingJsFiles: function() {
        var done = this.async();

        this.mkdir('export');
        this.mkdir('source/js');

        if ( this.includeRequire ) {
            this.copy('js/_global-require.js', 'source/js/global.js');
        } else {
            this.mkdir('source/js/source');
            this.mkdir('source/js/source/components');
            this.mkdir('source/js/source/lib');
            this.mkdir('source/js/source/plugins');
            this.copy('js/_global-norequire.js', 'source/js/source/global.js');
        }

        done();
    },

    installingDependencies: function () {
        this.on('end', function() {
            this.installDependencies({
                callback: function () {
                    this.spawnCommand('grunt', ['bower']);
                    this.log(yosay('Your site is ready! Type "grunt" or "grunt watch" to compile your first Pattern Lab build.'));
                    
                }.bind(this)
            });
        });
    }
});