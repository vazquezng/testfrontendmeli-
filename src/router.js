/*
@flow
*/
import UniversalRouter from "universal-router";
import generateUrls from "universal-router/generateUrls";
import routes from "./routes";

const routerInstance = new UniversalRouter(routes, {
  resolveRoute(context, params) {
    if (context.route.content) {
      return { content: context.route.content };
    }

    if (typeof context.route.load === "function") {
      return context.route
        .load()
        .then(action => action.default(context, params));
    }
    if (typeof context.route.action === "function") {
      return context.route.action(context, params);
    }
    return undefined;
  }
});

export const urls = generateUrls(routerInstance);
export const urlWithQueryString = generateUrls(routerInstance, {
  stringifyQueryParams(params) {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&");
  }
});

export default routerInstance;
