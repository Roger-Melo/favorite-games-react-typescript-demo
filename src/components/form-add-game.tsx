"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function FormAddGame() {
  function handleAddGame() {
    console.log('alou')
  }

  return (
    <Button onClick={handleAddGame} className="cursor-pointer">
      <Plus /> Adicionar Game
    </Button>
  )
}

export { FormAddGame }
