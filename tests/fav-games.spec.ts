import { test, expect, type Page } from "@playwright/test"

type Game = {
  title: string
  studio: string
}

type AddGameProps = {
  game: Game,
  page: Page,
}

const favGames = [
  { title: "BloodBorne", studio: "From Software" },
  { title: "Final Fantasy XII", studio: "Square Enix" },
  { title: "Fatal Frame II", studio: "Tecmo Co." },
] as const

async function addGame({ game, page }: AddGameProps) {
  const inputGame = page.getByRole("textbox", { name: "Game" })
  const inputStudio = page.getByRole("textbox", { name: "Studio" })
  const buttonAddGame = page.getByRole("button", { name: "Adicionar Game" })
  await inputGame.click()
  await inputGame.fill(game.title)
  await inputStudio.click()
  await inputStudio.fill(game.studio)
  await buttonAddGame.click()
  const listItem = page.getByRole("listitem").filter({ hasText: game.title })
  await expect(listItem).toBeVisible()
}

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test.describe("Add Games", () => {
  test("should allow to add game items", async ({ page }) => {
    const listItem = page.getByRole("listitem")

    // Add 1st game
    await addGame({ game: favGames[0], page })

    // Make sure the list only has one game item
    await expect(listItem).toContainText([favGames[0].title])
    await expect(listItem).toContainText([favGames[0].studio])

    // Add 2st game
    await addGame({ game: favGames[1], page })

    // Make sure the list now has two game items
    await expect(listItem).toContainText([favGames[0].title, favGames[1].title])
    await expect(listItem).toContainText([favGames[0].studio, favGames[1].studio])
  })

  test("should clear text input fields when an item is added", async ({ page }) => {
    // Add 1st game
    await addGame({ game: favGames[2], page })

    // Check that form is empty
    const inputGame = page.getByRole("textbox", { name: "Game" })
    const inputStudio = page.getByRole("textbox", { name: "Studio" })
    await expect(inputGame).toBeEmpty()
    await expect(inputStudio).toBeEmpty()
  })
})

test.describe("Delete Games", () => {
  test("should delete the game item", async ({ page }) => {
    await addGame({ game: favGames[0], page })

    // Delete the added game
    const listItem = page.getByRole("listitem").filter({ hasText: favGames[0].title })
    await listItem.getByTestId("delete").click()
    await expect(listItem).not.toBeVisible()
  })

  test("should delete the right game among other games", async ({ page }) => {
    for (const game of favGames) {
      await addGame({ game, page })
    }

    // Delete the right game
    const listItem = page.getByRole("listitem").filter({ hasText: favGames[1].title })
    await listItem.getByTestId("delete").click()
    await expect(listItem).not.toBeVisible()

    // Check the items quantity
    await expect(page.getByRole("listitem")).toHaveCount(favGames.length - 1)
  })
})

// TODO: should trim entered text
