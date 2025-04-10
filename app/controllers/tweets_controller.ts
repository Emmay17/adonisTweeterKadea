import Poste from '#models/poste'
import type { HttpContext } from '@adonisjs/core/http'

export default class TweetsController {

    async allTweets({ response }: HttpContext) {
        try {
            const tweets = await Poste.all()
            if (!tweets) {
                throw new Error('Aucun Tweet dans la base de données')
            }
            return response.json(tweets)
        } catch (error) {
            throw new Error('Erreur lors de la récupération des tweets :' + error)
        }
    }

    
}