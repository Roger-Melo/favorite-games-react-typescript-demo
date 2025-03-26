import { FavoriteGames } from "@/components/favorite-games"
import { Gamepad2 } from "lucide-react"

function Header() {
  return (
    <header className="flex flex-col items-center">
      <Gamepad2 size={76} />
      <h1 className="text-4xl font-medium tracking-tight">Seus Games Favoritos</h1>
    </header>
  )
}

function Home() {
  return (
    <div className="max-w-[420px] px-4 py-20 mx-auto flex flex-col gap-6">
      <Header />
      <FavoriteGames />
    </div>
  )
}

export default Home
