import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

const PORT = 8080;
const graphqlEndpoint = '/graphql';
const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));
app.use(
  '/graphiql',
  bodyParser.json(),
  graphiqlExpress({ endpointURL: graphqlEndpoint }),
);

app.listen(PORT);
