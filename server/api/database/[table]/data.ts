import { defineHandler, getQuery } from "nitro/h3";
import { Prisma } from "@prisma/client";

export default defineHandler(async (event) => {
  const prisma = event.context.prisma;
  const tableName = event.context.params.table;
  const query = getQuery(event);

  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const search = query.search as string;

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

    const offset = (page - 1) * limit;

    // 2. Get column names for the search query
    const columnsResult: { Field: string }[] = await prisma.$queryRaw`SHOW COLUMNS FROM ${Prisma.raw(tableName)}`;
    const columns = columnsResult.map((col) => col.Field);

    // 3. Build a safe WHERE clause
    let whereClause = Prisma.empty;
    if (search && columns.length > 0) {
      const searchQuery = `%${search}%`;
      const conditions = columns.map(col => Prisma.sql`\`${Prisma.raw(col)}\` LIKE ${searchQuery}`);
      whereClause = Prisma.sql`WHERE ${Prisma.join(conditions, " OR ")}`;
    }

    // 4. Build safe data and count queries
    const tableIdentifier = Prisma.raw(`\`${tableName}\``);
    const dataQuery = Prisma.sql`SELECT * FROM ${tableIdentifier} ${whereClause} LIMIT ${limit} OFFSET ${offset}`;
    const countQuery = Prisma.sql`SELECT COUNT(*) as count FROM ${tableIdentifier} ${whereClause}`;

    const data = await prisma.$queryRaw(dataQuery);
    const countResult: { count: bigint }[] = await prisma.$queryRaw(countQuery);

    const total = Number(countResult[0].count);

    return {
      code: 200,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    event.context.logger.error(`Failed to fetch data for table ${tableName}:`, error);
    return {
      code: 500,
      message: `Failed to fetch data for table ${tableName}`,
    };
  }
});