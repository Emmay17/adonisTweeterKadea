import Permission from '#models/permission';
export default class PermissionsController {
    async createPermission({ request, response }) {
        const data = request.only(['labelle', 'description']);
        try {
            const newPermission = await Permission.create(data);
            if (!newPermission.description) {
                newPermission.description = "Aucune description fournie";
            }
            if (!newPermission.description) {
                return response.badRequest({ message: 'La description est requise.' });
            }
            console.log(newPermission);
            const allPermission = await Permission.findBy('idpermission', 10);
            console.log(allPermission);
            return response.redirect().toRoute('/permissions', { allPermission: allPermission });
        }
        catch (error) {
            return response.status(400).json({
                message: `Erreur lors de la creation de la permission`,
                error: error.message
            });
        }
    }
    async pagePermission({ view, response }) {
        try {
            const allPermission = await Permission.all();
            const permissionsData = allPermission.map(permission => permission.toJSON());
            console.log("Permissions récupérées :", allPermission);
            if (!allPermission || allPermission.length === 0) {
                console.log("⚠️ Aucune permission trouvée !");
            }
            return view.render('pages/permission', { allPermission: permissionsData });
        }
        catch (error) {
            return response.status(400).json({
                message: "Erreur lors de la recuperation des permissions",
                error: error.message
            });
        }
    }
}
//# sourceMappingURL=permissions_controller.js.map