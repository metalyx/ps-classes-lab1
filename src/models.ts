export interface Book {
    id: number;
    title: string;
    authors: string[];
    publicationYears: number[];
    isAvailable: boolean;
}

export interface Employee {
    id: number;
    name: string;
    role: string;
}

export interface Booking {
    id: number;
    date: string;
    due: string;
    books: Book['id'][];
    isActive: boolean;
}

export interface Borrower {
    id: number;
    name: string;
    email: string;
    bookings: Booking['id'][];
}

// OLD REPORT IMPLEMENTATION
// export interface Report {
//     getAllBooks?: boolean;
//     getAvailableBooks?: boolean;
//     getNotAvailableBooks?: boolean;
//     getAllBorrowers?: boolean;
//     getOverdueBorrowers?: boolean;
//     getAllEmployees?: boolean;
// }

export enum Reports {
    GET_ALL_BOOKS = 'GET_ALL_BOOKS',
    GET_AVAILABLE_BOOKS = 'GET_AVAILABLE_BOOKS',
    GET_NOT_AVAILABLE_BOOKS = 'GET_NOT_AVAILABLE_BOOKS',
    GET_ALL_BORROWERS = 'GET_ALL_BORROWERS',
    GET_OVERDUE_BORROWERS = 'GET_OVERDUE_BORROWERS',
    GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES',
    GET_ALL_BOOKINGS = 'GET_ALL_BOOKINGS',
    GET_ACTIVE_BOOKINGS = 'GET_ACTIVE_BOOKINGS',
}
