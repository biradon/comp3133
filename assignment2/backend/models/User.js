const mongoose = require('mongoose');

const emailRegEx = /^\S+@\S+\.\S+$/

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minLength: [4, "username cannot be at least 4 characters"],
        maxLength: [50, "username cannot be more than 50 characters"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [emailRegEx, "Email format is invalid. Must be XXX@XXX.XXX"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },

});

userSchema.pre("save", async function (next) {
    try {
        console.log(`pre: ${JSON.stringify(this)}`);
        console.log(`Trying to save user with email: ${this.email}`);

        // ✅ Use `this.constructor.findOne()` to access the model correctly
        const existingUser = await this.constructor.findOne({ email: this.email });

        if (existingUser) {
            console.log(`❌ User already exists. Can't insert.`);
            return next(new Error(`User with email ${this.email} already exists. Can't insert.`));
        }

        console.log("✅ User DOESN'T exist. Creating new document.");

        this.created_at = new Date();
        this.updated_at = new Date();
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;