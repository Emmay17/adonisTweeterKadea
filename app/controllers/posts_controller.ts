// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
// import View from '@ioc:Adonis/Core/View'

export default class PostsController {
    private posts = [
        {
            id: 1,
            username: 'Emmanuel mayele',
            userArobase: "@MayeleEmmanuel",
            content: `President Joe Biden touted a new agreement reached with the European Union to ease Trump-era
                        tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the
                        US steel industry and combat the global climate crisis.`,
            comment: 12,
            partage: 24,
            likes: 12000,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },

        {
            id: 2,
            username: 'Gad Ntenta',
            userArobase: "@NtentaGad",
            content: `La belle vie de kinshasa en une image`,
            comment: 12,
            partage: 24,
            likes: 12000,
            image: '/public/profile_photo.jpeg',
        },

        
    ]

    public async getPosts({ view }: HttpContext) {
        return view.render('pages/dashboard', { posts: this.posts })
    }

}