import { defineHandler } from "nitro/h3";
import { Prisma } from "@prisma/client";

export default defineHandler(async (event) => {
  const prisma = event.context.prisma;
  const tableName = event.context.params.table;

  if (!tableName) {
    return {
      code: 400,
      message: 'Table name is required',
    };
  }

  try {
    // 1. Validate table name to prevent SQL injection
    const tablesResult: { [key: string]: string }[] = await prisma.$queryRaw`SHOW TABLES`;
    const allowedTables = tablesResult.map(t => Object.values(t)[0]);
    if (!allowedTables.includes(tableName)) {
        return {
            code: 400,
            message: 'Invalid table name provided',
        };
    }

    // 2. Build a safe query
    const query = Prisma.sql`DESCRIBE \`${Prisma.raw(tableName)}\``;
    const structure = await prisma.$queryRaw(query);

    return {
      code: 200,
      data: structure,
    };
  } catch (error) {
    event.context.logger.error(`Failed to fetch structure for table ${tableName}:`, error);
    return {
      code: 500,
      message: `Failed to fetch structure for table ${tableName}`,
    };
  }
});