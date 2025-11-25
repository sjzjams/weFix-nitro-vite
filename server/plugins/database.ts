// 数据库连接插件
import type { NitroApp } from 'nitropack'
import { PrismaClient } from '@prisma/client'
import type { H3Event } from 'nitro/h3'

// 扩展全局类型
declare global {
  var prisma: PrismaClient | undefined
}

// 创建Prisma客户端实例
const prisma = globalThis.prisma || global.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
  global.prisma = prisma
}

export default (nitroApp: NitroApp) => {
  // 在请求上下文中添加prisma实例
  nitroApp.hooks.hook('request', (event: H3Event) => {
    event.context.prisma = prisma
  })
  
  // 应用关闭时断开数据库连接
  nitroApp.hooks.hook('close', async () => {
    await prisma.$disconnect()
  })
}