import { defineHandler } from "nitro/h3";
// server/api/time.ts
export default defineHandler(event => {
  /**
   * @returns 返回包含当前服务器时间的ISO格式字符串的对象
   */
  return {
    serverTime: new Date().toISOString()
  };
});