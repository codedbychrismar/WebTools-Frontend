export type Tool = {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    url: string;
};


export interface CreateToolRequest {
    name: string;
    description: string;
    icon: string;
    category: string;
    url: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}