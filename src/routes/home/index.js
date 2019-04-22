/**

 */

import React from "react";
import Layout from "components/Layout";
import Home from "./Home";

async function action({ fetch }) {
  return {
    title: "Search Products - Mercado Libre",
    chunks: ["home"],
    component: (
      <Layout>
        <Home />
      </Layout>
    )
  };
}

export default action;
