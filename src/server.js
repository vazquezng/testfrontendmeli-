/**
 @flow
 */

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import nodeFetch from "node-fetch";
import React from "react";
import ReactDOM from "react-dom/server";
import PrettyError from "pretty-error";
import Loadable from "react-loadable";

import { MLAService } from "helpers/apiService";
import { responseApi, getCategories } from "helpers/commonfn";
import App from "./components/App";
import Html from "./components/Html";
import { ErrorPageWithoutStyle } from "./routes/error/ErrorPage";
import errorPageStyle from "./routes/error/ErrorPage.css";
import router from "./router";

// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from "./chunk-manifest.json"; // eslint-disable-line import/no-unresolved
import config from "./config";

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || "all";

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set("trust proxy", config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// ENDPOINT LOCAL QUE FUNCIONA COMO MIDDLEWARE ENTRE LA WEB Y LA API DE ML
// -----------------------------------------------------------------------------
app.get("/api/items", async (req, res, next) => {
  try {
    const response = await MLAService.getSearchItems(req.query.q);

    const categories = getCategories(response.filters);
    res.json(
      responseApi({
        categories,
        items: response.results.map(item => ({
          id: item.id,
          title: item.title,
          price: {
            amount: item.price,
            decimals: 0,
            currency: "$"
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          state_name: item.address.state_name
        }))
      })
    );
  } catch (err) {
    next(err);
  }
});
//
// ENDPOINT LOCAL QUE FUNCIONA COMO MIDDLEWARE ENTRE LA WEB Y LA API DE ML
// -----------------------------------------------------------------------------
app.get("/api/items/:id", async (req, res, next) => {
  console.log(req);
  try {
    const [item, description] = await MLAService.getDetailsAllItem(
      req.params.id
    );
    const categoriesRoot = await MLAService.getCategories(item.category_id);
    const categories = categoriesRoot.path_from_root.map(path => path.name);
    res.json(
      responseApi({
        categories,
        item: {
          id: item.id,
          title: item.title,
          price: {
            amount: item.price,
            decimals: 0,
            currency: "$"
          },
          picture: item.pictures[0].url,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          sold_quantity: item.sold_quantity,
          description: description.plain_text
        }
      })
    );
  } catch (err) {
    next(err);
  }
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get("*", async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      // The twins below are wild, be careful!
      fetch: nodeFetch,
      pathname: req.path,
      query: req.query
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>
    );
    data.styles = [{ id: "css", cssText: [...css].join("") }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk("client");
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    const preloads = new Set();
    const preloadsDupl = {};
    for (const key in chunks) {
      chunks[key].forEach((asset, key) => (preloadsDupl[asset] = asset));
    }
    for (const asset in preloadsDupl) {
      preloads.add(asset);
    }

    data.scripts = Array.from(scripts);
    data.preloads = Array.from(preloads);

    data.app = {
      apiUrl: config.api.clientUrl
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage("express");

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: "css", cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  Loadable.preloadAll().then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept("./router");
}

export default app;
