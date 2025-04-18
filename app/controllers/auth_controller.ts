import User from '#models/user'
import { registerAuthValidator, loginAuthValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import CloudinaryService from '#services/CloudinaryService'

export default class AuthController {
  show({ view }: HttpContext) {
    return view.render('pages/authentification_interfaces/authinterface')
  }


  async register({ request, auth, response, session }: HttpContext) {
    try {
      const requestBody = request.body()
      const { email } = requestBody
  
      // Validation des données
      const body = await registerAuthValidator.validate(requestBody)
  
      // Vérifie si l'utilisateur existe déjà
      const userexist = await User.findBy('email', email)
      if (userexist) {
        return response.badRequest('Email existant')
      }
  
      // 1. Récupération du fichier image
      const file = request.file('avatar', {
        extnames: ['jpg', 'png', 'jpeg'],
        size: '10mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
  
      let avatarUrl = null
  
      // 2. Upload vers Cloudinary si l'image est présente
      if (file && file.tmpPath) {
        const uploaded = await CloudinaryService.upload(file.tmpPath)
        avatarUrl = uploaded.secure_url
      }
  
      // 3. Création de l'utilisateur avec avatar
      const user = await User.create({
        ...body,
        avatar: avatarUrl?.toString(),
      })
  
      // 4. Connexion automatique
      await auth.use('web').login(user)

      session.put('data', {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar, // ou tout autre champ nécessaire
      })
      // 5. Redirection
      return response.redirect().toRoute('dashboard.login', { data: user })
  
    } catch (error) {
      console.error(error)
      return response.badRequest(error)
    }
  }
  

  async logIn(ctx: HttpContext) {
    const { email, password } = await loginAuthValidator.validate(ctx.request.body())
    const user = await User.verifyCredentials(email, password)
    await ctx.auth.use('web').login(user)

    ctx.session.put('data', {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: user.avatar, // ou tout autre champ nécessaire
    })

    return ctx.response.redirect().toPath('/dashboard')
  }

  async logOut(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    ctx.session.forget('data')
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
