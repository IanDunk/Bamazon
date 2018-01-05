var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazonDB"
});

// When user connects, begin regime
connection.connect(function(err) {
  if(err) throw err;
  console.log("connected as id " + connection.threadID);
  displayInventory();
  promptCustomerId();
});

// Display products and product information
function displayInventory() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;
        
        console.log("\nCurrent Inventory");
        console.log("#################\n");
        
        for(var i = 0; i < data.length; i++) {
            console.log("Item id: " + data[i].id);
            console.log("Item name: " + data[i].product_name);
            console.log("Department name: " + data[i].department_name);
            console.log("Item price: " + data[i].price);
            console.log("Current stock: " + data[i].stock_quantity);
            console.log("\n-----------------\n");
        }
    });
}

// first prompt, ask customer what ID and how much
function promptCustomerId() {
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "What product id are you looking for?",
    }]).then(function (answer) {
        // Flag turns true if id passed in is equal to an id in the database
        var flag = false;
        connection.query("SELECT * FROM products", function(err, data) {
            if (err) throw err;
            for(var i = 0; i < data.length; i++) {
                if(parseFloat(answer.id) === parseFloat(data[i].id)) {
                    flag = true;
                }
            }

            // Put here because connection.query is asynchronous
            // If id is found, promt user how many, otherwise ask again.
            if(flag) {
                promptCustomerQuantity(answer.id);
            } else {
                console.log("Missing product");
                promptCustomerId();
            }
        });
    });
}

// Promts customer how many of the product they would like, completes transaction if there is enough product in stock
function promptCustomerQuantity(answerID) {
    inquirer.prompt([{
        type: "input",
        name: "stock_quantity",
        message: "How many would you like?",
    }]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE id = ?", [answerID], function(err, data) {
            if (err) throw err;

            // Check to see if too much, if not, complete the purchase
            if(parseFloat(answer.stock_quantity) <= parseFloat(data[0].stock_quantity)) {
                completeTransaction(answerID, answer.stock_quantity);
            } else {
                console.log("Sorry, it looks like we don't have enough.");
                promptCustomerId(); // could make a 'would you like to make a different purchase or change item quantity' option here
            }
        });
    });
}

// Update product information and return transaction price
function completeTransaction(productID, stockPurchased) {
    
    // Getting price and new quantity
    connection.query("SELECT * FROM products WHERE id = ?", [productID], function(err, data) {
        if (err) throw err;

        var totalPrice = parseFloat(data[0].price) * parseFloat(stockPurchased);
        var newQuantity = parseFloat(data[0].stock_quantity) - parseFloat(stockPurchased);      
        
        // Updating the new stock_quantity for the product and returning the total price      
        connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?",[newQuantity, productID], function(err, result) {
            if (err) throw err;

            console.log("\nPurchase complete");
            console.log("TOTAL BILL: " + totalPrice + "\n");

            //promptCustomerId(); // keep making purchases ... or an 'are you done option' in the future
        });
    });
}