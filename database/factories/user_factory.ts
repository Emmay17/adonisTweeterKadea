import  User  from '#models/user';
import factory from '@adonisjs/lucid/factories'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    const firstName = faker.person.firstName().charAt(0).toUpperCase()
    const lastName = faker.person.lastName().charAt(0).toUpperCase()
    return {
      firstname: firstName,
      lastname: lastName,
      email: faker.internet.email(),
      password: 'password1234',
    }
  })
  .build()