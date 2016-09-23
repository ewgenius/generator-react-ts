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

  copingFiles: function () {
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    if (this.props.useRedux) {
      this.fs.copyTpl(
        this.templatePath('src/_store.ts'),
        this.destinationPath('src/store.ts'),
        this.props
      );
    }
  },

  createingPackage: function () {
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: '1.0.0',
        description: this.props.description
      }
    );
  },

  installingPackages: function () {
    const devDependencies = [
      'gulp',
      'gulp-util',
      'css-loader',
      'file-loader',
      'node-sass',
      'sass-loader',
      'style-loader',
      'ts-loader',
      'imports-loader',
      'exports-loader',
      'typescript@2',
      'url-loader',
      'webpack',
      'webpack-dev-server',
      'es6-promise',
      'whatwg-fetch'
    ];

    const dependencies = [
      'react',
      'react-dom',
      '@types/react',
      '@types/react-dom'
    ];

    const dependenciesRedux = this.props.useRedux ? [
      'redux',
      'react-redux',
      '@types/redux',
      '@types/react-redux'
    ] : [];

    const dependenciesRouter = this.props.userRouter ? [
      'react-router',
      '@types/react-router'
    ].concat(this.props.useRedux ? [
      'react-router-redux',
      '@types/react-router-redux'
    ] : []) : [];

    const dependenciesMUI = this.props.useMUI ? [
      'material-ui',
      'react-tap-event-plugin',
      '@types/material-ui',
      '@types/react-tap-event-plugin'
    ] : [];

    this.npmInstall(devDependencies, { saveDev: true });
    this.npmInstall(dependencies
      .concat(dependenciesRedux)
      .concat(dependenciesRouter)
      .concat(dependenciesMUI),
      { saveDev: true });
  }
});
