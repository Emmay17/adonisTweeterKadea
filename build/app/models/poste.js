var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import User from './user.js';
import Media from './media.js';
export default class Poste extends BaseModel {
    user;
    medias;
    replies;
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Poste.prototype, "id_post", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Poste.prototype, "id_user", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Poste.prototype, "content", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Poste.prototype, "comments", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Poste.prototype, "likes", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Poste.prototype, "partages", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Poste.prototype, "created_at", void 0);
__decorate([
    belongsTo(() => User, {
        foreignKey: 'id_user'
    }),
    __metadata("design:type", Object)
], Poste.prototype, "user", void 0);
__decorate([
    hasMany(() => Media, { foreignKey: 'poste_id' }),
    __metadata("design:type", Object)
], Poste.prototype, "medias", void 0);
__decorate([
    hasMany(() => Poste, {
        foreignKey: 'parent',
    }),
    __metadata("design:type", Object)
], Poste.prototype, "replies", void 0);
//# sourceMappingURL=poste.js.map