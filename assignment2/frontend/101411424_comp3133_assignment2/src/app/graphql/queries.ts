import { gql } from '@apollo/client/core';

export const GetAllEmployees = gql`
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