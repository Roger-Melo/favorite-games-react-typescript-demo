import { Gamepad2 } from "lucide-react"

function Header() {
  return (
    <header className="flex flex-col items-center">
      <Gamepad2 size={76} />
      <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Seus Games Favoritos</h1>
    </header>
  )
}

export { Header }
