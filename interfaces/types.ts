

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



export interface expectedCategory{
    status: number;
    categories: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    }[];
}


export interface expectedBook{
    message: string;
    status: number;
    books: {
        id: number;
        title: string;
        author: string;
        category: string;
        description: string;
        coverImage: string;
        contentSrc: string;
        price: number;
    }[]
}

export interface expectedAuthor{
    status: number;
    author: {
        id: number;
        fullName: string;
        phoneNumber: string;
        email: string;
        Bio: string;
        avatar: string;
        createdAt: string;
        updatedAt: string;
    }[]
}



export type RootStackParamList = {
    Welcome: undefined;
    BookScreen: { bookId: number };
    Home: undefined;
    Login: undefined;
    signup: undefined;
    BookDetailScreen: { bookId: number}
    CategoryScreen: undefined;
    AuthorScreen: undefined;
}