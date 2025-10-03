#!/bin/bash

# Setup Git Hooks for Development
echo "🔧 Setting up Git hooks and development tools..."

# Make sure we're in the project root
cd "$(dirname "$0")/.."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Initialize Husky if not already done
if [ ! -d ".husky" ]; then
    echo "🐕 Initializing Husky..."
    npx husky init
fi

# Make sure hooks are executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg

# Run initial formatting
echo "🎨 Running initial code formatting..."
npm run format

echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run commit    - Interactive commit with conventional format"
echo "  npm run format    - Format all code with Prettier"
echo "  npm run lint      - Run ESLint"
echo "  npm run lint:fix  - Fix ESLint issues automatically"
echo "  npm run type-check - Run TypeScript type checking"
echo ""
echo "Git hooks are now active:"
echo "  - Pre-commit: Runs linting and formatting on staged files"
echo "  - Commit-msg: Validates commit message format"
echo ""
echo "See COMMIT_GUIDELINES.md for commit message standards."