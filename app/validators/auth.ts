import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
    minLength : 'Le champ {{ field }} doit avoir au moins {{ min }} caractères',
    email : 'l\'adresse email doit étre correct'
})

export const registerAuthValidator = vine.compile(
    vine.object({
        firstname : vine.string().minLength(3).maxLength(50),
        lastname : vine.string().minLength(3).maxLength(50),
        email : vine.string().email(),
        password : vine.string().minLength(4)
    })
)

export const loginAuthValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(4)
    })
)