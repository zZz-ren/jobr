import axios from "axios";

export const BACKEND_URL =
  import.meta.env.MODE == "development" ? import.meta.env.BACKEND_URL : "/";

export const api = axios({
  baseURL: BACKEND_URL,
});
