import { PrismaClient } from "@prisma/client";

const prismClientSingleton = () => {
    return new PrismaClient();
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismClientSingleton()
export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;