import { test, expect, type Page } from "@playwright/test"
import { type Game } from "@/lib/types"

type CommonGameProps = {
  game: Game,
  page: Page,
}

const favGames = [
  { title: "BloodBorne", studio: "From Software" },
  { title: "Final Fantasy XII", studio: "Square Enix" },
  { title: "Fatal Frame II", studio: "Tecmo Co." },
] as const

async function expectToBeVisible({ game, page }: CommonGameProps) {
  const listItem = page.getByRole("listitem")
  await expect(listItem.filter({ hasText: game.title })).toBeVisible()
  await expect(listItem.filter({ hasText: game.studio })).toBeVisible()
}

async function addGame({ game, page }: CommonGameProps) {
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

test.describe("Add Games", () => {
  test("should allow to add game items", async ({ page }) => {
    const listItem = page.getByRole("listitem")

    // Add 1st game
    await addGame({ game: favGames[0], page })
    await expectToBeVisible({ game: favGames[0], page })

    // Make sure the list only has one game item
    await expect(listItem).toContainText([favGames[0].title])
    await expect(listItem).toContainText([favGames[0].studio])
    await expect(listItem).toHaveCount(1)

    // Add 2st game
    await addGame({ game: favGames[1], page })
    await expectToBeVisible({ game: favGames[1], page })

    // Make sure the list now has two game items
    await expect(listItem).toContainText([favGames[0].title, favGames[1].title])
    await expect(listItem).toContainText([favGames[0].studio, favGames[1].studio])
    await expect(listItem).toHaveCount(2)
  })

  test("should clear text input fields when an item is added", async ({ page }) => {
    // Add 1st game
    await addGame({ game: favGames[2], page })
    await expectToBeVisible({ game: favGames[2], page })
    const listItem = page.getByRole("listitem")
    await expect(listItem).toHaveCount(1)

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
    await expectToBeVisible({ game: favGames[0], page })
    const listItem = page.getByRole("listitem")
    await expect(listItem).toHaveCount(1)

    // Delete the added game
    const addedGame = page.getByRole("listitem").filter({ hasText: favGames[0].title })
    await addedGame.getByTestId("delete").click()
    await expect(addedGame).not.toBeVisible()
    await expect(addedGame).toHaveCount(0)
  })

  test("should delete the right game among other games", async ({ page }) => {
    for (const game of favGames) {
      await addGame({ game, page })
      await expectToBeVisible({ game, page })
    }

    // Delete the right game
    const listItem = page.getByRole("listitem").filter({ hasText: favGames[1].title })
    await listItem.getByTestId("delete").click()
    await expect(listItem).not.toBeVisible()

    // Check the items quantity
    await expect(page.getByRole("listitem")).toHaveCount(favGames.length - 1)
  })
})
