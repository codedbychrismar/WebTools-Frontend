import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';
import type { Tool, CreateToolRequest, ApiResponse } from '../adminTypes';


// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const toolsApi = {
    // 🧩 CREATE
    createTool: async (toolData: CreateToolRequest): Promise<Tool> => {
        const response = await api.post<ApiResponse<Tool>>('/tools', toolData);
        return response.data.data;
    },

    // 🧰 GET ALL
    getAllTools: async (): Promise<Tool[]> => {
        const response = await api.get<ApiResponse<Tool[]>>('/tools');
        return response.data.data;
    },

    // 🔍 GET BY ID
    getToolById: async (id: string): Promise<Tool> => {
        const response = await api.get<ApiResponse<Tool>>(`/tools/${id}`);
        return response.data.data;
    },

    // 🔧 UPDATE
    updateTool: async (id: string, toolData: Partial<CreateToolRequest>): Promise<Tool> => {
        const response = await api.put<ApiResponse<Tool>>(`/tools/${id}`, toolData);
        return response.data.data;
    },

    // 🗑️ DELETE
    deleteTool: async (id: string): Promise<void> => {
        await api.delete<ApiResponse<void>>(`/tools/${id}`);
    },

    // 🧭 GET ALL CATEGORIES
    getCategories: async (): Promise<string[]> => {
        const response = await api.get<ApiResponse<string[]>>('/tools/categories');
        return response.data.data;
    },
};