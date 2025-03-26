import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardTitle, } from "@/components/ui/card"
import { Trophy, X } from "lucide-react"

function GameCard() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Trophy size={26} />
          <div>
            <CardTitle className="text-lg">Elden Ring</CardTitle>
            <CardDescription>From Software</CardDescription>
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

function Home() {
  return (
    <div className="max-w-[420px] px-4 py-20 mx-auto">
      <GameCard />
    </div>
  )
}

export default Home
