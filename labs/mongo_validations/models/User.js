const mongoose = require('mongoose');

const emailRegEx = /^\S+@\S+\.\S+$/
const cityRegEx = /^[a-zA-Z\s]+$/
const zipRegEx = /^\d{5}-\d{4}$/
const webRegEx = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
const phoneRegEx = /^1-\d{3}-\d{3}-\d{4}$/

//Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot be more than 50 chracters"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        minLenght: [4, "username cannot be at least 4 characters"],
        maxLength: [50, "username cannot be more than 50 characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"]
        maxLength: [50, "email cannot be more than 100 chracters"],
        lowercase: true,
        match: [emailRegEx, "Email format is invalid. Must be XXX@XXX.XXX"]
        trim: true
    },
    address: {
        street: {
            type: String,
            required: [true, "Street is required"],

        },
        suite: {
            type: String,
        },
        city: {
            type: String,
            required: [true, "City is required"],
            match: [cityRegEx, "City name can only have letter and spaces"]
        },
        zipcode: {
            type: String,
            required: [true, "Zipcode is required"],
            match: [zipRegEx, "Zipcode format is invalid. Must be 123-4567"]
        },
        geo: {
            lat: {
                type: String,
                required: [true, "Latitude is required"],
            },
            lng: {
                type: String,
                required: [true, "Longtitude is required"],
            }
        }
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        match: [phoneRegEx, "Phone number format is invalid"]
    },
    website: {
        type: String,
        required: [true, "Website is required"],
        match: [webRegEx, "Website format is invalid"]
    },
    company: {
        name: {
            type: String,
            required: [true, "Company is required"],
        },
        catchPhrase: {
            type: String,
            required: [true, "Catch Phrase is required"],
        },
        bs: {
            type: String,
            required: [true, "Company Business Slogan is required"],
        }
    },
    createdAt: { 
        type: Date,
    },
    updatedAt: { 
        type: Date,
    },
  });


UserSchema.pre('save', function(next) {

    console.log(`pre: ${JSON.stringfy(this)}`)
    console.log(`user email to save: ${this.email}`)


    User.find({email: this.email}, (err, document) => {
        console.log(`Trying to save user with email: ${this.email}`)

        if (err) {
            consol.log(`Can't find the document`)
        }

        if (document.length != 0) {
            console.log(`User already exist. Can't insert`)
            next(`User with email ${this.email} already exist. Can't insert`)
            return false
        } else {
            console.log("User DOESN'T exist. Creating new document")

            this.createdAt = Date.now()
            this.updatedAt = Date.now()
            next()
            return true
        }
    })
})

const User = mongoose.model("User", UserSchema);
module.exports = User;















