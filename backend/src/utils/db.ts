import { PrismaClient } from "@prisma/client";

const dbWorker = new PrismaClient();

export default dbWorker;
