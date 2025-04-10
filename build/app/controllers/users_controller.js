export default class UsersController {
    async registerUser({ request, response }) {
        const data = request.all();
        if (!data.email || !data.password) {
            return response.status(400).json({ error: 'Données manquantes' });
        }
        console.log('Données envoyées :', data);
    }
}
//# sourceMappingURL=users_controller.js.map