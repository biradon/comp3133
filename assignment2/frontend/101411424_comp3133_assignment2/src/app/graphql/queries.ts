import { gql } from '@apollo/client/core';

const GetAllEmployees = gql`
    query GetAllEmployees {
        getAllEmployees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
        }
    }
`;

const AddEmployee = gql`
    mutation AddNewEmployee($input: EmployeeInput) {
        addNewEmployee(input: $input) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
        }
    }
`

const UpdateEmployee = gql`
    mutation UpdateEmployee($input: EmployeeInput) {
        updateEmployee(input: $input) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
        }
    }
`

const DeleteEmployee = gql`
    mutation DeleteEmployee($deleteEmployeeId: ID!) {
        deleteEmployee(id: $deleteEmployeeId) {
            success
            message
        }
    }
`

const SearchEmployeeByID = gql`
    query SearchById($searchByIdId: ID) {
        searchById(id: $searchByIdId) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
        }
    }
`

const SearchEmployeeByDepartment = gql`
    query SearchByDesignationOrDepartment($department: String, $designation: String) {
        searchByDesignationOrDepartment(department: $department, designation: $designation) {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
            created_at
            updated_at
        }
    }
`

const SignUp = gql`
    mutation Signup($input: UserInput!) {
        signup(input: $input) {
            id
            username
            email
            password
            created_at
            updated_at
        }
    }
`

const SignIn = gql`
    query Login($email: String, $username: String, $password: String) {
        login(email: $email, username: $username, password: $password) {
            id
            username
            email
            password
            created_at
            updated_at
        }
    }
`







export {GetAllEmployees, AddEmployee, DeleteEmployee, UpdateEmployee, SearchEmployeeByID, SearchEmployeeByDepartment, SignIn, SignUp}
