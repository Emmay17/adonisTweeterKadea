import type { HttpContext } from '@adonisjs/core/http'
import {posts, Users} from "../../public/data.js"

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
}
interface Post {
    id_user: number;
    id_post: number;
    content: string;
    comment: number;
    partage: number;
    likes: number;
    image: string;
}


export default class PostsController {
    // Méthode pour récupérer les posts et les afficher
    public async getPosts({ view }: HttpContext) {
        const postes = posts.map((post: any) => {
            const user = Users.find((u: any) => u.id === post.id_user)
            return { ...post,user}
        })
        return view.render('pages/dashboard', { postes , user: Users[0]})
    }

    public async savePost({request,response}:HttpContext){
        const data = request.all() as Partial<Post>;

        if (!data.id_user || !data.content) {
            return response.status(400).json({ error: "Données manquantes" })
        };

        console.log("Données envoyées :", data);

        const newPost: Post = {
            id_user : data.id_user,
            id_post : data.id_post ?? (posts.length + 1),
            content : data.content,
            comment : 0,
            partage : 0,
            likes : 0,
            image : data.image ?? ""
        };

        posts.unshift(newPost);

        return response.redirect().toRoute('/dashboard')
    }
}
