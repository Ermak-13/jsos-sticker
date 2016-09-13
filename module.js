(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var Mixins = global.OS.Mixins,
    Configurator = global.OS.Configurator,
    PositionAndSizeForm = global.OS.PositionAndSizeForm,

    StickerConfigsForm = require('./sticker_configs_form'),
    settings = require('./settings');

var _Configurator = React.createClass({displayName: "_Configurator",
  mixins: [Mixins.ConfiguratorHelper, Mixins.NavHelper],

  getSubmitHandler: function (tab) {
    var handlers = {
      stickerConfigs: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      positionAndSize: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),
    };

    return handlers[tab];
  },

  getInitialState: function () {
    return {
      tab: 'stickerConfigs'
    };
  },

  getTabs: function () {
    var settings = this.props.settings;

    return {
      stickerConfigs: {
        navText: global.I18n.t('sticker.sticker_configs.nav_text'),
        content: function () {
          return (
            React.createElement(StickerConfigsForm, {
              onSubmit:  this.getSubmitHandler('stickerConfigs'), 
              settings:  settings }
            )
          );
        }.bind(this) ()
      },

      positionAndSize: {
        navText: global.I18n.t('position_and_size_form.nav_text'),
        content: function () {
          return (
            React.createElement(PositionAndSizeForm, {
              onSubmit:  this.getSubmitHandler('positionAndSize'), 
              settings:  settings }
            )
          );
        }.bind(this) ()
      }
    };
  },

  render: function () {
    return (
      React.createElement(Configurator.DefaultDialog, {
        ref:  this.getRefName(), 
        name:  this.props.name, 
        onClose:  this.props.onClose}, 

         this.getNavHTML(), 

        React.createElement("div", {className: "row", style: { marginTop: '20px'}}, 
          React.createElement("div", {className: "col-md-10 col-md-offset-1"}, 
             this.getContentHTML() 
          )
        )
      )
    );
  }
});

module.exports = _Configurator;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./settings":6,"./sticker_configs_form":8}],2:[function(require,module,exports){
(function (global){
var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');

global.I18n.registryDict(locales);
global.OS.installModule('Sticker', {
  Widget: Widget,
  Shortcut: Shortcut
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./locales":4,"./shortcut":7,"./widget":9}],3:[function(require,module,exports){
var en = {
  'sticker.sticker_configs.nav_text': 'Sticker Configs',
  'sticker.font_size.label': 'font size:',
  'sticker.angle.label': 'angle:',
  'sticker.background.label': 'background:'
};

module.exports = en;


},{}],4:[function(require,module,exports){
module.exports = {
  en: require('./en'),
  ru: require('./ru')
};


},{"./en":3,"./ru":5}],5:[function(require,module,exports){
var ru = {
  'sticker.sticker_configs.nav_text': 'Конфиг стикера',
  'sticker.font_size.label': 'размер шрифта:',
  'sticker.angle.label': 'угол поворота:',
  'sticker.background.label': 'цвет фона:'
};

module.exports = ru;


},{}],6:[function(require,module,exports){
(function (global){
var settings = {
  WIDGET_NAME: 'sticker',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_SIZE: {
    width: '180px',
    height: '180px'
  },
  DEFAULT_POSITION: global.Settings.get('default_position'),

  DEFAULT_WIDGET_STYLES: {
    background: '#F8E71C',
    borderRadius: 0,
    padding: 0,
    transform: 'rotate(0deg)'
  },

  FORM_STYLES: {
    width: '100%',
    height: '100%'
  },

  MESSAGE_FIELD_STYLES: {
    width: '100%',
    height: '100%'
  },

  DEFAULT_TEXTAREA_STYLES: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: '100%',
    height: '100%',
    border: 'none',
    resize: 'none',
    fontSize: '14px'
  }
};

module.exports = settings;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
var Link = global.OS.Link;

var Shortcut = React.createClass({displayName: "Shortcut",
  render: function () {
    return (
      React.createElement(Link, {
        className:  this.props.className, 
        onClick:  this.props.onClick}, 

        React.createElement("span", {className: "fa fa-sticky-note"})
      )
    );
  }
});

module.exports = Shortcut;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
var HForm = global.OS.HForm,

    Input = global.OS.Input,
    ColorInput = global.OS.ColorInput;

var StickerConfigsForm = React.createClass({displayName: "StickerConfigsForm",
  handleSubmit: function (e) {
    e.preventDefault();

    var settings = _.clone(this.props.settings),
        widgetStyles = _.clone(settings.widgetStyles),
        textareaStyles = _.clone(settings.textareaStyles);

    widgetStyles.background = this.refs.background.getValue();
    widgetStyles.transform = this.refs.transform.getValue();
    textareaStyles.fontSize = this.refs.fontSize.getValue();

    settings.widgetStyles = widgetStyles;
    settings.textareaStyles = textareaStyles;

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      React.createElement(HForm.Form, {onSubmit:  this.handleSubmit}, 
        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('sticker.font_size.label') }, 

          React.createElement(Input, {
            ref: "fontSize", 
            value:  settings.textareaStyles.fontSize}
          )
        ), 

        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('sticker.angle.label') }, 

          React.createElement(Input, {
            ref: "transform", 
            value:  settings.widgetStyles.transform}
          )
        ), 

        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('sticker.background.label') }, 

          React.createElement(ColorInput, {
            ref: "background", 
            value:  settings.widgetStyles.background}
          )
        ), 

        React.createElement(HForm.Submit, {value:  global.I18n.t('configurator.submit.value') })
      )
    );
  }
});

