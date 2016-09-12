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
        description: this.props.description,
        scripts: {
          'start': 'webpack-dev-server --inline'
        }
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
      'typescript',
      'url-loader',
      'webpack',
      'webpack-dev-server'
    ];

    const dependencies = [
      'react',
      'react-dom'
    ];

    const dependenciesRedux = this.props.useRedux ? [
      'redux',
      'react-redux'
    ] : [];

    const dependenciesRouter = this.props.userRouter ? [
      'react-router'
    ].concat(this.props.useRedux ? ['react-router-redux'] : []) : [];

    const dependenciesMUI = this.props.useMUI ? [
      'material-ui',
      'react-tap-event-plugin'
    ] : [];

    this.npmInstall(devDependencies, { saveDev: true });
    this.npmInstall(dependencies
      .concat(dependenciesRedux)
      .concat(dependenciesRouter)
      .concat(dependenciesMUI),
      { save: true });
  },

  installingTypings: function () {
    const typings = [
      'dt~react',
      'dt~react-dom'
    ];

    const typingsRedux = this.props.useRedux ? [
      'dt~redux',
      'dt~react-redux'
    ] : [];

    const typingsRouter = this.props.userRouter ? [
      'dt~react-router'
    ].concat(this.props.useRedux ? ['react-router-redux'] : []) : [];

    const typingsMUI = this.props.useMUI ? [
      'dt~material-ui',
      'dt~react-tap-event-plugin'
    ] : [];

    this.spawnCommand('typings', ['install', '--save', '--global']
      .concat(typings)
      .concat(typingsRedux)
      .concat(typingsRouter)
      .concat(typingsMUI));
  }
});
