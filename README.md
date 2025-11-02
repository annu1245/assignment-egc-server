## 🧾 **Expense Tracker Backend (Node.js + Express + MongoDB + Mongoose)**

This is the backend server for the **Expense Tracker** application — a RESTful API built using **Express.js**, **Mongoose**, and **Validator.js**.
It handles transactions (income and expense), categories, validations, and database seeding for demo data.

---

### 🚀 **Tech Stack**

| Category           | Technology                                                  |
| ------------------ | ----------------------------------------------------------- |
| Framework          | [Express.js](https://expressjs.com/)                        |
| Database           | [MongoDB](https://www.mongodb.com/)                         |
| ORM                | [Mongoose](https://mongoosejs.com/)                         |
| Validation         | [Validator.js](https://github.com/validatorjs/validator.js) |

---

### 📂 **Folder Structure**

```
expense-tracker-server/
│
├── index.js                        # Server entry point
│
└── src/
    ├── controllers/
    │   └── transaction.js          # Controller logic for CRUD and category routes
    │
    ├── database/
    │   ├── connection.js           # Mongoose connection handler
    │   ├── seeder.js               # Seeder runner
    │   └── transactionSeeder.js    # Logic for generating random transactions
    │
    ├── middleware/
    │   ├── errorHandler.js         # Centralized error handling middleware
    │   └── responseHandler.js      # Custom success response middleware
    │
    ├── model/
    │   ├── categories.js           # Enum for valid categories
    │   ├── transactions.js         # Transaction schema model
    │   └── types.js                # Enum for transaction types (income/expense)
    │
    ├── routes/
    │   └── transaction.js          # All API routes for transactions
    │
    └── utils/
        ├── ApiError.js             # Custom error class for structured exceptions
        └── validator.js            # Validation functions for requests
```

---

### ⚙️ **Setup & Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/assignment-egc-server.git
   cd assignment-egc-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file in the project root:

   ```bash
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

5. **Server will start on**

   ```
   http://localhost:3000
   ```

---

### 🌱 **Database Seeding**

To populate the database with 50 random transaction records for testing:

```bash
npm run seed
```

This runs the seeder script:

* Connects to MongoDB
* Inserts 50 random **income/expense** records with realistic values
* Disconnects automatically after completion

---

### 🧩 **API Endpoints**

Base URL → `/api/transactions`

| Method     | Endpoint      | Description                             |
| ---------- | ------------- | --------------------------------------- |
| **GET**    | `/`           | Get all transactions (supports filters) |
| **GET**    | `/:id`        | Get single transaction by ID            |
| **POST**   | `/`           | Create new transaction                  |
| **PATCH**  | `/:id`        | Update existing transaction             |
| **DELETE** | `/:id`        | Delete transaction                      |
| **GET**    | `/categories` | Get all available categories            |

---

### 🔍 **Filtering Parameters**

You can pass optional query parameters in the **GET /api/transactions** endpoint:

| Query Param | Type   | Example              | Description                |
| ----------- | ------ | -------------------- | -------------------------- |
| `type`      | String | `income` / `expense` | Filter by transaction type |
| `category`  | String | `food`, `salary`     | Filter by category         |
| `startDate` | Date   | `2025-01-01`         | Filter start date          |
| `endDate`   | Date   | `2025-12-31`         | Filter end date            |

**Example:**

```
GET /api/transactions?type=expense&category=food&startDate=2025-01-01&endDate=2025-10-31
```

---

### ✅ **Validation Rules**

Validation is done using **Validator.js** in `src/utils/validator.js`.

#### Create Transaction Validation

| Field         | Type   | Validation                                    |
| ------------- | ------ | --------------------------------------------- |
| `type`        | String | Required, must be `income` or `expense`       |
| `amount`      | Number | Required, must be numeric                     |
| `description` | String | Required, 2–200 characters                    |
| `category`    | String | Required, must be in category list            |
| `date`        | Date   | Required, must be valid and not in the future |

Errors are returned in this format:

```json
{
  "message": "Validation failed",
  "errors": {
    "amount": "Amount must be a valid number"
  }
}
```

---

### ⚙️ **Middlewares**

| File                 | Description                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `responseHandler.js` | Adds a helper method `res.success(statusCode, message, data)` for standardized success responses |
| `errorHandler.js`    | Global error handler that returns a consistent JSON structure for all thrown errors              |

**Example success response:**

```json
{
  "message": "Transaction created",
  "data": {
    "_id": "652a1...",
    "type": "income",
    "amount": 5000,
    "category": "salary",
    "date": "2025-10-20T00:00:00Z"
  }
}
```

---

### 🧠 **Controller Overview**

All business logic is inside `src/controllers/transaction.js`.

| Function             | Description                                  |
| -------------------- | -------------------------------------------- |
| `getTransations`     | Fetch transactions (with optional filters)   |
| `getTransactionById` | Fetch a transaction by its MongoDB ID        |
| `createTransaction`  | Validate and create a new record             |
| `updateTransaction`  | Validate and update a record                 |
| `deleteTransaction`  | Delete a record by ID                        |
| `getCategories`      | Return static list of transaction categories |

---

### 🪄 **Seeder Logic Overview**

The seeder generates realistic transaction data:

* Random `amount` values scaled by category
* Random `date` within the last 12 months
* Alternates between `income` and `expense`
* Dynamic `description` generation

---

### 🧰 **API Error Handling Example**

Custom errors are thrown using `ApiError`:

```js
throw new ApiError(400, "Validation failed", { amount: "Amount is required" });
```

This will automatically be caught and formatted by `errorHandler.js`.

---
