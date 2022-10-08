import http from "../http-common";

class AirDataService {
  getAll() {
    return http.get("/airs");
  }

  get(id) {
    return http.get(`/airs/${id}`);
  }

  create(data) {
    return http.post("/airs", data);
  }

  update(id, data) {
    return http.put(`/airs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/airs/${id}`);
  }

  deleteAll() {
    return http.delete(`/airs`);
  }

  findByTitle(title) {
    return http.get(`/airs?title=${title}`);
  }
}

export default new AirDataService();