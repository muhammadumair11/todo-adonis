import Todo from '#models/todo'
import { createTodoValidator } from '#validators/todo'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'

export default class TodosController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    return Todo.query().paginate(page)
  }

  /**
   * Handle inserting data
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createTodoValidator)
    return Todo.create(payload)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const todo = await Todo.findOrFail(params.id)
      return todo
    } catch (error) {
      return response.json({
        messages: 'Item not found',
        error,
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const todo = await Todo.findOrFail(params.id)

      const payload = await request.validateUsing(createTodoValidator)

      todo.title = payload.title
      todo.description = payload.description
      todo.completed = payload.completed

      todo.save()

      return 'Todo updated'
    } catch (error) {
      return response.json({
        messages: 'Todo Item not found',
        error,
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const todo = await Todo.findOrFail(params.id)
      todo.delete()

      return 'Todo deleted'
    } catch (error) {
      return response.json({
        messages: 'Todo Item not found',
        error,
      })
    }
  }
}
