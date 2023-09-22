import { Button } from '@/components/ui/button'
import { Plus, Github, Bird } from 'lucide-react'
import { TodoItem } from './components/todo-item'
import { useEffect, useState } from 'react'
import {
  completeTodo,
  createNewTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './services'
import { Todo } from './types'
import { TodoModal } from './components/todo-modal'
import { generateRandomId } from './utils'
import { TodoListSkeleton } from './components/todo-list-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export interface ICompleteTodo {
  todoId: string
  completed: boolean
}
export const App = () => {
  // estado de todos
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)
  const [todo, setTodo] = useState<Todo | undefined>(undefined)
  const [isCreateNewTodoModalOpen, setIsCreateNewTodoModalOpen] =
    useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const cleanInputStates = () => {
    setTitle('')
    setDescription('')
  }

  // se a função é async significa q se comunica com o endpoint / api
  const fetchTodos = async () => {
    // buscar todos usando a função getTodos
    const response = await getTodos()

    // Setar os todos no estado
    setTodos(response)
  }

  // se a função é async significa q se comunica com o endpoint / api
  const handleDeleteTodo = async (todoId: string) => {
    // chamar a api passando o todoId para deletar o todo
    await deleteTodo(todoId)

    // chama novamente a função fetchTodos para atualizar a lista de todos com o retorno da api
    await fetchTodos()
  }

  // se a função é async significa q se comunica com o endpoint / api
  const handleCreateNewTodo = async () => {
    // montar o objeto novo todo com os states title e description
    const newTodo = {
      id: generateRandomId(),
      todo: title,
      description,
      completed: false,
    }

    // chamar a api para criar o novo todo
    await createNewTodo(newTodo)

    // limpar os campos do modal depois de criar o novo todo
    cleanInputStates()

    // fechar o modal
    setIsCreateNewTodoModalOpen(false)

    // chamar novamente a função fetchTodos para atualizar a lista de todos
    await fetchTodos()
  }

  const onChangeTitle = (title: string) => {
    setTitle(title)
  }

  const onChangeDescription = (description: string) => {
    setDescription(description)
  }

  // se a função é async significa q se comunica com o endpoint / api
  const handleEditModeTodoModal = async (todo: Todo) => {
    // guardar o todo que esta sendo editado para ser utilizado depois para chamar a api de edição PATCH
    setTodo(todo)
    // alterar estado com os dados do todo que esta sendo editado
    setTitle(todo.todo)
    setDescription(todo.description)

    // mudar o estado do modal para edição
    setIsEditing(true)

    // abrir modal do todo que esta sendo editado
    setIsCreateNewTodoModalOpen(true)
  }

  // se a função é async significa q se comunica com o endpoint / api
  const handleEditTodoApi = async () => {
    // verifica se o id do todo existe e se o titulo e a descrição estão preenchidos
    if (todo?.id && title && description) {
      // montar o objeto novo todo com os states title e description
      const editedTodo = {
        todoId: todo.id,
        todo: title,
        description,
      }

      // chamar a api para editar o todo
      await updateTodo(editedTodo)

      // fechar o modal
      setIsCreateNewTodoModalOpen(false)

      // limpar os estados
      cleanInputStates()

      // mudar o estado do modal de edição para criação (comportamento padrão)
      setIsEditing(false)

      // chamar novamente a função fetchTodos para atualizar a lista de todos
      await fetchTodos()
    }
  }

  const handleCancelTodoOperations = () => {
    // fechar o modal
    setIsCreateNewTodoModalOpen(false)

    // limpar os estados dos inputs
    cleanInputStates()

    // mudar o estado do modal de edição para criação (comportamento padrão)
    setIsEditing(false)
  }

  const handleCompleteTodo = async (completedTodo: ICompleteTodo) => {
    // chamar a api passando o todoId e o completed para completar o todo
    await completeTodo(completedTodo)

    // chamar novamente a função fetchTodos para atualizar a lista de todos
    await fetchTodos()
  }

  useEffect(() => {
    // executa a função fetchTodos quando a página carrega pela primeira vez
    fetchTodos()
  }, [])

  return (
    <>
      <div className="max-w-[1200px] h-screen mx-auto flex flex-col items-center gap-4 p-4">
        <header className="px-6 py-4 flex flex-col md:flex-row items-center justify-between border-b w-full gap-4">
          <h1 className="text-3xl font-bold text-primary">todo.app</h1>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsCreateNewTodoModalOpen(true)}>
              <Plus />
              Add todo
            </Button>
          </div>
        </header>
        <main className="w-full mt-32">
          <div className="w-full flex flex-col gap-4 p-4 rounded-lg bg-muted-foreground/20">
            {/* percorre e retorna a lista de todos em tela */}
            {/* key é necessário para que o react mantenha o controle dos itens da lista e os encontre facilmente */}
            {todos?.map((todo) => (
              <TodoItem
                key={todo.id}
                onEdit={handleEditModeTodoModal}
                onDelete={handleDeleteTodo}
                todo={todo}
                onCheck={handleCompleteTodo}
              />
            ))}
            {!todos && <TodoListSkeleton />}
            {todos?.length === 0 && (
              <div className="flex flex-col gap-4">
                <Alert>
                  <Bird size={24} />
                  <AlertTitle>Ops...</AlertTitle>

                  <AlertDescription>
                    Você ainda não tem nenhum todo, clique em{' '}
                    <strong>&quot;add todo&quot;</strong> para começar.
                  </AlertDescription>
                </Alert>
                <Button onClick={() => setIsCreateNewTodoModalOpen(true)}>
                  <Plus />
                  Add todo
                </Button>
              </div>
            )}
          </div>
        </main>
        <footer className="w-full mx-auto mt-auto text-center p-4 flex justify-center items-center">
          <small>Developed by Fernando Rodrigues</small>
          <Github size={20} className="ml-2 text-primary" />
        </footer>
      </div>
      {/* Modal */}
      {isCreateNewTodoModalOpen && (
        <TodoModal
          onCreate={handleCreateNewTodo}
          onEdit={handleEditTodoApi}
          onCancel={handleCancelTodoOperations}
          title={title}
          description={description}
          onChangeTitle={onChangeTitle}
          onChangeDescription={onChangeDescription}
          isEditing={isEditing}
        />
      )}
    </>
  )
}
