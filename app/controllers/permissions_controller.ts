// import { permission } from 'process';
import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission';

export default class PermissionsController {
    async createPermission({ view,request, response }: HttpContext) {
        const data = request.only(['labelle', 'description']);

        try {
            const newPermission = await Permission.create(data)
            if (!newPermission.description) {
                newPermission.description = "Aucune description fournie"
            }


            if (!newPermission.description) {
                return response.badRequest({ message: 'La description est requise.' })
            }
            console.log(newPermission);

            const allPermission = await Permission.findBy('idpermission',10)
            console.log(allPermission)

            // const permissionsData = allPermission.map(permission => permission.toJSON())
            // console.log("iiiiiii: " + permissionsData)
            return response.redirect().toRoute('/permissions', {allPermission : allPermission})
        } catch (error) {
            return response.status(400).json({
                message: `Erreur lors de la creation de la permission`,
                error: error.message
            })
        }
    }

    public async pagePermission({ view, response }: HttpContext) {
        try {
            const allPermission = await Permission.all()

            const permissionsData = allPermission.map(permission => permission.toJSON())

            console.log("Permissions récupérées :", allPermission)

        if (!allPermission || allPermission.length === 0) {
            console.log("⚠️ Aucune permission trouvée !");
        }
            return view.render('pages/permission', { allPermission : permissionsData })
        } catch (error) {
            return response.status(400).json({
                message: "Erreur lors de la recuperation des permissions",
                error: error.message
            })
        }
        // return view.render('pages/permission')
    }


}

