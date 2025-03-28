import User from '#models/user'
import { registerAuthValidator, loginAuthValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

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
      return response.redirect().toRoute
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async logIn({ request, auth, response,view }: HttpContext) {
    const requestBody = request.body()
    const body = await loginAuthValidator.validate(requestBody)
    const { email, password } = body

    const user = (await User.verifyCredentials(email, password))

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.login', {data : user})
  }

  async logOut(ctx:HttpContext){
    await ctx.auth.use('web').logout()
    return ctx.response.redirect().toPath('/auth')
  }
}
