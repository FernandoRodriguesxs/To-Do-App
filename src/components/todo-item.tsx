import { Trash2, Pencil } from 'lucide-react'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Todo } from '@/types'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { ICompleteTodo } from '@/App'

interface TodoItemProps {
  todo: Todo
  onDelete: (todoId: string) => void
  onEdit: (todoId: Todo) => void
  onCheck: (completedTodo: ICompleteTodo) => void
}
export const TodoItem = ({
  todo,
  onDelete,
  onEdit,
  onCheck,
}: TodoItemProps) => {
  const handleDeleteTodoItem = () => {
    // verifica se o id do todo existe
    if (todo.id) {
      // chama a função onDelete recebida como prop
      onDelete(todo.id)
    }
  }

  const handleEditTodoItem = () => {
    // verifica se o todo existe
    if (todo) {
      // chama a função onEdit recebida como prop
      onEdit(todo)
    }
  }

  const handleCompleteTodo = async () => {
    if (todo?.id) {
      const completedTodo = {
        todoId: todo.id,
        completed: !todo.completed,
      }
      onCheck(completedTodo)
    }
  }

  return (
    <Card
      className={`flex flex-col items-start md:flex-row md:justify-between md:items-center gap-2 p-6 ${
        todo.completed ? 'bg-primary/10' : ''
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id={todo.id}
            checked={todo.completed}
            onClick={handleCompleteTodo}
          />
          <Label htmlFor={todo.id}>
            <CardTitle
              className={`text-2xl text-primary font-bold ${
                todo.completed ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {todo.todo}
            </CardTitle>
          </Label>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {todo.description}
        </CardDescription>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleEditTodoItem}>
          <Pencil size={16} className="mr-2" />
          Edit
        </Button>
        {/* evento de clique dispara a função handleDeleteTodoItem */}
        <Button onClick={handleDeleteTodoItem}>
          <Trash2 size={16} className="mr-2" />
          Remove
        </Button>
      </div>
    </Card>
  )
}
