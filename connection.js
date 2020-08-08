const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var app = express();

// Defining port number
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

//Creating MySQL connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin123",
    database: "learners",
    multipleStatements: true
});

// Checking status of connection
con.connect((err) => {
    if (err){
        console.log("Connection failed !" + JSON.stringify(err, undefined, 2));
    }
    console.log("Connected ...");
});

// Endpoint to check particular number
app.get('/numbers/:id', (req, res) => {
    sql = "select * from products where number = ?;";
    con.query(sql, [req.params.id], (err, row, fields) => {
        if(err){
            console.log(err);
        }
        res.send(row);
    });
});

// Endpoint to register number in table
app.post('/numbers', (req, res) => {
    let number = req.body;
    // console.log('req is',req.body); //for debugging
    var sql = "Set @id = ?; Set @name = ?; Set @number = ?; Set @balance = ?; Call numberAddOrUpdate(@id, @name, @number, @balance);";
    con.query(sql, [number.id, number.name, number.number, number.balance], (err, rows, fields) => {
        if(err){
            console.log(err);
        }
        rows.forEach(element => {
            if(element.constructor == Array){
                res.send("New number registered: " + element[0].number);
            }
        });
    });
});

// Endpoint to recharge amount against phone number provided
app.put('/number', (req, res) => {
    let number = req.body;
    var sql = "Set @id = ?; Set @name = ?; Set @number = ?; Set @balance = ?; Call numberAddOrUpdate(@id, @name, @number, @balance);";
    con.query(sql, [number.id, number.name, number.number, number.balance], (err, rows, fields) => {
        if (err){
            console.log(err)
        }
        con.query("Select * from numbers Where number = ?", [number.number], (err1, row1, fields1) => {
            if (err1){
                console.log(err1);
            }
            res.send("Hello " + number.name + " your balance is now Rs." + number.balance);
        });
    });
});

// Starting session on port
app.listen(port, () => console.log(`Listening on port ${port} ...`));