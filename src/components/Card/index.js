import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./index.scss";

function Card({ content, padding }) {
  return (
    <div className={[s.container, s[padding]].join(" ")}>
      <div>{content && content}</div>
    </div>
  );
}

export default withStyles(s)(Card);
