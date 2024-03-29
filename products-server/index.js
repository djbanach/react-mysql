/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS = 'SELECT * FROM products';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOURPASSWORD',
  database: 'node_mysql'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());

// home page
app.get('/', (req, res) => {
  res.send('go to /products')
});

// get all of the products in the database
app.get('/products', (req, res) => {
  connection.query(SELECT_ALL_PRODUCTS, (err, results) => {
    if(err) {
      return res.send(err)
    }
    return res.json({
      data: results
    })
  });
});

// add a product to the database
app.get('/products/add', (req, res) => {
  const { name, price, amount } = req.query;
  const INSERT_PRODUCTS = `INSERT INTO products (name, price, amount) VALUES('${name}', ${price}, ${amount})`;
  connection.query(INSERT_PRODUCTS, (err, results) => {
    if(err) {
      return res.send(err)
    }
    return res.send('successfully added product to db')
  });
});

// delete a product from the database
app.delete('/products/:id', (req, res) => {;
  const DELETE_PRODUCT = `DELETE FROM products WHERE product_id = ?`;
  connection.query(DELETE_PRODUCT,[req.params.id], (err, result) => {
    if(err) {
      return res.send(err)
    }
    return res.send('successfully deleted product')
  });
});

app.listen(4000, () => {
  console.log(`Products server listening on port 4000`)
});
