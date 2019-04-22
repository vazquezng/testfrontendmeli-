/**

 */

import React from "react";
import Layout from "components/Layout";
import { LocalApiService } from "helpers/apiService";
import DetailsProduct from "./DetailsProduct";

async function action({ params }) {
  const response = await LocalApiService.getDetailsItem(params.id);
  return {
    title: "Details Products - Mercado Libre",
    chunks: ["detailsProducts"],
    component: (
      <Layout>
        <DetailsProduct item={response.item} categories={response.categories} />
      </Layout>
    )
  };
}

export default action;
