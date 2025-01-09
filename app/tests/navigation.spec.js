const { test, expect } = require('@playwright/test');

test('has link do login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click("text=Zaloguj się");
  expect(page).toHaveURL('http://localhost:3000/signIn');
  await expect(page.locator('h1')).toContainText('Zaloguj się');
});

//test sprawdzający przekierowanie
test('redirects unauthenticated user to login page', async ({ page }) => {
  // Próba dostępu do chronionej strony kalendarza
  await page.goto('http://localhost:3000/calendar');

  // Sprawdzenie czy nastąpiło przekierowanie do strony logowania
  await expect(page).toHaveURL('http://localhost:3000/signIn');

  // Sprawdzenie czy wyświetla się formularz logowania
  await expect(page.locator('h1')).toContainText('Zaloguj się');
  
  // Opcjonalnie: sprawdzenie czy wyświetla się komunikat o konieczności zalogowania
  await expect(page.locator('text=Musisz się zalogować, aby uzyskać dostęp')).toBeVisible();
}); 