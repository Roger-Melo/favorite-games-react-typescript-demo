"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormAddGame } from "@/components/form-add-game"
import { type GameCardProps, type GameWithId, type Game } from "@/lib/types"

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

function FavoriteGames() {
  const [games, setGames] = useState<GameWithId[]>([])

  function addGame(values: Game) {
    const game: GameWithId = { title: values.title, developer: values.developer, id: crypto.randomUUID() }
    setGames((prev) => [...prev, game])
  }

  function deleteGame(id: string) {
    setGames((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <FormAddGame onSubmitGame={addGame} />
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
