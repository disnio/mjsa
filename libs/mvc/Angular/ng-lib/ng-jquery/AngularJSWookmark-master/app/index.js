'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var WookmarkGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic AngularWookmark generator.'));

    var prompts = [{
      name: 'galleryName',
      message: 'Would you like to call your Photo Gallery?',
    }];

    this.prompt(prompts, function (props) {
      this.galleryName = props.galleryName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/images');
    
    this.template('Gruntfile.js', 'Gruntfile.js');
    
    this.template('_bower.json', 'bower.json');
	this.template('_config.json', 'config.json');
	this.template('_package.json', 'package.json');
    
    this.copy('index.html', 'app/index.html');
    this.copy('angular.wookmark.js', 'app/js/angular.wookmark.js');
	this.copy('jquery.wookmark.min.js', 'app/js/jquery.wookmark.min.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = WookmarkGenerator;