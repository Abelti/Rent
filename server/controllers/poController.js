function register(req, res, next) {
    // Your code to register a new user goes here.
    // This function should take user details as input and send a POST request to the server.
    // The server should then process the request and add the user to the database.
    // You should also handle any potential errors that may occur during the registration process.

    const { first_name, last_name, phone, email, address, password, subscription, payment_method, payment_info, id_picture } = req.body;
    if (!first_name || !last_name || !phone || !email || !address || !password || !subscription || !payment_method || !payment_info || !id_picture) {
        res.status(400);
        res.send("All fields are required.");
    }

    res.send(first_name + " " + last_name + " ");
}

function login() {
    // Your code to handle user login goes here.
    // This function should take user credentials as input and send a POST request to the server.
    // The server should then process the request and validate the user's credentials.
    // You should also handle any potential errors that may occur during the login process.
}

module.exports = { register, login };