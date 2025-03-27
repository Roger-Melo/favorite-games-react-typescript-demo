"use client"

import { useState } from "react"
import { FormAddGame } from "@/components/form-add-game"
import { GameCard } from "@/components/game-card"
import { type GameWithId, type Game } from "@/lib/types"

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
