# Contributing to ck0xdev Portfolio

Thanks for your interest in contributing! Here's how to get started.

---

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## Code Style

### JavaScript / JSX

- **Functional components** only — no class components (except `ErrorBoundary`).
- **Named exports** for data, **default exports** for components.
- Use `const` by default; `let` only when reassignment is needed.
- Destructure props and imports.
- JSDoc comments on every component and data file.

### CSS

- All styles live in `src/index.css` — organized by numbered sections.
- Use CSS Custom Properties (`:root` variables) for colors, not hardcoded values.
- Follow `.component-element` naming (e.g., `.social-card-icon`).
- No inline styles unless absolutely necessary for dynamic values.
- Keep responsive overrides inside `@media` blocks at the bottom of the file.

### File Organization

| Type | Location | Naming |
|------|----------|--------|
| Page sections | `src/sections/` | `PascalCase.jsx` |
| Layout components | `src/layout/` | `PascalCase.jsx` |
| Shared UI | `src/components/ui/` | `PascalCase.jsx` |
| Data files | `src/data/` | `camelCase.js` |
| Constants | `src/constants/` | `index.js` |

---

## Adding a New Section

1. Create `src/sections/NewSection.jsx`
2. Add data to `src/data/newSectionData.js` (if needed)
3. Lazy-import in `App.jsx`:
   ```jsx
   const NewSection = lazy(() => import('./sections/NewSection'));
   ```
4. Add CSS in the appropriate section of `index.css`
5. Add nav entry in `src/data/navigation.js`

---

## Adding a New Project

Edit `src/data/projects.js` — no component changes needed:

```js
{
  id: 'my-project',
  title: 'My Project',
  placeholder: 'My Project',
  description: 'What the project does.',
  techStack: ['React', 'Node.js'],
  link: 'https://github.com/...',
  icon: 'ph-github-logo',  // or 'ph-arrow-up-right' for external
}
```

---

## Security Checklist

Before submitting changes:

- [ ] No `dangerouslySetInnerHTML` or `eval()`
- [ ] All `target="_blank"` links have `rel="noopener noreferrer"`
- [ ] No secrets or API keys in source code
- [ ] No `console.log` in production (use `import.meta.env.DEV` guard)

---

## Questions?

Open an issue or reach out at [kukadiyachintan026@gmail.com](mailto:kukadiyachintan026@gmail.com).
