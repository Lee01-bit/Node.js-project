This is a simple Node.js application that implements a REST API for managing products. It uses a JSON file as the data store and provides endpoints for CRUD operations: Create, Read, Update, and Delete.

Features
GET: Retrieve all products.
POST: Add a new product.
PUT: Update a product by its ID.
DELETE: Remove a product by its ID.
JSON file storage for simplicity.
Prerequisites
Node.js (version 14.x or later)
Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install Dependencies
This project does not require additional npm packages. It uses only core Node.js modules (fs and http).

3. Prepare the JSON File
Create a fileData.json file in the project root directory. It should start with an empty array:

json
Copy code
[]
4. Run the Server
Start the server with the following command:

bash
Copy code
node server.js
The server will run on http://localhost:3000/products.

API Endpoints
1. GET /products
Retrieves all products.
Response: JSON array of products.
Example Request:
bash
Copy code
curl http://localhost:3000/products
Example Response:
json
Copy code
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 10.99
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 24.99
  }
]
2. POST /products
Adds a new product.
Request Body: JSON object with the product details.
Response: JSON array of all products, including the new product.
Example Request:
bash
Copy code
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "New Product", "price": 15.99}'
Example Response:
json
Copy code
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 10.99
  },
  {
    "id": 2,
    "name": "New Product",
    "price": 15.99
  }
]
3. PUT /products/:id
Updates an existing product by ID.
Request Body: JSON object with the updated fields.
Response: JSON object of the updated product.
Example Request:
bash
Copy code
curl -X PUT http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{"price": 12.99}'
Example Response:
json
Copy code
{
  "id": 1,
  "name": "Product 1",
  "price": 12.99
}
4. DELETE /products/:id
Deletes a product by ID.
Response: 204 No Content if successful.
Example Request:
bash
Copy code
curl -X DELETE http://localhost:3000/products/1
Project Structure
bash
Copy code
.
├── fileData.json         # JSON file for data storage
├── server.js             # Main application logic
└── README.md             # Project documentation
Additional Notes
This is a basic implementation suitable for learning purposes. For production-grade applications, consider using a proper database like MongoDB, PostgreSQL, etc.
Error handling for invalid input or edge cases can be expanded.
License
This project is open-source and available under the MIT License.
