"use client"

import { useEffect, useState } from "react"
import { FormAddGame } from "@/components/form-add-game"
import { GameCard } from "@/components/game-card"
import { type GameWithId, type Game, gamesWithIdSchema } from "@/lib/types"
import localforage from "localforage"

function FavoriteGames() {
  const [games, setGames] = useState<GameWithId[]>([])

  useEffect(() => {
    localforage
      .setItem("games", games)
      .catch(() => alert("Houve um erro ao adicionar games no armazenamento. Por favor, tente mais tarde."))
  }, [games])

  useEffect(() => {
    localforage.getItem("games")
      .then((games) => {
        const validatedGamesArr = gamesWithIdSchema.safeParse(games)
        if (!validatedGamesArr.success) {
          alert("Houve um erro ao obter os games armazenados. Por favor, tente mais tarde.")
          return
        }
        setGames(validatedGamesArr.data)
      })
  }, [])

  function addGame(values: Game) {
    const game: GameWithId = { title: values.title, studio: values.studio, id: crypto.randomUUID() }
    const duplicatedGame = games.some((g) => g.title.toLowerCase() === game.title.toLowerCase())
    if (duplicatedGame) {
      alert("Este game já foi adicionado. Por favor, adicione um novo game.")
      return
    }
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
              studio={game.studio}
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
