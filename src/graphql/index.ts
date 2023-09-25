
import { ApolloServer } from "@apollo/server";
import { prismaClient } from '../lib/db';

import { User } from './user';

async function createGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            ${User.queries}
        }
        type Mutation {
            ${User.mutations}
        }`,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        },
    });

    await gqlServer.start();

    return gqlServer;
}

export default createGraphqlServer;
