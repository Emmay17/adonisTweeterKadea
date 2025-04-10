import vine, {SimpleMessagesProvider} from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
    minLength: 'Le champ {{ field }} doit avoir au moins {{ min }} caractères',
    maxLength: 'Le champ {{ field }} doit avoir au plus {{ max }} caractères',
})

export const addpost = vine.compile(
    vine.object({
        content: vine.string().minLength(3).maxLength(500),
        image: vine.string().optional(),
        id_user: vine.number(),
        id_post: vine.number().optional(),
        comment: vine.number().optional(),
        partage: vine.number().optional(),
        likes: vine.number().optional(),
    })
)