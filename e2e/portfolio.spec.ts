import { test, expect } from '@playwright/test';

test.describe('Portfolio - Core functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage with hero section', async ({ page }) => {
    // Check hero section is visible
    await expect(page.locator('#hero')).toBeVisible();
    
    // Check main title contains "Josué Rocha" in hero section specifically
    await expect(page.locator('#hero').getByText('Josué Rocha')).toBeVisible();
    
    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should navigate through sections', async ({ page }) => {
    // Click on About link
    await page.click('a[href="#bio"]');
    
    // Wait for lazy loading to complete and content to be actually rendered
    await page.waitForSelector('section#bio', { state: 'visible', timeout: 15000 });
    await page.waitForTimeout(2000); // Extra time for scroll and render
    
    // Check bio section content is visible
    await expect(page.locator('section#bio')).toBeVisible();
    await expect(page.locator('section#bio h2').first()).toBeVisible();
    
    // Click on Work link
    await page.click('a[href="#projects"]');
    await page.waitForTimeout(1000);
    
    // Check projects section is visible
    await expect(page.locator('section#projects').first()).toBeInViewport();
  });

  test('should display project cards', async ({ page }) => {
    // Navigate to projects section
    await page.click('a[href="#projects"]');
    
    // Wait for lazy loading to complete
    await page.waitForSelector('section#projects', { state: 'visible', timeout: 15000 });
    await page.waitForTimeout(1500); // Extra time for content to render
    
    // Check projects are displayed
    const projectCards = page.locator('article');
    await expect(projectCards).toHaveCount(5);
    
    // Check first project has required elements
    const firstProject = projectCards.first();
    await expect(firstProject.locator('img')).toBeVisible();
    await expect(firstProject.locator('h3')).toBeVisible();
    await expect(firstProject.locator('text=MORE DETAILS')).toBeVisible();
  });

  test('should navigate to project detail page', async ({ page }) => {
    // Navigate to projects and click first "MORE DETAILS"
    await page.click('a[href="#projects"]');
    await page.waitForTimeout(1000);
    
    const detailLink = page.locator('text=MORE DETAILS').first();
    await detailLink.click();
    
    // Should navigate to project detail page
    await expect(page).toHaveURL(/\/projet\/.+/);
    
    // Should show project detail content
    await expect(page.getByText('Retour aux projets')).toBeVisible();
  });

  test('should have working contact section', async ({ page }) => {
    // Navigate to contact section
    await page.click('a[href="#contact"]');
    
    // Wait for lazy loading to complete
    await page.waitForSelector('section#contact', { state: 'visible', timeout: 15000 });
    await page.waitForTimeout(2000); // Extra time for scroll and render
    
    // Check contact section content is visible
    await expect(page.locator('section#contact')).toBeVisible();
    
    // Check contact elements are present (more specific selector)
    await expect(page.locator('section#contact h2')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // Navigation should still be visible on mobile
    await expect(page.locator('nav')).toBeVisible();
    
    // Hero should adapt to mobile
    await expect(page.locator('#hero')).toBeVisible();
  });
});

test.describe('Portfolio - Legal pages', () => {
  test('should navigate to legal notice', async ({ page }) => {
    await page.goto('/mentions-legales');
    
    await expect(page.getByRole('heading', { name: 'Mentions Légales' })).toBeVisible();
    await expect(page.getByText('Retour à l\'accueil')).toBeVisible();
  });

  test('should navigate to privacy policy', async ({ page }) => {
    await page.goto('/politique-confidentialite');
    
    await expect(page.getByRole('heading', { name: 'Politique de Confidentialité' })).toBeVisible();
    await expect(page.getByText('Retour à l\'accueil')).toBeVisible();
  });

  test('should handle 404 page', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page introuvable')).toBeVisible();
  });
});