module.exports = StickerConfigsForm;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
var Mixins = global.OS.Mixins,
    Widget = global.OS.Widget,

    IForm = global.OS.IForm,
    Textarea = global.OS.Textarea,

    Configurator = require('./configurator'),
    settings = require('./settings');

var _Widget = React.createClass({displayName: "_Widget",
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      value: '',

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,
      widgetStyles: settings.DEFAULT_WIDGET_STYLES,

      textareaStyles: settings.DEFAULT_TEXTAREA_STYLES
    };
  },

  handleChange: function (value) {
    this.setState({
      value: value
    }, this.saveSettings);
  },

  _getSettings: function () {
    return {
      value: this.state.value,

      size: _.clone(this.state.size),
      position: _.clone(this.state.position),
      widgetStyles: _.clone(this.state.widgetStyles),
      textareaStyles: _.clone(this.state.textareaStyles)
    };
  },

  componentWillMount: function () {
    this.init();
  },

  _load: function (onLoad) {
    this.loadSettings(onLoad);
  },

  render: function () {
    return (
      React.createElement(Widget.Widget, {widgetStyles:  this.getWidgetStyles() }, 
        React.createElement(Widget.DefaultIconsContainer, {
          onMouseDownPositionBtn:  this.handleStartMoving, 
          onClickCloseBtn:  this.close, 
          onClickConfigureBtn:  this.openConfigurator}
        ), 

          React.createElement(IForm.Form, {
            style:  settings.FORM_STYLES}, 

            React.createElement(IForm.Field, {
              containerStyle:  settings.MESSAGE_FIELD_STYLES, 
              labelText: "message"}, 

              React.createElement(Textarea, {
                value:  this.state.value, 
                onChange:  this.handleChange, 
                style:  this.state.textareaStyles}
              )
            )
          )

      )
    );
  },

  _createConfigurator: function () {
    return (
      React.createElement(Configurator, {
        name:  this.getName(), 
        settings:  this.getSettings(), 
        onClose:  this.handleCloseConfigurator, 
        onSubmit:  this.handleConfigure}
      )
    );
  }
});

module.exports = _Widget;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./configurator":1,"./settings":6}]},{},[2])