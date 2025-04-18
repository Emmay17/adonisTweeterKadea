import User from '#models/user';
import factory from '@adonisjs/lucid/factories';
export const UserFactory = factory
    .define(User, async ({ faker }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        firstname: firstName,
        lastname: lastName,
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        password: 'password1234',
    };
})
    .build();
//# sourceMappingURL=user_factory.js.map