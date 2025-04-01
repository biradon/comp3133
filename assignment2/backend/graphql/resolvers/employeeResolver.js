const Employee = require('../../models/Employee')

const employeeResolver = {
    Query: {
        getAllEmployees: async (_, args) => {
            try {
                const employees = await Employee.find()
                if(employees)
                {
                    return employees
                }
                else
                {
                    return []
                }
            } 
            catch (error) {
                throw new Error(`Error while search all employees: ${error.message}`)
            }
        },
        searchByDesignationOrDepartment: async (_, {designation, department}) => {
            try {
                const employees = await Employee.find({
                    $or: [{designation: designation}, {department: department}]
                })
                if(employees)
                {
                    return employees
                }
                else
                {
                    return []
                }
            } 
            catch (error) {
                throw new Error(`Error while searchByDesignationOrDepartment: ${error.message}`)
            }
        },
        searchById: async (_, {id}) => {
            try {
                const employee = await Employee.findOne({_id : id})
                console.log(employee)
                if(!employee)
                {
                    throw new Error(`Can't find employee with id: ${id}`)
                }
                else
                {
                    return employee
                }
            } 
            catch (error) {
                throw new Error(`Error while searchById: ${error.message}`)
            }
        },
    },


    Mutation: {
        addNewEmployee: async (_, {input}) => {
            try {
                const newEmployee = new Employee(input)
                newEmployee.date_of_joining = new Date()
                newEmployee.created_at = new Date()
                newEmployee.updated_at = new Date()

                await newEmployee.save()
                console.log("Add Employee successfully!")
                return newEmployee
            } 
            catch(error) {
                throw new Error(`Error while add new employee: ${error.message}`)
            }
        },

        updateEmployee: async (_, { input }) => {
            try {
                const existingEmployee = await Employee.findById(input.id);
                if (!existingEmployee) {
                    throw new Error(`Employee with ID ${input.id} not found`);
                }
                console.log(`Updating Employee ID: ${input.id}`)
                const updatedEmployee = await Employee.findByIdAndUpdate(
                    input.id, 
                    input, 
                    { new: true} 
                );
                console.log("Updated Successfully:", updatedEmployee);
                return updatedEmployee;
        
            } catch (error) {
                throw new Error(`Error while editing employee: ${error.message}`);
            }
        },

        deleteEmployee: async(_, {id}) => {
            try {
                const result = await Employee.findByIdAndDelete(id)
                if(result) {
                    console.log("Deleted successfully!")
                    return {
                        success: true,
                        message: `Employee with ID ${id} is deleted`
                    }
                }
                else
                {
                    console.log("Deleted Fail!")
                    return {
                        success: false,
                        message: `Can not find Employee with ID ${id}`
                    }
                } 
            }
            catch(error) {
                throw new Error(`Error while deleting employee: ${error.message}`)
            }
        }
    }
}




module.exports = employeeResolver;