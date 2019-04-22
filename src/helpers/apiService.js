import axios from "axios";

const apiLocal = "http://localhost:3000/api";
const apiMLA = "https://api.mercadolibre.com";

export class MLAService {
  static getSearchItems(query) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiMLA}/sites/MLA/search?q=${query}`
      })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(error => {
          reject(error);
        });
    });
  }

  static getDetailsItem(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiMLA}/items/${id}`
      })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(error => {
          reject(error);
        });
    });
  }

  static getDescriptionItem(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiMLA}/items/${id}/description`
      })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(error => {
          reject(error);
        });
    });
  }

  static getCategories(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiMLA}/categories/${id}`
      })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(error => {
          reject(error);
        });
    });
  }

  static getDetailsAllItem(id) {
    return Promise.all([
      MLAService.getDetailsItem(id),
      MLAService.getDescriptionItem(id)
    ]);
  }
}

export class LocalApiService {
  static getSearchItems(query) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiLocal}/items?q=${query}`
      })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(error => {
          reject(error);
        });
    });
  }

  static getDetailsItem(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiLocal}/items/${id}`
      })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(error => {
          reject(error);
        });
    });
  }
}
