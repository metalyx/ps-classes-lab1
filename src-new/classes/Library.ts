class Library {
    private static lastBookId = 0;
    private static lastEmployeeId = 0;
    private static lastClientId = 0;
    private static lastTransitionId = 0;

    // All active books in a library
    private bookCollection = [];
    // Archived books
    private booksArchivedCollection = [];

    // All active employees
    private employees = [];
    // Previous employees
    private archivedEmployees = [];

    // All current clients
    private clients = [];
    // Archived clients
    private archivedClients = [];

    /* 1. MUTATION METHODS */

    /* 1.1 BOOKS */

    // Insert into books collection
    addBook() {}

    // Archive book, set it unavailable
    removeBook() {}

    /* 1.2 EMPLOYEES */

    // Attach employee to library
    addEmployee() {}

    // Remove from library
    removeEmployee() {}

    /* 1.3 CLIENTS */

    // Create client
    addClient() {}

    // Archive client
    removeClient() {}

    /* 1.4 Books transitions */

    // Give book to client
    bookGiveAway() {}

    // Take book from client
    bookTakeBack() {}

    /* 2. GET INFORMATION */

    /* CLIENTS */

    // Return client information
    getClientInfo() {}

    // Return deleted/archived clients info
    getArchivedClientInfo() {}

    /* EMPLOYEES */

    // Return employee information
    getEmployeeInfo() {}

    // Return deleted/archived employee info
    getArchivedEmployeeInfo() {}

    /* BOOKS TRANSITIONS */

    // Return all transitions
    getAllBooksTransitionHistory() {}
}
