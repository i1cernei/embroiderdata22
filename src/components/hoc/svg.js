import React, { Component } from "react";

class SVGElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg  {...this.props}
	    viewBox="0 0 24 24"
	    xmlns="<http://www.w3.org/2000/svg>"
		>
			{this.props.content}
    </svg>
    );
  }
}

export default SVGElement;