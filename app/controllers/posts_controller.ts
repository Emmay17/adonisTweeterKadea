import { HttpContext } from '@adonisjs/core/http'
import Poste from '#models/poste'
import Media from '#models/media'
import CloudinaryService from '#services/CloudinaryService'

export default class PostsController {

  // Méthode pour récupérer les posts et les afficher
  public async getPosts(ctx: HttpContext) {
    // Vérifier si l'utilisateur est connecté
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.redirect().toPath('/auth')  // Si pas connecté, rediriger vers la page de connexion
    }

    // Récupérer tous les posts et les précharger avec les informations de l'utilisateur
    const postes = await Poste.query().preload('user', (query) => {
      query.select('id','firstname', 'lastname', 'avatar')
    }).preload('medias').orderBy('created_at', 'desc')
    console.log(JSON.stringify(postes, null, 2));
    // Passer les posts et les données de l'utilisateur à la vue
    return ctx.view.render('pages/dashboard', {postes})
  }

  // Autres méthodes pour gérer l'ajout de posts et la création de tweets...

  public async saveOnDatabase(ctx: HttpContext) {
    const data = ctx.request.all()

    try {
      // Étape 1 : Création du tweet
      const tweet = await Poste.create(data)

      // Étape 2 : Récupération des fichiers médias
      const files = ctx.request.files('media', {
        extnames: ['jpg', 'png', 'jpeg'],
        size: '100mb',
      })

      // Étape 3 : Envoi et enregistrement des médias
      for (const file of files) {
        if (!file.tmpPath) continue
        const result = await CloudinaryService.upload(file.tmpPath)

        const type = result.resource_type === 'video' ? 'video' : 'image'

        await Media.create({
          poste_id: tweet.id_post,
          url: result.secure_url,
          type: type,
        })
      }
      return ctx.response.redirect().toPath('/dashboard')
    } catch (error) {
      console.error('Erreur de validation:', JSON.stringify(error, null, 2))
      const errors = error.formatted || error.messages || error

      return ctx.response.internalServerError({
        message: error.message || "Erreur lors de l'enregistrement du tweet",
        errors,
      })
    }
  }
}
