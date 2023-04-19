import { Book, Booking, Reports } from './models';
import { book, borrower, employee } from './types';
import lib from './Library';

export const logShowCases = () => {
    // tests

    // datasets
    const booksToAdd: book[] = [
        {
            title: 'Random title',
            authors: ['Jack London'],
            isAvailable: true,
            publicationYears: [1867, 1923, 2001],
        },
        {
            title: 'Random title sgd123',
            authors: ['Leo Tolstoy'],
            isAvailable: true,
            publicationYears: [1832, 1912, 2021],
        },
        {
            title: 'Another title here',
            authors: ['Alex Murey'],
            isAvailable: true,
            publicationYears: [2012, 2013, 2022],
        },
    ];

    const employeesToAdd: employee[] = [
        {
            name: 'John Doe',
            role: 'Assistant Librarian',
        },
        {
            name: 'Mike Corn',
            role: 'Head Librarian',
        },
    ];

    const borrowerToAdd: borrower = {
        name: 'Random Borrower',
        email: 'random.borrower@gmail.com',
    };

    const bookToBeDeleted = {
        title: 'Book to be deleted',
        authors: ['Random'],
        publicationYears: [2023],
        isAvailable: true,
    };

    /*
     ****************************************
     ****************************************
     ****************************************
     ********LIBRARY ADDING METHODS**********
     ****************************************
     ****************************************
     ****************************************
     */

    // Adding books to library
    booksToAdd.forEach((book) => lib.addNewBook(book));

    // Adding one book
    lib.addNewBook(bookToBeDeleted);

    // Searching for book by its title
    const theBook = lib.getBookByTitle('Book to be deleted');

    if (theBook) {
        // Removing the book from collection
        lib.removeBook(theBook.id);
    }

    // Adding employees to library
    employeesToAdd.forEach((employee) => lib.addEmployee(employee));

    // Adding borrower to library
    lib.addBorrower(borrowerToAdd);

    /*
     ****************************************
     ****************************************
     ****************************************
     ***************SHOWCASES****************
     ****************************************
     ****************************************
     ****************************************
     */

    console.log(
        'available books: ',
        lib.getReport(Reports.GET_AVAILABLE_BOOKS)
    );

    // Check out ALL AVAILABLE BOOKS to the borrower with id 1

    // Get all books using customizable report method
    const allAvailableBooks = lib.getReport(Reports.GET_AVAILABLE_BOOKS) as Book[];
    // Get borrower with id 1
    const bor = lib.getBorrowerInfo(1);
    if (allAvailableBooks.length > 0 && bor) {
        // Check out every available book
        allAvailableBooks.forEach((book) => {
            lib.bookCheckOut(book.id, bor.id);
        });
        console.log('checked out all available books...');
    }

    // borrower want to return book with title Another title here
    if (bor) {
        // bor.bookings.forEach((booking) => booking.)
        
        const bookingsOfPerson = lib.getReport(Reports.GET_ALL_BOOKINGS) as unknown as Booking[];
        const borrowedBooks = lib.getReport(Reports.GET_NOT_AVAILABLE_BOOKS) as unknown as Book[];

        if(bookingsOfPerson){
            const borrowedBooks = bookingsOfPerson.filter((booking) => booking.isActive).map((booking) => booking.books);
            
            borrowedBooks.forEach((books) => {
                if(books.includes()) {
                    borrowedBooks.
                }
            })
        }

        // search for booking
        // const booking = bor.bookings.find(
        //     (booking) => booking.book.title === 'Another title here'
        // );

        // if (booking) {
        //     // return the book
        //     lib.bookCheckIn(booking.book.id, bor.id, booking.id);
        //     console.log('some borrower returned one book...');
        // }
    }

    // Now we have only one available book
    console.log(
        'available books: ',
        lib.getReport(Reports.GET_AVAILABLE_BOOKS)
    );

    console.log('Employees: ', lib.getReport(Reports.GET_ALL_EMPLOYEES));

    console.log('Borrowers: ', lib.getReport(Reports.GET_ALL_BORROWERS));

    console.log('All boks in library: ', lib.getReport(Reports.GET_ALL_BOOKS));
};
