import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Media from './media.js'

export default class Poste extends BaseModel {
  @column({ isPrimary: true })
  declare id_post: number

  @column()
  declare id_user: number

  @column()
  declare content: string

  @column()
  declare comments?: number

  @column()
  declare likes: number

  @column()
  declare partages: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @belongsTo(() => User, {
    foreignKey: 'id_user'  // ← dis à Adonis d’utiliser ta colonne personnalisée
  })
  public user!: BelongsTo<typeof User>

  @hasMany(() => Media, {foreignKey: 'poste_id'})
  public medias!: HasMany<typeof Media>

  @hasMany(() => Poste, {
    foreignKey: 'parent', // Définition de la relation récursive (réponse aux posts)
  })
  public replies!: HasMany<typeof Poste>
}