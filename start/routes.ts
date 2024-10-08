/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [TodosController, 'index'])
router.post('/', [TodosController, 'store'])
router.get('/:id', [TodosController, 'show'])
router.put('/:id', [TodosController, 'update'])
router.delete('/:id', [TodosController, 'destroy'])
