import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";
import createGraphqlServer from "./graphql";

async function init() {
    const app = express();
    const port = Number(process.env.PORT) || 8000;
    app.use(express.json());

    app.get("/", (req, res) => {
        return res.send({ message: "Server is up and running..." });
    });

    const gqlServer = await createGraphqlServer();

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(port, () => console.log(`Server started at port:${port}`));
}

init();