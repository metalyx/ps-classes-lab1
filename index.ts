function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  interface Book {
    id: number;
    title: string;
    authors: string[];
    publicationYears: number[];
    isAvailable: boolean;
  }

  type book = {
    title: string;
    authors: string[];
    publicationYears: number[];
    isAvailable: boolean;
  }
  
  interface Employee {
    id: number;
    name: string;
    role: string;
  }
  
  type employee = {
    name: string,
    role: string,
  }
  
  interface Booking {
    id: number;
    date: string;
    due: string;
    book: Book;
    isActive: boolean;
  }
  
  interface Borrower {
    id: number;
    name: string;
    email: string;
    bookings: Booking[];
  }
  
  type borrower = {
    name: string;
    email: string;
    bookings: Booking[];
  }
  
  interface Report {
    getAllBooks?: boolean,
    getAvailableBooks?: boolean,
    getNotAvailableBooks?: boolean,
    getAllBorrowers?: boolean,
    getOverdueBorrowers?: boolean,
    getAllEmployees?: boolean,
  }
  
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
        this.books.push({
            ...book,
            id: this.lastBookId + 1,
        });

        this.lastBookId += 1;
    };

    removeBook(id: number) {
        this.books = this.books.filter((item) => item.id !== id);
    };
  
    bookCheckOut(bookId: number, borrowerId: number) {
        const bookToCheck = this.books.find((item) => item.id === bookId);
        const borrower = this.borrowers.find((b) => b.id === borrowerId);
  
        if (bookToCheck && borrower && bookToCheck.isAvailable === true) {
            bookToCheck.isAvailable = false;
  
            const booking: Booking = {
                id: this.lastBookingId + 1,
                book: bookToCheck,
                date: new Date().toString(),
                due: addDays(new Date(), 30).toString(),
                isActive: true,
            }
  
            borrower.bookings.push(booking);
            this.bookings.push(booking);
  
            this.lastBookingId += 1;
        } else {
            console.error('Please double check the provided bookId, borrowedId and book availability...')
        }
  
    };
  
    bookCheckIn(bookId: number, borrowerId: number, bookingId: number) {
        const bookToCheck = this.books.find((book) => book.id === bookId);
        const borrower = this.borrowers.find((borrower) => borrower.id === borrowerId);
        const booking = this.bookings.find((booking) => booking.id === bookingId);
        
        if (bookToCheck && borrower && booking) {
            bookToCheck.isAvailable = true;
            booking.isActive = false;
  
            // Fee for overdue goes here
  
            const borrowersBooking = borrower.bookings.find((booking) => booking.id === bookingId);
            if (borrowersBooking) {
                borrowersBooking.isActive = false;
            }
        }
    };
  
    getBookAvailability(bookId: number) {
        const foundBook = this.books.find((book) => book.id === bookId);
  
        if (foundBook) {
            return foundBook.isAvailable;
        } else {
            console.warn(`Book with bookId ${bookId} was not found...`)
            return false;
        }
    };
  
    addEmployee({ name, role }: employee) {
        this.employees.push({
            id: this.lastEmpoyeeId + 1,
            name,
            role
        });
  
        this.lastEmpoyeeId += 1;
    };
  
    removeEmployee(employeeId: number) {
        this.employees = this.employees.filter((employee) => employee.id !== employeeId);
    };
  
    getEmployeeInfo(employeeId: number) {
        return this.employees.find((employee) => employee.id === employeeId);
    };
  
    addBorrower({ bookings, email, name }: borrower) {
        this.borrowers.push({
            name,
            email,
            bookings,
            id: this.lastBorrowerId + 1,
        });
  
        this.lastBorrowerId += 1;
    };
  
    removeBorrower(borrowerId: number) {
        this.borrowers = this.borrowers.filter((borrower) => borrower.id !== borrowerId)
    };
  
    getBorrowerInfo(borrowerId: number) {
        const foundBorrower = this.borrowers.find((borrower) => borrower.id === borrowerId);
  
        if (foundBorrower) {
            return foundBorrower;
        } else {
            console.warn(`Borrower with borrowerId ${borrowerId} was not found...`)
            return;
        }
    };
    
    getReport({
        getAllBooks,
        getAllBorrowers,
        getAvailableBooks,
        getNotAvailableBooks,
        getOverdueBorrowers,
        getAllEmployees,
    }: Report) {
        const resultReport: any[] = [];
  
        if (getAllBooks) {
            resultReport.push(this.books);
        }
  
        if (getAllBorrowers) {
            resultReport.push(this.borrowers);
        }
        if (getAvailableBooks) {
            resultReport.push(this.books.filter((book) => book.isAvailable));
        }
        if (getNotAvailableBooks) {
            resultReport.push(this.books.filter((book) => !book.isAvailable));
        }
        if (getAllEmployees) {
            resultReport.push(this.employees);
        }
        if (getOverdueBorrowers) {
            // Due handling goes here

            console.error('This feature is on development stage and not yet available...');
        }
  
        return resultReport;
    };

    getBookByTitle(title: string) {
        const foundBook = this.books.find(book => book.title === title);

        return foundBook ? foundBook : null; 
    }
  }

// tests

const lib = new Library();

// datasets
const booksToAdd: book[] = [
    {
        title: 'Random title',
        authors: ['Jack London'],
        isAvailable: true,
        publicationYears: [1867, 1923, 2001]
    },
    {
        title: 'Random title sgd123',
        authors: ['Leo Tolstoy'],
        isAvailable: true,
        publicationYears: [1832, 1912, 2021]
    },
    {
        title: 'Another title here',
        authors: ['Alex Murey'],
        isAvailable: true,
        publicationYears: [2012, 2013, 2022]
    },
];

const employeesToAdd: employee[] = [
    {
        name: 'John Doe',
        role: 'Assistant Librarian'
    },
    {
        name: 'Mike Corn',
        role: 'Head Librarian'
    },
]

const borrowerToAdd: borrower = {
    name: 'Random Borrower',
    bookings: [],
    email: 'random.borrower@gmail.com'
}

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

console.log('available books: ', lib.getReport({ getAvailableBooks: true }));

// Check out ALL AVAILABLE BOOKS to the borrower with id 1


// Get all books using customizable report method
const allAvailableBooks = lib.getReport({ getAvailableBooks: true })[0] as Book[];
// Get borrower with id 1
const bor = lib.getBorrowerInfo(1);
if (allAvailableBooks.length > 0 && bor) {
    // Check out every available book
    allAvailableBooks.forEach(book => {
        lib.bookCheckOut(book.id, bor.id);
    });
    console.log("checked out all available books...");
}

// we shouldn't have any available books now
console.log('available books: ', lib.getReport({ getAvailableBooks: true }));

// borrower want to return book with title Another title here
if (bor) {
    // search for booking
    const booking = bor.bookings.find((booking) => booking.book.title === 'Another title here');

    if (booking) {
        // return the book
        lib.bookCheckIn(booking.book.id, bor.id, booking.id);
        console.log('some borrower returned one book...')
    }
}

// Now we have only one available book
console.log('available books: ', lib.getReport({ getAvailableBooks: true }));

console.log('Employees: ', lib.getReport({ getAllEmployees: true }));

console.log('Borrowers: ', lib.getReport({ getAllBorrowers: true }));

console.log('All boks in library: ', lib.getReport({ getAllBooks: true }));
