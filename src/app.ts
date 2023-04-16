import { connect } from './db';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { getAuthInfo } from './middlewares/auth';

connect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    return {
      code: error.extensions.code,
      message: error.message,
    };
  },
});
(async () => {
  await startStandaloneServer(server, {
    // context: async ({ req }) => ({ user: req.headers.authorization }),
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      return { authInfo: getAuthInfo(token.replace('Bearer ', '')) };
    },
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at http://localhost:3000${url}`);
  });
})();

export {};
