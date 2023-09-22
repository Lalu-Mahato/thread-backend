
import { ApolloServer } from "@apollo/server";
import { prismaClient } from '../lib/db';

import { User } from './user';

async function createGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
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

    // const gqlServer = new ApolloServer({
    //     typeDefs: `
    //         type Query {
    //             hello: String
    //             say(name: String): String
    //         }
    //         type Mutation {
    //             createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean

    //         }
    //     `,
    //     resolvers: {
    //         Query: {
    //             hello: () => "Hello Graphql Server",
    //             say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`
    //         },
    //         Mutation: {
    //             createUser: async (_, { firstName, lastName, email, password }:
    //                 { firstName: string; lastName: string; email: string; password: string; }) => {
    //                 await prismaClient.user.create({
    //                     data: {
    //                         firstName,
    //                         lastName,
    //                         email,
    //                         password,
    //                         // profileImageUrl: "",
    //                         salt: "random_salt",
    //                     }
    //                 })
    //                 return true;
    //             },
    //         }
    //     },
    // });
    // await gqlServer.start();
    return gqlServer;
}

export default createGraphqlServer;
