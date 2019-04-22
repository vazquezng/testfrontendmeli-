/**

 */

import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Home.scss";

class Home extends React.Component {
  render() {
    return <div className={s.root} />;
  }
}

export default withStyles(s)(Home);
