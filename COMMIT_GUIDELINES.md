# Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for consistent and meaningful commit messages.

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **wip**: Work in progress (for incomplete features)
- **ui**: UI/UX changes
- **db**: Database changes
- **revert**: Reverting a previous commit

## Scopes

Use the component or area of the codebase that's being changed:

- `calendar` - Calendar-related features
- `table` - Data table functionality
- `forms` - Form components and validation
- `api` - API endpoints and data fetching
- `auth` - Authentication and authorization
- `ui` - UI components
- `db` - Database schema and queries
- `deps` - Dependencies

## Examples

### Good Examples

```bash
feat(calendar): add month view toggle
fix(table): resolve sorting issue with date columns
test(forms): add validation tests for entry form
```

## Quick Commits

Use the interactive commit tool:

```bash
npm run commit
```

This will guide you through creating a properly formatted commit message.

## Manual Commits

For manual commits, follow the format:

```bash
git commit -m "feat(calendar): add month view toggle"
git commit -m "fix(table): resolve sorting issue with date columns"
```

## Breaking Changes

For breaking changes, add `!` after the type and include details in the body:

```bash
feat!(api): change user authentication flow

BREAKING CHANGE: The user authentication API now requires a different token format.
```

## Work in Progress

For incomplete features, use the `wip` type:

```bash
wip(calendar): implement drag and drop functionality
```

This helps track incomplete work and prevents accidental merges.
