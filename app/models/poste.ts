import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Poste extends BaseModel {
  @column({ isPrimary: true })
  declare id_post: number

  @column()
  declare id_user: number

  @column()
  declare content: string

  @column()
  declare image?: string

  @column()
  declare comments?: number

  @column()
  declare likes: number

  @column()
  declare partages: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}