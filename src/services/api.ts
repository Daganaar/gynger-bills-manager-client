// src/services/api.ts

import axios from "axios";
import { Bill } from "../types/Bill";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchBills = async (): Promise<Bill[]> => {
    const response = await api.get<Bill[]>("/bills");
    console.log("Fetched bills:", response.data);
    return response.data;
};

export const uploadCSV = async (formData: FormData) => {
    await api.post("/bills", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    // await api.post("/bills", formData);
};
