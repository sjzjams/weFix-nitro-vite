import { defineHandler } from "nitro/h3";

export default defineHandler(async (event) => {
  const prisma = event.context.prisma;

  try {
    const tables = await prisma.$queryRaw`SHOW TABLES`;
    // @ts-ignore
    const tableNames = tables.map((table) => Object.values(table)[0]);
    return {
      code: 200,
      data: tableNames,
    };
  } catch (error) {
    event.context.logger.error('Failed to fetch tables:', error);
    return {
      code: 500,
      message: 'Failed to fetch tables',
    };
  }
});