"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardTitle, } from "@/components/ui/card"
import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Game = {
  title: string
  developer: string
}

type GameWithId = Game & {
  id: number
}

function GameCard({ title, developer }: Game) {
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
          <Button variant="ghost" className="cursor-pointer">
            <X />
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

function FavoriteGames() {
  const [games, setGames] = useState<GameWithId[]>([])

  function handleAddGame() {
    const game: GameWithId = { title: "Elden Ring", developer: "From Software", id: Math.random() }
    setGames((prev) => [...prev, game])
  }

  return (
    <>
      <Button onClick={handleAddGame} className="cursor-pointer">
        <Plus /> Adicionar Game
      </Button>
      <ul className="flex flex-col gap-4">
        {games.map((game) =>
          <li key={game.id}>
            <GameCard title={game.title} developer={game.developer} />
          </li>
        )}
      </ul>
    </>
  )
}

export { FavoriteGames }
