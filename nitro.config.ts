import { defineConfig } from "nitro";

export default defineConfig({
  serverDir: "./server",
  runtimeConfig: {
    database: {
      url: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/repair_system',
      poolSize: 10
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || '',
      db: parseInt(process.env.REDIS_DB || '0')
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    },
    wechat: {
      appId: process.env.WECHAT_APP_ID || 'your-app-id',
      appSecret: process.env.WECHAT_APP_SECRET || 'your-app-secret',
      mchId: process.env.WECHAT_MCH_ID || 'your-mch-id',
      mchKey: process.env.WECHAT_MCH_KEY || 'your-mch-key'
    },
    tencentMap: {
      key: process.env.TENCENT_MAP_KEY || 'your-tencent-map-key'
    },
    upload: {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      uploadDir: './uploads'
    },
    log: {
      level: process.env.LOG_LEVEL || 'info',
      file: process.env.LOG_FILE || './logs/app.log'
    }
  },
  plugins: [
    './server/plugins/database',
    './server/plugins/redis',
    './server/plugins/logger',
  ],
});
