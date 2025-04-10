import { posts, Users } from '../../public/data.js';
import Poste from '#models/poste';
import { addpost } from '#validators/poste';
export default class PostsController {
    async getPosts({ view }) {
        const postes = posts.map((post) => {
            const user = Users.find((u) => u.id === post.id_user);
            return { ...post, user };
        });
        return view.render('pages/dashboard', { postes, user: Users[0] });
    }
    async savePost({ request, response }) {
        const data = request.all();
        if (!data.id_user || !data.content) {
            return response.status(400).json({ error: 'Données manquantes' });
        }
        console.log('Données envoyées :', data);
        const newPost = {
            id_user: data.id_user,
            id_post: data.id_post ?? posts.length + 1,
            content: data.content,
            comment: 0,
            partage: 0,
            likes: 0,
            image: data.image ?? '',
        };
        posts.unshift(newPost);
        return response.redirect().toPath('/dashboard?');
    }
    async savePostDB({ request, response }) {
        const data = request.all();
        if (!data.id_user || !data.content) {
            return response.status(400).json({ error: 'Données manquantes' });
        }
        console.log('Données envoyées :', data);
        const newPost = {
            id_user: data.id_user,
            id_post: data.id_post ?? posts.length + 1,
            content: data.content,
            comment: 0,
            partage: 0,
            likes: 0,
            image: data.image ?? '',
        };
        posts.unshift(newPost);
        return response.redirect().toPath('/dashboard?');
    }
    async savelike({ request, response }) {
        const id = request.param('id');
        const { increment } = request.body();
        try {
            const post = posts.find((post) => post.id_post === Number(id));
            if (!post) {
                return response.status(404).json({ error: 'Post non trouvé' });
            }
            if (increment) {
                post.likes += 1;
            }
            else {
                post.likes -= 1;
            }
            return response.status(200).json({ message: 'Like mis à jour' });
        }
        catch (error) {
            return response.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
    async saveOnDatabase({ request, response }) {
        try {
            const data = request.only(['id_user', 'content', 'image']);
            const validateData = await addpost.validate(data);
            if (!validateData.id_user || !validateData.content.trim()) {
                return response.badRequest({ error: 'Données manquantes' });
            }
            const newPost = await Poste.create(validateData);
            return response.created({
                message: 'Post créé avec succès',
                post: newPost,
            });
        }
        catch (error) {
            console.error('Erreur lors de la création du post :', error);
            return response.internalServerError({ error: 'Erreur serveur' });
        }
    }
}
//# sourceMappingURL=posts_controller.js.map