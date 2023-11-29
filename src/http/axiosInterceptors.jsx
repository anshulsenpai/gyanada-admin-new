import axios from "axios";

const customAxios = axios.create();

const token = localStorage.getItem("token");

export const BASE_URL = "http://192.168.213.134:8080/api/web";

export const publicRequest = customAxios.create({
  baseURL: BASE_URL,
});

export const userRequest = customAxios.create({
  baseURL: BASE_URL,
  headers: { Authorization: token },
});

export const userMultipartRequest = customAxios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token,
    "content-type": "multipart/form-data",
  },
});
