/**
Components Header para todo el sitios
 */

import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import logoUrl from "assets/Logo_ML.png";
import logoUrl2x from "assets/Logo_ML@2x.png";
import s from "./Header.scss";
import Search from "../Search";
import Link from "../Link";

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <img src={logoUrl} srcSet={`${logoUrl2x} 2x`} width="46" alt="Meli" />
          <Search queryDefault={this.props.query} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
