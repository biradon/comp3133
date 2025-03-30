const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    designation: {
        type: String,
        required: [true, 'designation is required'],
    },
    salary: {
        type: Number,
        required: [true, 'salary is required'],
        validate: {
            validator: function(value) {
                return value >= 1000
            },
            message: props => `Salary ${props.value} must greater or equal than 1000`
        }
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: [true, 'department is required'],
    },
    employee_photo: {
        type: String,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },

});

employeeSchema.pre("save", async function (next) {
    try {
        console.log(`pre: ${JSON.stringify(this)}`);
        console.log(`Trying to save employee with email: ${this.email}`);

        // Skip the check if the document is being updated
        if (!this.isNew) {
            console.log("Update detected. Skipping duplicate email check.");
            this.updated_at = new Date()
            return next();
        }

        // Find user by email
        const existingUser = await this.constructor.findOne({ email: this.email });

        if (existingUser) {
            console.log(`Employee already exists. Can't insert.`);
            return next(new Error(`employee with email ${this.email} already exists. Can't insert.`));
        }

        console.log("✅ employee DOESN'T exist. Creating new document.");

        this.created_at = new Date();
        this.updated_at = new Date();
        next();
    } catch (error) {
        next(error);
    }
});

const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;