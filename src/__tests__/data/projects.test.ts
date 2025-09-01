import { describe, it, expect } from 'vitest';
import { PROJECTS } from '../../data/projects';

describe('Projects data', () => {
  it('should have 5 projects', () => {
    expect(PROJECTS).toHaveLength(5);
  });

  it('should have required fields for each project', () => {
    PROJECTS.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('deliverables');
      expect(project).toHaveProperty('context');
      expect(project).toHaveProperty('image');
      expect(project).toHaveProperty('status');
      expect(project).toHaveProperty('year');
      expect(project).toHaveProperty('category');
      
      // Ensure required fields are not empty
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
    });
  });

  it('should have valid status values', () => {
    const validStatuses = ['completed', 'in-progress', 'concept'];
    
    PROJECTS.forEach((project) => {
      expect(validStatuses).toContain(project.status);
    });
  });

  it('should have valid category values', () => {
    const validCategories = ['web-app', 'showcase', 'e-commerce', 'portfolio', 'personal'];
    
    PROJECTS.forEach((project) => {
      expect(validCategories).toContain(project.category);
    });
  });

  it('should have unique IDs', () => {
    const ids = PROJECTS.map(project => project.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(PROJECTS.length);
  });

  it('should include expected projects', () => {
    const projectTitles = PROJECTS.map(p => p.title);
    
    expect(projectTitles).toContain('La Lunetterie du Coin');
    expect(projectTitles).toContain('Site vitrine pour une avocate');
    expect(projectTitles).toContain('Site vitrine pour un poète');
    expect(projectTitles).toContain('E-commerce fictif - Achat d\'étoiles en ligne');
    expect(projectTitles).toContain('Mon parcours vers le titre pro CDA');
  });
});