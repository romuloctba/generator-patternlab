'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var execSync = require('execSync');

var PatternlabGenerator = module.exports = yeoman.generators.Base.extend({

    initializing: function() {
        this.pkg = require('../package.json');
    },

// Name pattern templates by type rather than platform?
// Put pattern lab files in it's own subfolder
// Require/ugliy option
// Move the pattern lab dependency away from degdigital
// Where's your pattern lab template directory?
// 
// git ls-remote --heads git@github.com:degdigital/patternlab-templates.git
// 
// // https://www.npmjs.org/doc/cli/npm-config.html
// npm config set patternlab-templates git@github.com:degdigital/patternlab-templates.git --global
// npm config list
// npm config get patternlab-templates


    listTemplateRepository: function() {
        var done = this.async();
        var templateExec = execSync.exec('npm config get patternlab-templates');
        var newTemplateRepo = templateExec.stdout; //.replace(/^\s+|\s+$/g,'');
        var templateRepo = 'git@github.com:degdigital/patternlab-templates.git';

        if ( newTemplateRepo != 'undefined' )
            templateRepo = newTemplateRepo;

        this.prompt([
            {
                type: 'input',
                name: 'templateRepository',
                message: 'Github template repository?',
                default: templateRepo
            }
        ], function(props) {
            this.templateRepo = props.templateRepository;
            done();
        }.bind(this));
    },

    listTemplateRepositoryBranches: function() {
        var done = this.async();
        var listExec = execSync.exec('git ls-remote --heads ' + this.templateRepo);
        var list = listExec.stdout.match(/[^\r\n]+/g);
        var templateBranches = [];

        for ( var i=0; i<list.length; i++) {
            var listItem = list[i].split('heads/');
            var branch = listItem[1];
            templateBranches.push({
                name: branch,
                value: branch
            });
        }

        this.prompt([
            {
                type: 'list',
                name: 'templateRepositoryBranch',
                message: 'Which branch would you like to use?',
                choices: templateBranches
            }
        ], function(props) {
            this.templateRepositoryBranch = props.templateRepositoryBranch;
            done();
        }.bind(this));

        console.log(this.templateRepositoryBranch);
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
                        name: 'Modernizr/Grunt-Modernizr',
                        value: 'includeModernizr'
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
            }//,
            //{
            //    type: 'input',
            //    message: 'Want some Pattern Lab templates?',
            //    name: 'projectTemplates',
            //    default: process.env
            //}
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
        this.template('grunt/_uglify.js', 'grunt/uglify.js');
        this.copy('grunt/_watch.js', 'grunt/watch.js');

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
        this.mkdir('source/js/source');
        this.mkdir('source/js/source/components');
        this.mkdir('source/js/source/lib');
        this.mkdir('source/js/source/plugins');

        this.copy('js/_global.js', 'source/js/source/global.js');

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