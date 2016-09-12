'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('react-ts') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter app name',
        default: 'app'
      }, {
        type: 'input',
        name: 'description',
        message: 'Enter app description',
        default: ''
      }, {
        type: 'confirm',
        name: 'useRedux',
        message: 'Use redux',
        default: false
      }, {
        type: 'confirm',
        name: 'useRouter',
        message: 'Use react-router',
        default: false
      }, {
        type: 'confirm',
        name: 'useMUI',
        message: 'Use material-ui',
        default: false
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      `${this.templatePath()}/**/_package.json*`,
      this.destinationPath('package.json'),
      this.props
    );
  },

  createingPackage: function () {
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: '1.0.0',
        description: this.props.description,
        scripts: {
          'start': 'webpack-dev-server --inline'
        }
      }
    );
  },

  install: function () {
    const devDependencies = [
      'gulp',
      'webpack',
      'webpack-dev-server',
      'ts-loader'
    ];

    const dependencies = [
      'react',
      'react-dom'
    ];


  }
});
