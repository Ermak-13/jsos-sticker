var Link = global.OS.Link;

var Shortcut = React.createClass({
  render: function () {
    return (
      <Link
        className={ this.props.className }
        onClick={ this.props.onClick }>

        <span className="fa fa-sticky-note" />
      </Link>
    );
  }
});

module.exports = Shortcut;
