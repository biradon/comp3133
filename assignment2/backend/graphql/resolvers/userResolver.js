const User = require('../../models/User')
const bcrypt = require('bcryptjs');


const userResolver = {
    Query: {
        login: async (_, {username, email, password}) => {
            try {
                if(!username && !email) {
                    throw new Error("Please provide either an email or an username")
                }
                const user = await User.findOne({
                    $or: [{email}, {username}]
                })
                if (!user) {
                    throw new Error("User not found")
                }
                console.log(user._id)
                const passwordMatched = await bcrypt.compare(password, user.password);
                if(!passwordMatched) {
                    throw new Error("Invalid password");
                }

                console.log('Login Sucessfully!')
                return user
            } 
            catch (error) 
            {
                throw new Error(error.message)
            }
        }
    },

    Mutation: {
        signup: async (_, {input}) => {
            try {
                const newUser = new User(input)
                newUser.created_at = new Date();
                newUser.updated_at = new Date();

                const hashedPassword = await bcrypt.hash(newUser.password, 10);
                newUser.password = hashedPassword
                await newUser.save()

                console.log("Singup successfully!")
                return newUser

            } 
            catch (error) {
                throw new Error(`Error while singup: ${error.message}`)
            }
        }
    }
}

module.exports = userResolver;