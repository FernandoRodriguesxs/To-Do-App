import { api } from '@/lib/axios'
import { Todo } from '@/types'

export const getTodos = async () => {
  // api = instância axios que fornece metodos para fazer requisições
  const response = await api.get<Todo[]>('/todos?_sort=todo&_order=desc')

  // retorna a resposta da API - requisição
  return response.data
}

export const createNewTodo = async (newTodo: Todo) => {
  // api = instância axios que fornece metodos para fazer requisições
  const response = await api.post<void>('/todos', newTodo)

  // retorna a resposta da API - requisição
  return response.data
}

export const deleteTodo = async (todoId: string) => {
  // `` crases = template literals
  // possibilidade de incluir dados em uma string
  // api.delete para acessar o verbo HTTP DELETE
  const response = await api.delete(`/todos/${todoId}`)
  return response
}
