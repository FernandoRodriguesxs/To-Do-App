import { Trash2, Pencil } from 'lucide-react'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Todo } from '@/types'

interface TodoItemProps {
  todo: Todo
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <Card className="flex justify-between items-center gap-2 p-6">
      <div className="flex flex-col gap-2">
        <CardTitle className="text-2xl text-primary font-bold">
          {todo.title}
        </CardTitle>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Pencil size={16} className="mr-2" />
          Edit
        </Button>
        <Button>
          <Trash2 size={16} className="mr-2" />
          Remove
        </Button>
      </div>
    </Card>
  )
}
