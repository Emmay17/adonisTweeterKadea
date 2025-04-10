import User from '#models/user';
import { registerAuthValidator, loginAuthValidator } from '#validators/auth';
export default class AuthController {
    show({ view }) {
        return view.render('pages/authentification_interfaces/authinterface');
    }
    async register({ request, auth, response }) {
        try {
            const requestBody = request.body();
            const { email } = requestBody;
            const body = await registerAuthValidator.validate(requestBody);
            const userexist = await User.findBy('email', email);
            if (userexist) {
                return response.badRequest('Email existant');
            }
            const user = await User.create(body);
            console.log({ user });
            await auth.use('web').login(user);
            return response.redirect().toRoute('dashboard.login', { data: user });
        }
        catch (error) {
            return response.badRequest(error);
        }
    }
    async logIn({ request, auth, response }) {
        const requestBody = request.body();
        const body = await loginAuthValidator.validate(requestBody);
        const { email, password } = body;
        const user = (await User.verifyCredentials(email, password));
        await auth.use('web').login(user);
        return response.redirect().toRoute('dashboard.login', { data: user });
    }
    async logOut(ctx) {
        await ctx.auth.use('web').logout();
        return ctx.response.redirect().toPath('/auth');
    }
    async allusers({ response }) {
        try {
            const users = await User.all();
            if (!users) {
                throw new Error('Aucun Utilisateur dans la base de données');
            }
            return response.json(users);
        }
        catch (error) {
            throw new Error('Erreur lors de la récupération des utilisateurs :' + error);
        }
    }
}
//# sourceMappingURL=auth_controller.js.map