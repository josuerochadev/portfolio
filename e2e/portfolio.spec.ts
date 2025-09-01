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
    await page.waitForTimeout(1000); // Wait for smooth scroll
    
    // Check bio section is visible (target the main content section)
    await expect(page.locator('section#bio').first()).toBeInViewport();
    
    // Click on Work link
    await page.click('a[href="#projects"]');
    await page.waitForTimeout(1000);
    
    // Check projects section is visible
    await expect(page.locator('section#projects').first()).toBeInViewport();
  });

  test('should display project cards', async ({ page }) => {
    // Navigate to projects section
    await page.click('a[href="#projects"]');
    await page.waitForTimeout(1000);
    
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
    await page.waitForTimeout(1000);
    
    // Check contact section is visible (target the main section)
    await expect(page.locator('section#contact').first()).toBeInViewport();
    
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