import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import s from "./Breadcrumb.scss";

const Breadcrumb = ({ paths }) => (
  <div>
    <ol>
      {paths.map((path, key) => (
        <React.Fragment key={path.split(" ").join("-")}>
          <li>
            <span>{path}</span>
          </li>
          {key < paths.length - 1 && <div className={s.chevron} />}
        </React.Fragment>
      ))}
    </ol>
  </div>
);

Breadcrumb.propTypes = {
  paths: PropTypes.array.isRequired
};

export default withStyles(s)(Breadcrumb);
