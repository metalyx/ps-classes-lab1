import { Reports } from './models';

export type employee = {
    name: string;
    role: string;
};

export type borrower = {
    name: string;
    email: string;
};

export type book = {
    title: string;
    authors: string[];
    publicationYears: number[];
    isAvailable: boolean;
};

export type reports =
    | Reports.GET_ALL_BOOKS
    | Reports.GET_ALL_BORROWERS
    | Reports.GET_ALL_EMPLOYEES
    | Reports.GET_AVAILABLE_BOOKS
    | Reports.GET_NOT_AVAILABLE_BOOKS
    | Reports.GET_OVERDUE_BORROWERS
    | Reports.GET_ALL_BOOKINGS
    | Reports.GET_ACTIVE_BOOKINGS;
