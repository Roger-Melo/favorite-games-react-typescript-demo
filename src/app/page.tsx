import { FavoriteGames } from "@/components/favorite-games"
import { Header } from "@/components/header"

function Home() {
  return (
    <div className="max-w-[420px] px-4 py-20 mx-auto flex flex-col gap-6">
      <Header />
      <FavoriteGames />
    </div>
  )
}

export default Home
