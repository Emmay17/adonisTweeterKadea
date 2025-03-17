import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare idpermission: number

  @column()
  declare labelle : string

  @column()
  declare description : string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}