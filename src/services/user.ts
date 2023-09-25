import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";

const JWT_SECRET = 'jwt$sec@123';

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

class UserService {

    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = this.generateHash(salt, password);

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            },
        });
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } });
    }

    private static generateHash(salt: string, password: string) {
        return createHmac("sha256", salt).update(password).digest('hex');
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await this.getUserByEmail(email);

        if (!user) throw new Error("User not found");

        const userSalt = user.salt;
        const userHashedPassword = this.generateHash(userSalt, password);

        if (user.password !== userHashedPassword) throw new Error("Incorrect password");

        // Generate JWT token;
        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;
    }
}

export default UserService;