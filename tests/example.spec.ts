import { test, expect, type Page } from "@playwright/test"

type Game = {
  title: string
  studio: string
}

type CreateGameProps = {
  game: Game,
  page: Page,
}

const favGames = [
  { title: "BloodBorne", studio: "From Software" },
  { title: "Final Fantasy XII", studio: "Square Enix" },
  { title: "Fatal Frame II", studio: "Tecmo Co." },
] as const

async function createGame({ game, page }: CreateGameProps) {
  const inputGame = page.getByRole("textbox", { name: "Game" })
  const inputStudio = page.getByRole("textbox", { name: "Studio" })
  const buttonAddGame = page.getByRole("button", { name: "Adicionar Game" })
  await inputGame.click()
  await inputGame.fill(game.title)
  await inputStudio.click()
  await inputStudio.fill(game.studio)
  await buttonAddGame.click()
}

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test.describe("New Fav Game", () => {
  test("should allow to add game items", async ({ page }) => {
    const listItem = page.locator("ul > li")

    // Create 1st game
    await createGame({ game: favGames[0], page })

    // Make sure the list only has one game item.
    await expect(listItem).toContainText([favGames[0].title])
    await expect(listItem).toContainText([favGames[0].studio])

    // Create 2st game
    await createGame({ game: favGames[1], page })

    // Make sure the list now has two game items
    await expect(listItem).toContainText([favGames[0].title, favGames[1].title])
    await expect(listItem).toContainText([favGames[0].studio, favGames[1].studio])
  })

  test("should clear text input fields when an item is added", async ({ page }) => {
    // Create 1st game
    await createGame({ game: favGames[2], page })

    // Check that form is empty
    const inputGame = page.getByRole("textbox", { name: "Game" })
    const inputStudio = page.getByRole("textbox", { name: "Studio" })
    await expect(inputGame).toBeEmpty()
    await expect(inputStudio).toBeEmpty()
  })
})
