const { gql } = require("apollo-server-express")


const employeeTypeDefs = gql`
    scalar DateTime

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: genderType!
        designation: String!
        salary: Float!
        date_of_joining: DateTime!
        department: String!
        employee_photo: String
        created_at: DateTime!
        updated_at: DateTime!
    }

    enum genderType {
        Male
        Female
        Other
    }

    input EmployeeInput {
        id: ID
        first_name: String
        last_name: String
        email: String
        gender: genderType
        designation: String
        salary: Float
        department: String
        employee_photo: String
    }

    type Query {
        getAllEmployees:[Employee]
        searchByDesignationOrDepartment(designation: String, department: String): [Employee]
        searchById(id: ID): Employee
    }

    type MutationResponse {
        success: Boolean!
        message: String!
    }

    type Mutation {
        addNewEmployee(input: EmployeeInput): Employee
        updateEmployee(input: EmployeeInput): Employee
        deleteEmployee(id: ID!): MutationResponse
    }
`

module.exports = employeeTypeDefs