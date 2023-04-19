import { Book, Employee, Borrower, Booking, Reports } from './models';

import { employee, book, borrower, reports } from './types';

import { addDays } from './helpers';

class Library {
    lastBookingId = 0;
    lastBookId = 0;
    lastEmpoyeeId = 0;
    lastBorrowerId = 0;

    books: Book[] = [];
    employees: Employee[] = [];
    borrowers: Borrower[] = [];
    bookings: Booking[] = [];

    addNewBook(book: book) {
        // 1 Book with the same title is exist
        // 2 Should we use unique id for all libraries or unique for each instance
        // 3 Should we have separate availability status

        this.books.push({
            ...book,
            id: this.lastBookId + 1,
        });

        this.lastBookId += 1;
    }

    removeBook(id: number) {
        // 1 Should we remove it completely or keep history/tracking/archive

        this.books = this.books.filter((item) => item.id !== id);
    }

    bookCheckOut(bookId: number, borrowerId: number) {
        // 1 Should we have default due for borrowing a book?

        const bookToCheck = this.books.find((item) => item.id === bookId);
        const borrower = this.borrowers.find((b) => b.id === borrowerId);

        if (bookToCheck && borrower && bookToCheck.isAvailable === true) {
            bookToCheck.isAvailable = false;

            const booking: Booking = {
                id: this.lastBookingId + 1,
                books: [bookToCheck.id],
                date: new Date().toString(),
                due: addDays(new Date(), 30).toString(),
                isActive: true,
            };

            borrower.bookings.push(booking.id);
            this.bookings.push(booking);

            this.lastBookingId += 1;
        } else {
            console.error(
                'Please double check the provided bookId, borrowedId and book availability...'
            );
        }
    }

    bookCheckIn(bookId: number, borrowerId: number, bookingId: number) {
        const bookToCheck = this.books.find((book) => book.id === bookId);
        const borrower = this.borrowers.find(
            (borrower) => borrower.id === borrowerId
        );
        const booking = this.bookings.find(
            (booking) => booking.id === bookingId
        );

        if (bookToCheck && borrower && booking) {
            bookToCheck.isAvailable = true;
            booking.isActive = false;

            // Fee for overdue goes here

            borrower.bookings = borrower.bookings.filter(
                (id) => id !== bookingId
            );
        }
    }

    getBookAvailability(bookId: number) {
        const foundBook = this.books.find((book) => book.id === bookId);

        if (foundBook) {
            return foundBook.isAvailable;
        } else {
            console.warn(`Book with bookId ${bookId} was not found...`);
            return false;
        }
    }

    addEmployee({ name, role }: employee) {
        this.employees.push({
            id: this.lastEmpoyeeId + 1,
            name,
            role,
        });

        this.lastEmpoyeeId += 1;
    }

    removeEmployee(employeeId: number) {
        this.employees = this.employees.filter(
            (employee) => employee.id !== employeeId
        );
    }

    getEmployeeInfo(employeeId: number) {
        return this.employees.find((employee) => employee.id === employeeId);
    }

    addBorrower({ name, email }: borrower) {
        this.borrowers.push({
            name,
            email,
            bookings: [],
            id: this.lastBorrowerId + 1,
        });

        this.lastBorrowerId += 1;
    }

    removeBorrower(borrowerId: number) {
        this.borrowers = this.borrowers.filter(
            (borrower) => borrower.id !== borrowerId
        );
    }

    getBorrowerInfo(borrowerId: number) {
        const foundBorrower = this.borrowers.find(
            (borrower) => borrower.id === borrowerId
        );

        if (foundBorrower) {
            return foundBorrower;
        } else {
            console.warn(
                `Borrower with borrowerId ${borrowerId} was not found...`
            );
            return;
        }
    }

    getReport(reports: reports) {
        switch (reports) {
            case Reports.GET_ALL_BOOKS:
                console.table(this.books);
                return this.books;
            case Reports.GET_ALL_EMPLOYEES:
                console.table(this.employees);
                return this.employees;
            case Reports.GET_ALL_BORROWERS:
                console.table(this.borrowers);
                return this.borrowers;
            case Reports.GET_AVAILABLE_BOOKS:
                const availableBooks = this.books.filter(
                    (book) => book.isAvailable
                );
                console.table(availableBooks);
                return availableBooks;
            case Reports.GET_NOT_AVAILABLE_BOOKS:
                const notAvailableBooks = this.books.filter(
                    (book) => !book.isAvailable
                );
                console.table(notAvailableBooks);
                return notAvailableBooks;
            case Reports.GET_OVERDUE_BORROWERS:
                console.log('This feature is in development right now...');
                return null;
            case Reports.GET_ALL_BOOKINGS:
                console.table(this.bookings);
                return this.books;
            case Reports.GET_ACTIVE_BOOKINGS:
                const activeBookings = this.bookings.filter(
                    (booking) => booking.isActive
                );
                console.table(activeBookings);
                return activeBookings;
            default:
                throw new Error('Unexpected report type provided...');
        }

        /* THE OLD IMPLEMENTATION BELOW */

        // const resultReport: any[] = [];

        // if (getAllBooks) {
        //     resultReport.push(this.books);
        // }

        // if (getAllBorrowers) {
        //     resultReport.push(this.borrowers);
        // }
        // if (getAvailableBooks) {
        //     resultReport.push(this.books.filter((book) => book.isAvailable));
        // }
        // if (getNotAvailableBooks) {
        //     resultReport.push(this.books.filter((book) => !book.isAvailable));
        // }
        // if (getAllEmployees) {
        //     resultReport.push(this.employees);
        // }
        // if (getOverdueBorrowers) {
        //     // Due handling goes here

        //     console.error(
        //         'This feature is on development stage and not yet available...'
        //     );
        // }

        // return resultReport;
    }

    getBookByTitle(title: string) {
        const foundBook = this.books.find((book) => book.title === title);

        return foundBook ? foundBook : null;
    }

    getBorrowersBorrowedBookIds(
        borrowerId?: Borrower['id'],
        borrowerEmail?: Borrower['email']
    ) {
        if (borrowerId) {
            const borrower = this.borrowers.find(
                (borrower) => borrower.id === borrowerId
            );
            if (borrower) {
                // const activeBookingsOfBorrower = this.bookings.filter(booking => booking.isActive)
                const activeBookings = this.getReport(
                    Reports.GET_ACTIVE_BOOKINGS
                ) as unknown as Booking[];
                if (activeBookings) {
                    const activeBookingsOfBorrower = activeBookings.filter(
                        (booking) => borrower.bookings.includes(booking.id)
                    );
                    const bookIds = activeBookingsOfBorrower.map(
                        (booking) => booking.books
                    );
                    return bookIds.flat();
                }
            }
            return;
        } else if (borrowerEmail) {
            return this.borrowers.find(
                (borrower) => borrower.email === borrowerEmail
            );
        } else {
            throw new Error(
                'Expected borrowerId or borrowerEmail to be provided'
            );
        }
    }
}

// delete
const l = new Library();
l.getReport(Reports['GET_ALL_BOOKS']);

// We can use or not this singletone pattern
export default new Library();
