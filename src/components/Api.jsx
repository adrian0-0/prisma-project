import axios from "axios";

const todo_path = "http://localhost:3333/todos";

const api = axios.create({
  baseURL: todo_path,
});

export default api;
