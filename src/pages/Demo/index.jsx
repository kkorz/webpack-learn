import React from "react";
import PropTypes from "prop-types";

class Demo extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  static defaultProps = {
    name: "webpack is working",
  };

  render() {
    return <div className="app">{this.props.name}</div>;
  }
}

export default Demo;
