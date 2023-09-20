import { api } from '@/lib/axios'
import { Todo } from '@/types'

interface IGetTodosResponse {
  todos: Todo[]
}
export const getTodos = async () => {
  // api = instância axios que fornece metodos para fazer requisições
  const response = await api.get<IGetTodosResponse>('/todos?limit=10')

  // retorna a resposta da API - requisição
  return response.data
}

export const deleteTodo = async (todoId: number) => {
  // `` crases = template literals
  // possibilidade de incluir dados em uma string
  // api.delete para acessar o verbo HTTP DELETE
  const response = await api.delete(`/todos/${todoId}`)
  return response
}
