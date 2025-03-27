import { useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type Game, type AddGameFormProps, gameSchema } from "@/lib/types"

function FormAddGame({ onSubmitGame }: AddGameFormProps) {
  const form = useForm<Game>({
    resolver: zodResolver(gameSchema),
    defaultValues: { title: "", developer: "" },
  })
  const { reset, formState } = form

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [reset, formState.isSubmitSuccessful])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitGame)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) =>
            <FormItem>
              <FormLabel>Game</FormLabel>
              <FormControl>
                <Input placeholder="Elden Ring" type="text" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          }
        />
        <FormField
          control={form.control}
          name="developer"
          render={({ field }) =>
            <FormItem>
              <FormLabel>Studio</FormLabel>
              <FormControl>
                <Input placeholder="From Software" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }
        />
        <Button type="submit" className="cursor-pointer w-full">
          <Plus /> Adicionar Game
        </Button>
      </form>
    </Form>
  )
}

export { FormAddGame }
