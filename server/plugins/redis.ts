// Redis连接插件
import type { NitroApp } from 'nitropack'
import { createClient, type RedisClientType } from 'redis'
import type { H3Event } from 'nitro/h3'

// 扩展全局类型
declare global {
  var redis: RedisClientType | undefined
}

// 创建Redis客户端实例
const redis = globalThis.redis || global.redis || createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
  },
  password: process.env.REDIS_PASSWORD || '',
  database: parseInt(process.env.REDIS_DB || '0')
})

// 连接Redis
redis.connect().catch(console.error)

if (process.env.NODE_ENV !== 'production') {
  globalThis.redis = redis
  global.redis = redis
}

export default (nitroApp: NitroApp) => {
  // 在请求上下文中添加redis实例
  nitroApp.hooks.hook('request', (event: H3Event) => {
    event.context.redis = redis
  })
  
  // 应用关闭时断开Redis连接
  nitroApp.hooks.hook('close', async () => {
    await redis.quit()
  })
}