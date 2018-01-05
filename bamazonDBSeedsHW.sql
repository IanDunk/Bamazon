DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffe", "coffe_bar", 2.75, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tea", "coffe_bar", 2.60, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("salad", "salad_bar", 9.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("soup", "salad_bar", 11.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eggs", "dairy", 1.15, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("yogurt", "dairy", 0.60, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tomato", "produce", 1.35, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("banana", "produce", 0.15, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("stouffers", "frozen_foods", 4.90, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ice_cream", "frozen_foods", 6.25, 100);

SELECT * FROM products;