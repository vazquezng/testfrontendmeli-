/**
Layout 1 donde se define componentes fijos y los screen del router.
 */

import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";

// external-global styles must be imported in your JS.
import normalizeCss from "normalize.css";
import s from "./Layout.scss";
import Header from "../Header";

class Layout extends React.Component {
  static propTypes = {
    query: PropTypes.object,
    children: PropTypes.node.isRequired
  };

  static propsDefault = {
    query: null
  };

  render() {
    return (
      <div>
        <Header query={this.props.query} />
        <section>{this.props.children}</section>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
