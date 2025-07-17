import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const apiClient = axios.create({
    baseURL: apiURL,
});

export default apiClient;