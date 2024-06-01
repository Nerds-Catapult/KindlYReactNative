

export interface expectedJson {
    status: number;
    message: string;
    isAuthenticated: boolean;
    token: string;
    data: {
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: string;
        updatedAt: string;
    } | null;
}
