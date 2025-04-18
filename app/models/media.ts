import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Poste from './poste.js'
import { DateTime } from 'luxon'

export default class Media extends BaseModel {
  public static table = 'medias'
  
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public poste_id: number

  @column()
  declare public url: string

  @column()
  declare public type: 'image' | 'video'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Poste, { foreignKey : 'poste_id'})
  public poste!: BelongsTo<typeof Poste>
}
