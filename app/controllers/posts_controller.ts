import type { HttpContext } from '@adonisjs/core/http'
import { posts, Users } from '../../public/data.js'
import Poste from '#models/poste'
import { addpost } from '#validators/poste'


interface Post {
  id_user: number
  id_post: number
  content: string
  comment: number
  partage: number
  likes: number
  image: string
}

export default class PostsController {
  // Méthode pour récupérer les posts et les afficher
  public async getPosts({ view }: HttpContext) {
    const postes = posts.map((post: any) => {
      const user = Users.find((u: any) => u.id === post.id_user)
      return { ...post, user }
    })
    return view.render('pages/dashboard', { postes, user: Users[0] })
  }
  // public async getPostsProfile({ view }: HttpContext) {
  //     const postes = posts.filter((post: any) => {
  //         const user = Users.find((u: any) => u.id === post.id_user)
  //         return { ...post,user}
  //     })
  //     return view.render('pages/dashboard', { postes , user: Users[0]})
  // }
  public async savePost({ request, response }: HttpContext) {
    const data = request.all() as Partial<Post>

    if (!data.id_user || !data.content) {
      return response.status(400).json({ error: 'Données manquantes' })
    }

    console.log('Données envoyées :', data)

    const newPost: Post = {
      id_user: data.id_user,
      id_post: data.id_post ?? posts.length + 1,
      content: data.content,
      comment: 0,
      partage: 0,
      likes: 0,
      image: data.image ?? '',
    }

    posts.unshift(newPost)

    return response.redirect().toPath('/dashboard?')
  }

  public async savePostDB({ request, response }: HttpContext) {
    const data = request.all() as Partial<Post>

    if (!data.id_user || !data.content) {
      return response.status(400).json({ error: 'Données manquantes' })
    }

    console.log('Données envoyées :', data)

    const newPost: Post = {
      id_user: data.id_user,
      id_post: data.id_post ?? posts.length + 1,
      content: data.content,
      comment: 0,
      partage: 0,
      likes: 0,
      image: data.image ?? '',
    }

    posts.unshift(newPost)

    return response.redirect().toPath('/dashboard?')
  }

  public async savelike({ request, response }: HttpContext) {
    const id = request.param('id')
    
    const {increment} = request.body()

    try {
        const post = posts.find((post: Post) => post.id_post === Number(id))
        if (!post) {
        return response.status(404).json({ error: 'Post non trouvé' })
        }

        if (increment) {
            post.likes += 1
        } else {
            post.likes -= 1
        }

        // await post.save()
        return response.status(200).json({ message: 'Like mis à jour' })

    } catch (error) {
        return response.status(500).json({ error: 'Erreur interne du serveur' })
    }
  }

  public async saveOnDatabase({ request, response }: HttpContext) {
    try {
      // Récupérer les données validées
      const data = request.only(['id_user', 'content', 'image'])
      const validateData = await addpost.validate(data)

      // Vérifier que les champs obligatoires sont présents
      if (!validateData.id_user || !validateData.content.trim()) {
        return response.badRequest({ error: 'Données manquantes' })
      }

      // Création du post en base de données
      const newPost = await Poste.create(validateData)

      return response.created({
        message: 'Post créé avec succès',
        post: newPost,
      })
    } catch (error) {
      console.error('Erreur lors de la création du post :', error)
      return response.internalServerError({ error: 'Erreur serveur' })
    }
  }
}
