import Poste from '#models/poste';
export default class TweetsController {
    async allTweets({ response }) {
        try {
            const tweets = await Poste.all();
            if (!tweets) {
                throw new Error('Aucun Tweet dans la base de données');
            }
            return response.json(tweets);
        }
        catch (error) {
            throw new Error('Erreur lors de la récupération des tweets :' + error);
        }
    }
}
//# sourceMappingURL=tweets_controller.js.map