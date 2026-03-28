import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'

// 用户表
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// 账户表（用于OAuth）
export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
}, (table) => ({
  userIdIdx: index('idx_accounts_user_id').on(table.userId),
}))

// 会话表
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').unique().notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  userIdIdx: index('idx_sessions_user_id').on(table.userId),
}))

// 验证令牌表
export const verificationTokens = sqliteTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').unique().notNull(),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  identifierIdx: index('idx_verification_token_identifier').on(table.identifier),
}))

// 处理记录表
export const images = sqliteTable('images', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  originalUrl: text('original_url'),
  processedUrl: text('processed_url'),
  fileName: text('file_name'),
  fileSize: integer('file_size'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  userIdIdx: index('idx_images_user_id').on(table.userId),
  createdAtIdx: index('idx_images_created_at').on(table.createdAt),
}))

// 每日额度表
export const dailyUsage = sqliteTable('daily_usage', {
  userId: text('user_id').notNull(),
  date: text('date').notNull(),
  count: integer('count').default(0),
})

// 类型导出
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect
export type Image = typeof images.$inferSelect
export type DailyUsage = typeof dailyUsage.$inferSelect