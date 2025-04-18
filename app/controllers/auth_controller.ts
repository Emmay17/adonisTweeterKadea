import User from '#models/user'
import { registerAuthValidator, loginAuthValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
export default class AuthController {
  show({ view }: HttpContext) {
    return view.render('pages/authentification_interfaces/authinterface')
  }

  async register({ request, auth, response }: HttpContext) {
    try {
      const requestBody = request.body()
      const { email } = requestBody
      const body = await registerAuthValidator.validate(requestBody)
      const userexist = await User.findBy('email', email)

      if (userexist) {
        return response.badRequest('Email existant')
      }
      const user = await User.create(body)
      console.log({ user })
      await auth.use('web').login(user)
      return response.redirect().toRoute('dashboard.login', { data: user })
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async logIn({ request, auth, view }: HttpContext) {
    const { email, password } = await loginAuthValidator.validate(request.body())
  
    const user = await User.verifyCredentials(email, password)
  
    await auth.use('web').login(user)
    console.log("voiciiiiiii"+JSON.stringify(user, null, 2))
    return view.render('dashboard', { data: user })
  }

  async logOut(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    return ctx.response.redirect().toPath('/auth')
  }

  async allusers({ response }: HttpContext) {
    try {
      const users = await User.all()

      if (!users) {
        throw new Error('Aucun Utilisateur dans la base de données')
      }
      return response.json(users)
    } catch (error) {
      throw new Error('Erreur lors de la récupération des utilisateurs :' + error)
    }
  }
}
