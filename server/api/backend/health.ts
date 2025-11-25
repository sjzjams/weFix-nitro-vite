import { defineHandler } from "nitro/h3"

export default defineHandler(async (event) => {
  logger.info('处理请求', { url: event.path })
  const startTime = Date.now()
  
  // 检查数据库连接状态
  let dbStatus = 'unknown'
  try {
    // 从全局获取prisma实例
    // @ts-ignore
    const prisma = globalThis.prisma || global.prisma
    if (prisma) {
      await prisma.$queryRaw`SELECT 1`
      dbStatus = 'connected'
    } else {
      dbStatus = 'not_configured'
    }
  } catch (error) {
    dbStatus = 'disconnected'
    console.error('数据库连接检查失败:', error)
  }
  
  // 检查Redis连接状态
  let redisStatus = 'unknown'
  try {
    // 从全局获取redis实例
    // @ts-ignore
    const redis = globalThis.redis || global.redis
    if (redis) {
      await redis.ping()
      redisStatus = 'connected'
    } else {
      redisStatus = 'not_configured'
    }
  } catch (error) {
    redisStatus = 'disconnected'
    console.error('Redis连接检查失败:', error)
  }
  
  const responseTime = Date.now() - startTime
  
  return {
    code: 200,
    message: '服务健康检查',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    responseTime: `${responseTime}ms`,
    services: {
      database: dbStatus,
      redis: redisStatus,
      api: 'running'
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  }
  //   return {
  //   code: 200,
  //   message: '服务健康检查',
  //   timestamp: new Date().toISOString(),
  //   uptime: process.uptime(),
  //   services: {
  //     database: 'unknown',
  //     redis: 'unknown', 
  //     api: 'running'
  //   },
  //   memory: {
  //     used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
  //     total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
  //     unit: 'MB'
  //   }
  // }
});