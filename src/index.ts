import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
    const app = express();
    const port = Number(process.env.PORT) || 8000;
    app.use(express.json());

    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => "Hello Graphql Server",
                say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`
            }
        },
    });

    console.log('I am here..')

    await gqlServer.start();

    app.get("/", (req, res) => {
        return res.send({ message: "Server is up and running..." });
    });

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(port, () => console.log(`Server started at port:${port}`));
}

init();