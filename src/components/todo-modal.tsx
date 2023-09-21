import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ITodoModalProps {
  onCancel: () => void
  onCreate: () => void
  onChangeTitle: (title: string) => void
  onChangeDescription: (description: string) => void
  title: string
  description: string
}

export const TodoModal = ({
  onCancel,
  onCreate,
  title,
  description,
  onChangeTitle,
  onChangeDescription,
}: ITodoModalProps) => {
  // função que chama a prop onChangeTitle e passa o valor do input que veio do evento
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(e.currentTarget.value)
  }

  // função que chama a prop onChangeDescription e passa o valor do input que veio do evento
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChangeDescription(e.currentTarget.value)
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700/90 h-screen w-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-primary font-bold">
            Todo
          </CardTitle>
          <CardDescription>Fill in the form to add a new todo</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                {/* valor do input vindo do state (title) do App.tsx */}
                <Input
                  value={title}
                  onChange={handleChangeTitle}
                  id="name"
                  placeholder="add a title to your todo"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                {/* valor do textarea vindo do state (description) do App.tsx */}
                <Textarea
                  value={description}
                  onChange={handleChangeDescription}
                  id="name"
                  placeholder="add a description to your todo"
                  rows={5}
                  className="resize-none"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* função onCancel que vem das props */}
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          {/* função onCreate que vem das props */}
          <Button onClick={onCreate}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
