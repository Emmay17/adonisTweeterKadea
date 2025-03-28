import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class IsAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user
    await ctx.auth.check()
    
    // if (user?.permission_id !== 10) {
    //   return ctx.response.unauthorized('Accés réfusé')
    // }
    console.log(ctx)
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
