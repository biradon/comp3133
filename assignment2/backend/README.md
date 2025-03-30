# Employee Management System (GraphQL + Node.js + Express + Mongoose)

## 📌 Introduction
This project is a **GraphQL-based Employee Management System** built with **Node.js, Express, and Mongoose**. It provides user authentication (Sign Up & Sign In) and full CRUD operations for employees, including searching employees and users. The project follows GraphQL best practices, including validation and error handling.

---

## ⚡ Installation Guide
### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **MongoDB** (local or cloud instance like MongoDB Atlas)

### **2️⃣ Clone the Repository**
```sh
 git clone https://github.com/your-repo.git
 cd your-repo
```

### **3️⃣ Install Dependencies**
```sh
npm install
```

### **4️⃣ Set Up Environment Variables**
Create a `.env` file in the project root and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **5️⃣ Start the Server**
```sh
npm start
```
Server will be running at **http://localhost:8080/graphql** or **http://localhost:8081/graphql**

---

## 🚀 Features
### **Authentication**
- **Sign Up** - Register a new user.
- **Sign In** - Login and get a JWT token for authentication.

### **Employee Management**
- **Create Employee** - Add a new employee.
- **Read Employees** - Fetch all employees or search by criteria.
- **Update Employee** - Modify employee details.
- **Delete Employee** - Remove an employee.
- **Search Employee** - Filter by department or designation.

### **GraphQL Best Practices Implemented**
✅ **Schema Validation** - Ensure correct input structure.  
✅ **Error Handling** - Proper GraphQL error responses.  
✅ **Input Validation** - Enforce required fields and data types.  
✅ **Security** - JWT-based authentication.

---

## 🛠️ API Usage Examples
### **1️⃣ Sign Up Mutation**
```graphql
mutation {
  signUp(input: {
    username: "john_doe"
    email: "john@example.com"
    password: "securePass123"
  })
}
```

### **2️⃣ Add Employee Mutation**
```graphql
mutation {
  addNewEmployee(input: {
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@example.com",
    designation: "Software Engineer",
    department: "IT",
    salary: 80000
  })
}
```

### **3️⃣ Search Employee Query**
```graphql
query {
  searchByDesignationOrDepartment(designation: "Engineer", department: "IT") {
    id
    first_name
    designation
    department
  }
}
```

---




