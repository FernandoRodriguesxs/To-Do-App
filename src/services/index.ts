import { api } from '@/lib/axios'
import { Todo } from '@/types'

export const getTodos = async () => {
  // api = instância axios que fornece metodos para fazer requisições
  const response = await api.get<Todo[]>('/todos')

  // retorna a resposta da API - requisição
  return response.data
}
