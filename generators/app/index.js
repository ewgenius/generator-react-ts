'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('react-ts') + ' generator!'
    ));

    var prompts = [{
      type: 'prompt',
      name: 'appName',
      message: 'enter app name',
      default: 'app'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
