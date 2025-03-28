import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

const favGames = [
  { title: "BloodBorne", studio: "From Software" },
  { title: "Final Fantasy XII", studio: "Square Enix" },
  { title: "Fatal Frame II", studio: "Tecmo Co." },
] as const

test.describe("New Fav Game", () => {
  test("should allow to add game items", async ({ page }) => {
    const inputGame = page.getByRole("textbox", { name: "Game" })
    const inputStudio = page.getByRole("textbox", { name: "Studio" })
    const buttonAddGame = page.getByRole("button", { name: "Adicionar Game" })
    const listItem = page.locator("ul > li")

    // Create 1st game
    await inputGame.click()
    await inputGame.fill(favGames[0].title)
    await inputStudio.click()
    await inputStudio.fill(favGames[0].studio)
    await buttonAddGame.click()

    // Make sure the list only has one game item.
    await expect(listItem).toContainText([favGames[0].title])
    await expect(listItem).toContainText([favGames[0].studio])

    // Create 2st game
    await inputGame.click()
    await inputGame.fill(favGames[1].title)
    await inputStudio.click()
    await inputStudio.fill(favGames[1].studio)
    await buttonAddGame.click()

    // Make sure the list now has two game items.
    await expect(listItem).toContainText([favGames[0].title, favGames[1].title])
    await expect(listItem).toContainText([favGames[0].studio, favGames[1].studio])
  })
})
