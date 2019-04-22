/**

 */

import React from "react";
import Layout from "components/Layout";
import { LocalApiService } from "helpers/apiService";
import ListProducts from "./ListProducts";

async function action({ query }) {
  const response = await LocalApiService.getSearchItems(query.search);
  return {
    title: "List Products - Mercado Libre",
    chunks: ["listProducts"],
    component: (
      <Layout query={query}>
        <ListProducts items={response.items} categories={response.categories} />
      </Layout>
    )
  };
}

export default action;
