import vine from '@vinejs/vine'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(4).maxLength(256),
    description: vine.string().trim(),
    completed: vine.boolean(),
  })
)
