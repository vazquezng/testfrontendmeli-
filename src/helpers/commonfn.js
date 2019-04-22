import { urls, urlWithQueryString } from "../router";

import history from "../history";

export function getUrl(name, params = {}) {
  return urls(name, params);
}

export function getUrlWithQueryString(name, params = {}) {
  return urlWithQueryString(name, params);
}

export function pushHistory(name, params = {}) {
  history.push(getUrl(name, params));
}

export function responseApi(data) {
  return {
    author: {
      name: "Nicolas",
      lastname: "Vazquez"
    },
    ...data
  };
}

export function getCategories(filters) {
  const categoriesRoot = filters.find(f => f.id === "category");
  let categories = [];
  if (categoriesRoot) {
    categoriesRoot.values.forEach(catego => {
      if (catego.path_from_root.length > categories.length) {
        categories = catego.path_from_root.map(path => path.name);
      }
    });
  }

  return categories;
}

export function formatCurrency(number) {
  return new Intl.NumberFormat("es-AR").format(number);
}
