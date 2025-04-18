import User from '#models/user';
import { registerAuthValidator, loginAuthValidator } from '#validators/auth';
import CloudinaryService from '#services/CloudinaryService';
export default class AuthController {
    show({ view }) {
        return view.render('pages/authentification_interfaces/authinterface');
    }
    async register({ request, auth, response, session }) {
        try {
            const requestBody = request.body();
            const { email } = requestBody;
            const body = await registerAuthValidator.validate(requestBody);
            const userexist = await User.findBy('email', email);
            if (userexist) {
                return response.badRequest('Email existant');
            }
            const file = request.file('avatar', {
                extnames: ['jpg', 'png', 'jpeg'],
                size: '10mb',
            });
            let avatarUrl = null;
            if (file && file.tmpPath) {
                const uploaded = await CloudinaryService.upload(file.tmpPath);
                avatarUrl = uploaded.secure_url;
            }
            const user = await User.create({
                ...body,
                avatar: avatarUrl?.toString(),
            });
            await auth.use('web').login(user);
            session.put('data', {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                avatar: user.avatar,
            });
            return response.redirect().toRoute('dashboard.login', { data: user });
        }
        catch (error) {
            console.error(error);
            return response.badRequest(error);
        }
    }
    async logIn(ctx) {
        const { email, password } = await loginAuthValidator.validate(ctx.request.body());
        const user = await User.verifyCredentials(email, password);
        await ctx.auth.use('web').login(user);
        ctx.session.put('data', {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar: user.avatar,
        });
        return ctx.response.redirect().toPath('/dashboard');
    }
    async logOut(ctx) {
        await ctx.auth.use('web').logout();
        ctx.session.forget('data');
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