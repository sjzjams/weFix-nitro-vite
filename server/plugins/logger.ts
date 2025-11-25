// 日志记录插件
import type { NitroApp } from 'nitropack'
import { createLogger, format, transports } from 'winston'
import type { H3Event } from 'nitro/h3'

const { combine, timestamp, printf, colorize, json } = format

// 自定义日志格式
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`
  if (Object.keys(metadata).length > 0) {
    msg += JSON.stringify(metadata)
  }
  return msg
})

// 创建logger实例
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    process.env.NODE_ENV === 'production' ? json() : combine(colorize(), logFormat)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ 
      filename: process.env.LOG_FILE || './logs/app.log',
      maxsize: 1024 * 1024 * 10, // 10MB
      maxFiles: 5,
      tailable: true
    })
  ]
})

// 扩展全局类型
declare global {
  var logger: ReturnType<typeof createLogger> | undefined
}

// 全局单例
const globalLogger = globalThis.logger || global.logger || logger

if (process.env.NODE_ENV !== 'production') {
  globalThis.logger = globalLogger
  global.logger = globalLogger
}

export default (nitroApp: NitroApp) => {
  // 在请求上下文中添加logger实例
  nitroApp.hooks.hook('request', (event: H3Event) => {
    event.context.logger = globalLogger
  })
  
  // 记录应用启动
  globalLogger.info('Application started')
  
  // 应用关闭时记录
  nitroApp.hooks.hook('close', async () => {
    globalLogger.info('Application shutting down')
  })
}