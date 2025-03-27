"use client"

import { useEffect, useState } from "react"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"

type Game = {
  title: string
  developer: string
}

type GameWithId = Game & {
  id: string
}

type GameCardProps = Game & {
  id: string
  onDelete: (id: string) => void
}

function GameCard({ title, developer, onDelete, id }: GameCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Trophy size={26} strokeWidth={1} />
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{developer}</CardDescription>
          </div>
        </div>
        <CardFooter className="p-0">
          <Button onClick={() => onDelete(id)} variant="ghost" className="cursor-pointer">
            <X />
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

const gameSchema = z.object({
  title: string().min(1, { message: "Insira no mínimo 1 caractere" }),
  developer: string().min(1, { message: "Insira no mínimo 1 caractere" }),
})

type GameSchema = z.infer<typeof gameSchema>

function FavoriteGames() {
  const [games, setGames] = useState<GameWithId[]>([])
  const form = useForm<GameSchema>({
    resolver: zodResolver(gameSchema),
    defaultValues: { title: "", developer: "" },
  })
  const { reset, formState } = form

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [reset, formState.isSubmitSuccessful])

  function addGame(values: GameSchema) {
    const game: GameWithId = { title: values.title, developer: values.developer, id: crypto.randomUUID() }
    setGames((prev) => [...prev, game])
  }

  function deleteGame(id: string) {
    setGames((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addGame)} className="flex flex-col gap-4">
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
      <ul className="flex flex-col gap-4">
        {games.map((game) =>
          <li key={game.id}>
            <GameCard
              title={game.title}
              developer={game.developer}
              onDelete={deleteGame}
              id={game.id}
            />
          </li>
        )}
      </ul>
    </>
  )
}

export { FavoriteGames }
