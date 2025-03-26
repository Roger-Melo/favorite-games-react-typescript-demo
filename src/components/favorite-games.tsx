"use client"

import { Card, CardDescription, CardFooter, CardTitle, } from "@/components/ui/card"
import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type GameCardProps = {
  title: string
  developer: string
}

function GameCard({ title, developer }: GameCardProps) {
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
  function handleAddGame() {
    console.log('alou')
  }

  return (
    <>
      <Button onClick={handleAddGame} className="cursor-pointer">
        <Plus /> Adicionar Game
      </Button>
      <GameCard title="Elden Ring" developer="From Software" />
    </>
  )
}

export { FavoriteGames }
