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

            this.projectName = props.projectName;
            this.includeJquery = hasFeature('includeJquery');
            this.projectType = props.projectType;

            this.dependencies = {};

            if ( this.includeJquery ) {
                this.dependencies["jquery"] = "~1.11.1";
            }

            cb();

        }.bind(this));

    },

    copyingDependencyFiles: function() {
        var done = this.async();

        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('_Gruntfile.js', 'Gruntfile.js');
        this.directory('grunt', 'grunt');

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

        this.mkdir('app');
        this.mkdir('source/js');
        this.mkdir('source/js/source');
        this.mkdir('source/js/source/components');
        this.mkdir('source/js/source/lib');
        this.mkdir('source/js/source/plugins');

        this.copy('js/_global.js', 'source/js/source/global.js');
        this.copy('js/_modernizr-latest.js', 'source/js/source/lib/modernizr-latest.js');

        done();
    },

    installingDependencies: function () {
        this.on('end', function() {
            this.installDependencies({
                callback: function () {
                    this.log(yosay('Your site is ready! Type "grunt" or "grunt watch" to compile your first Pattern Lab build.'));
                    
                }.bind(this)
            });
        });
    }
});