import { Button } from '@/components/ui/button'
import { Plus, Github } from 'lucide-react'
import { TodoItem } from './components/todo-item'
import { useEffect, useState } from 'react'
import { getTodos } from './services'
import { Todo } from './types'
export const App = () => {
  // estado de todos
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)
  const fetchTodos = async () => {
    // buscar todos usando a função getTodos
    const response = await getTodos()

    // Setar os todos no estado
    setTodos(response.slice(0, 20))
  }

  useEffect(() => {
    // executa a função fetchTodos quando a página carrega pela primeira vez
    fetchTodos()
  }, [])

  return (
    <>
      <div className="max-w-[1200px] h-screen mx-auto flex flex-col items-center gap-4 p-4">
        <header className="px-6 py-4 flex items-center justify-between border-b w-full">
          <h1 className="text-3xl font-bold text-primary">todo.app</h1>
          <div className="flex items-center gap-3">
            <Button>
              <Plus />
              Add todo
            </Button>
          </div>
        </header>
        <main className="w-full mt-32">
          <div className="w-full flex flex-col gap-4 p-4 rounded-lg bg-muted-foreground/20">
            {/* percorre e retorna a lista de todos em tela */}
            {/* key é necessário para que o react mantenha o controle dos itens da lista e os encontre facilmente */}
            {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
          </div>
        </main>
        <footer className="w-full mx-auto mt-auto text-center p-4 flex justify-center items-center">
          <small>Developed by Fernando Rodrigues</small>
          <Github size={20} className="ml-2 text-primary" />
        </footer>
      </div>
      {/* Modal */}
      {/* <TodoModal /> */}
    </>
  )
}
