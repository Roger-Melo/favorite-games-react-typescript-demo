import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { type GameCardProps } from "@/lib/types"

type TooltipDeleteGameProps = {
  children: React.ReactNode
}

function TooltipDeleteGame({ children }: TooltipDeleteGameProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>Remover</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
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
          <TooltipDeleteGame>
            <Button
              data-testid="delete"
              onClick={() => onDelete(id)}
              variant="ghost"
              className="cursor-pointer"
            >
              <X />
            </Button>
          </TooltipDeleteGame>
        </CardFooter>
      </div>
    </Card>
  )
}

export { GameCard }
