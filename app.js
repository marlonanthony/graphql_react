const express = require('express') 
const bodyParser = require('body-parser') 
const graphqlHTTP = require('express-graphql') 
const mongoose = require('mongoose') 

const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index')

const app = express() 

app.use(bodyParser.json()) 

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true 
}))

mongoose
.connect(`mongodb+srv://marlon:marlon123456@cluster0-4ts0g.gcp.mongodb.net/graphql_react?retryWrites=true`)
.then(() => {
    app.listen(5000)
})
.catch(err => console.log(err)) 
