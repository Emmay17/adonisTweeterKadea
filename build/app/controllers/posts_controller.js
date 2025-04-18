import Poste from '#models/poste';
import Media from '#models/media';
import CloudinaryService from '#services/CloudinaryService';
export default class PostsController {
    async getPosts(ctx) {
        const user = ctx.auth.user;
        if (!user) {
            return ctx.response.redirect().toPath('/auth');
        }
        const postes = await Poste.query().preload('user', (query) => {
            query.select('id', 'firstname', 'lastname', 'avatar');
        }).preload('medias').orderBy('created_at', 'desc');
        console.log(JSON.stringify(postes, null, 2));
        return ctx.view.render('pages/dashboard', { postes });
    }
    async saveOnDatabase(ctx) {
        const data = ctx.request.all();
        try {
            const tweet = await Poste.create(data);
            const files = ctx.request.files('media', {
                extnames: ['jpg', 'png', 'jpeg'],
                size: '100mb',
            });
            for (const file of files) {
                if (!file.tmpPath)
                    continue;
                const result = await CloudinaryService.upload(file.tmpPath);
                const type = result.resource_type === 'video' ? 'video' : 'image';
                await Media.create({
                    poste_id: tweet.id_post,
                    url: result.secure_url,
                    type: type,
                });
            }
            return ctx.response.redirect().toPath('/dashboard');
        }
        catch (error) {
            console.error('Erreur de validation:', JSON.stringify(error, null, 2));
            const errors = error.formatted || error.messages || error;
            return ctx.response.internalServerError({
                message: error.message || "Erreur lors de l'enregistrement du tweet",
                errors,
            });
        }
    }
}
//# sourceMappingURL=posts_controller.js.map