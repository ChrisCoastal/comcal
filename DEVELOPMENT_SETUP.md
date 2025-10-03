# Development Setup Guide

This document outlines the lightweight commit automation, tooling, and formatting setup for solo development.

## 🛠️ Installed Tools

### Core Tools

- **Prettier** - Code formatting
- **Husky** - Git hooks management
- **lint-staged** - Run linters on staged files only
- **commitlint** - Enforce conventional commits
- **commitizen** - Interactive commit message creation

### Configuration Files

- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files to ignore during formatting
- `commitlint.config.js` - Commit message validation rules
- `.lintstagedrc.js` - Pre-commit file processing rules
- `.husky/pre-commit` - Pre-commit hook
- `.husky/commit-msg` - Commit message validation hook
- `.vscode/settings.json` - VS Code integration

## 🚀 Quick Start

### Initial Setup

```bash
# Run the setup script
./scripts/setup-git-hooks.sh

# Or manually:
npm install
npx husky init
chmod +x .husky/pre-commit .husky/commit-msg
```

### Daily Workflow

#### 1. Interactive Commits (Recommended)

```bash
npm run commit
```

This opens an interactive prompt that guides you through creating properly formatted commit messages.

#### 2. Manual Commits

```bash
git add .
git commit -m "feat(calendar): add month view toggle"
```

#### 3. Code Quality Commands

```bash
# Format all code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## 📋 Available NPM Scripts

| Script                 | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start development server                    |
| `npm run build`        | Build for production                        |
| `npm run start`        | Start production server                     |
| `npm run lint`         | Run ESLint                                  |
| `npm run lint:fix`     | Fix ESLint issues automatically             |
| `npm run format`       | Format all code with Prettier               |
| `npm run format:check` | Check code formatting                       |
| `npm run type-check`   | Run TypeScript type checking                |
| `npm run commit`       | Interactive commit with conventional format |

## 🔧 Git Hooks

### Pre-commit Hook

- Runs `lint-staged` on staged files
- Automatically formats and lints only changed files
- Prevents commits with formatting or linting issues

### Commit-msg Hook

- Validates commit message format using commitlint
- Ensures conventional commit standards
- Rejects commits with invalid message format

## 📝 Commit Message Standards

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `wip` - Work in progress
- `ui` - UI/UX changes
- `db` - Database changes
- `revert` - Reverting changes

### Examples

```bash
feat(calendar): add month view toggle
fix(table): resolve sorting issue with date columns
test(forms): add validation tests for entry form
wip(forms): implement entry validation logic
ui(components): improve button hover states
db(schema): add indexes for entry queries
docs(api): update GraphQL schema documentation
refactor(api): simplify data fetching logic
```

## 🎯 Benefits for Solo Development

### 1. Consistency

- All code follows the same formatting standards
- Commit messages are consistent and meaningful
- Easy to track changes and understand project history

### 2. Quality Assurance

- Automatic code formatting prevents style inconsistencies
- Linting catches potential issues before commit
- Type checking ensures type safety

### 3. Efficiency

- Pre-commit hooks run automatically
- Interactive commit tool guides message creation
- VS Code integration provides real-time feedback

### 4. Professional Standards

- Conventional commits make changelog generation easy
- Consistent formatting improves code readability
- Professional commit history for future collaboration

## 🔄 Workflow Integration

### VS Code Integration

The `.vscode/settings.json` file provides:

- Format on save
- ESLint auto-fix on save
- TypeScript import preferences
- Tailwind CSS support

### IDE Support

- **VS Code**: Full integration with Prettier and ESLint
- **WebStorm**: Compatible with all tools
- **Vim/Neovim**: Works with any editor that supports Prettier/ESLint

## 🚨 Troubleshooting

### Common Issues

#### Prettier conflicts with ESLint

- Both tools are configured to work together
- Prettier handles formatting, ESLint handles code quality
- `lint-staged` runs them in the correct order

#### Commit message rejected

- Use `npm run commit` for guided message creation
- Follow the conventional commit format
- Check `COMMIT_GUIDELINES.md` for examples

#### Hooks not running

- Ensure hooks are executable: `chmod +x .husky/*`
- Verify Husky is installed: `npx husky --version`
- Check Git hooks directory: `ls -la .git/hooks/`

### Reset Everything

```bash
# Remove all hooks and reinstall
rm -rf .husky node_modules package-lock.json
npm install
npx husky init
chmod +x .husky/pre-commit .husky/commit-msg
```

## 📚 Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Documentation](https://eslint.org/docs/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitizen Documentation](https://commitizen.github.io/cz-cli/)

---

**Last updated**: 2024-12-19
