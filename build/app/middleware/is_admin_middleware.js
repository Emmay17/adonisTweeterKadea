export default class IsAdminMiddleware {
    async handle(ctx, next) {
        await ctx.auth.check();
        console.log(ctx);
        const output = await next();
        return output;
    }
}
//# sourceMappingURL=is_admin_middleware.js.map