const { defineConfig } = require('drizzle-kit');

import 'dotenv/config';

export default defineConfig({
  schema: './src/models/*.js', // 告诉它你的表结构写在哪里
  out: './drizzle',            // 告诉它生成的迁移文件放哪里
  dialect: 'postgresql',       // 使用 PostgreSQL 协议
  dbCredentials: {
    url: process.env.DATABASE_URL, // 从环境变量读取 Neon 连接地址
  },
});