import axios from "axios";
import { API_DOMAIN } from "../constants/schema";

export const http = axios.create({
    withCredentials: true,
    baseURL: API_DOMAIN,
});