import { z } from "zod"

export const gameSchema = z.object({
  title: z.string().trim().min(1, { message: "Insira no mínimo 1 caractere" }),
  developer: z.string().trim().min(1, { message: "Insira no mínimo 1 caractere" }),
})

export type Game = z.infer<typeof gameSchema>

export type GameWithId = Game & {
  id: string
}

export type GameCardProps = Game & {
  id: string
  onDelete: (id: string) => void
}

export type AddGameFormProps = {
  onSubmitGame: (values: Game) => void
}
