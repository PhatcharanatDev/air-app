import http from "../http-common";

class PlaceDataService {
  getAll() {
    return http.get("/places");
  }
}

export default new PlaceDataService();