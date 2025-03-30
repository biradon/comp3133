const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

const userTypeDefs = require('./schemas/userSchema')
const employeeTypeDefs = require('./schemas/employeeSchema')

const userResolver = require('./resolvers/userResolver')
const employeeResolver = require('./resolvers/employeeResolver')

const typeDefs = mergeTypeDefs([userTypeDefs, employeeTypeDefs])
const resolvers = mergeResolvers([userResolver, employeeResolver])

module.exports = {typeDefs, resolvers}
