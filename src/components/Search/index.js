import React, { useState } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import icSearch from "assets/ic_Search.png";
import icSearch2x from "assets/ic_Search@2x.png";
import { getUrlWithQueryString } from "helpers/commonfn";
import history from "../../history";
import s from "./Search.scss";

function Search({ queryDefault }) {
  const [query, setQuery] = useState(
    queryDefault ? queryDefault.search.split("-").join(" ") : ""
  );
  const handleQuery = e => {
    console.log(e);
    history.push(
      getUrlWithQueryString("listProducts", {
        search: query.split(" ").join("-")
      })
    );
  };
  return (
    <div className={s.container}>
      <input
        value={query}
        type="text"
        placeholder="Nunca dejes de buscar"
        onChange={e => setQuery(e.target.value)}
      />
      <div className={s.search} onClick={e => handleQuery(e)}>
        <img src={icSearch} srcSet={`${icSearch2x} 2x`} width="18" alt="Meli" />
      </div>
    </div>
  );
}

export default withStyles(s)(Search);
