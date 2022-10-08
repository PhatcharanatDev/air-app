import http from "../http-common";

class ChecklistDataService {
  getAll() {
    return http.get("/checklists");
  }

  getAllByAir(id) {
    return http.get(`/checklists/air/${id}`);
  }

  get(id) {
    return http.get(`/checklists/${id}`);
  }

  create(data) {
    return http.post("/checklists", data);
  }

  update(id, data) {
    return http.put(`/checklists/${id}`, data);
  }

  delete(id) {
    return http.delete(`/checklists/${id}`);
  }

  deleteAll() {
    return http.delete(`/airs`);
  }

  findByTitle(title) {
    return http.get(`/airs?title=${title}`);
  }
}

export default new ChecklistDataService();