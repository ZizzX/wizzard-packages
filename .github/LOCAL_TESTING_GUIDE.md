# 🧪 Local Package Testing Guide

This guide explains how to test packages locally before publishing to npm.

## 📋 Prerequisites

- pnpm installed
- Node.js 20+
- Repository cloned and dependencies installed

## 🚀 Quick Start

### Method 1: Test in Monorepo Demos (Fastest)

The easiest way to test changes is using the existing demo applications:

```bash
# Build all packages
pnpm -r build

# Run React demo (port 5173)
cd examples/demo
pnpm dev

# Run Vue demo (port 5174)
cd examples/vue-demo
pnpm dev
```

**Pros**: Instant feedback, no setup required, uses `workspace:*` protocol  
**Cons**: Tests workspace version, not the exact npm package artifact

---

### Method 2: Test with `pnpm pack` (Recommended for Release Validation)

This creates a `.tgz` tarball identical to what would be published to npm.

#### Step 1: Build the package

```bash
pnpm -r build
```

#### Step 2: Create tarball

```bash
cd packages/vue  # or any package you want to test
pnpm pack
```

This creates `wizzard-packages-vue-<version>.tgz` in the package directory.

#### Step 3: Create test project

```bash
# Outside the monorepo
cd ..
mkdir test-local-install
cd test-local-install
npm init -y
```

#### Step 4: Install from tarball

```bash
npm install ../wizzard-packages/packages/vue/wizzard-packages-vue-0.2.1.tgz
```

Or with pnpm:

```bash
pnpm add ../wizzard-packages/packages/vue/wizzard-packages-vue-0.2.1.tgz
```

#### Step 5: Verify installation

Create `test.mjs`:

```javascript
import * as vue from '@wizzard-packages/vue';

console.log('✅ Package loaded!');
console.log('📦 Exports:', Object.keys(vue));

// Test specific exports
const { useProvideWizard, useWizardActions, createWizardFactory } = vue;
console.log('✅ Core exports present:', {
  useProvideWizard: typeof useProvideWizard,
  useWizardActions: typeof useWizardActions,
  createWizardFactory: typeof createWizardFactory
});
```

Run:

```bash
node test.mjs
```

#### Step 6: Test TypeScript types

```bash
npm install -D typescript

# Create test.ts
cat > test.ts << 'EOF'
import { createWizardFactory, useWizardActions } from '@wizzard-packages/vue';

interface MySchema {
  name: string;
  email: string;
}

const { useWizardValue } = createWizardFactory<MySchema>();
console.log('✅ Types are valid');
EOF

# Check types
npx tsc --noEmit --esModuleInterop --skipLibCheck test.ts
```

**Pros**: Tests exact artifact that would be published, catches packaging issues  
**Cons**: Requires manual setup, slower iteration

---

### Method 3: Test with `pnpm link` (For Cross-Package Development)

Use when developing multiple packages and need live updates.

#### Link the package

```bash
cd packages/vue
pnpm link --global
```

#### Use in another project

```bash
cd /path/to/your/test/project
pnpm link --global @wizzard-packages/vue
```

#### Unlink when done

```bash
pnpm unlink --global @wizzard-packages/vue
```

**Pros**: Live updates during development  
**Cons**: Symlink issues on some systems, not identical to npm install

---

## ✅ Verification Checklist

Before publishing, verify:

- [ ] Package builds without errors: `pnpm build`
- [ ] All tests pass: `pnpm test:run`
- [ ] Types compile: `pnpm type-check` (if available)
- [ ] Tarball size is reasonable: `ls -lh *.tgz`
- [ ] All exports are accessible: Test with `test.mjs`
- [ ] TypeScript types work: Test with `test.ts`
- [ ] Peer dependencies are correct in `package.json`
- [ ] README and CHANGELOG are up to date
- [ ] `package.json` `files` field includes all necessary files
- [ ] `exports` field is correctly configured

---

## 🔍 Inspecting Package Contents

### View tarball contents without extracting

```bash
tar -tzf wizzard-packages-vue-0.2.1.tgz
```

### Extract tarball to inspect

```bash
tar -xzf wizzard-packages-vue-0.2.1.tgz
cd package
ls -la
```

### Check package size breakdown

```bash
du -sh dist/*
```

---

## 🐛 Common Issues

### Issue: Missing files in tarball

**Cause**: `files` field in `package.json` doesn't include them

**Fix**: Update `package.json`:

```json
{
  "files": ["dist", "README.md", "CHANGELOG.md"]
}
```

### Issue: Types not found

**Cause**: `types` or `exports.types` field incorrect

**Fix**: Ensure `package.json` has:

```json
{
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

### Issue: Dependencies not installed

**Cause**: Missing or incorrect `dependencies`/`peerDependencies`

**Fix**: 
- Move runtime deps to `dependencies`
- Move framework deps (vue, react) to `peerDependencies`
- Move build tools to `devDependencies`

---

## 📦 Testing Multiple Packages

To test packages with local dependencies:

```bash
# Pack all dependencies first
cd packages/core
pnpm pack

cd ../middleware
pnpm pack

cd ../vue
pnpm pack

# Install in test project with all local tarballs
cd ../../test-project
npm install \
  ../wizzard-packages/packages/core/wizzard-packages-core-*.tgz \
  ../wizzard-packages/packages/middleware/wizzard-packages-middleware-*.tgz \
  ../wizzard-packages/packages/vue/wizzard-packages-vue-*.tgz
```

---

## 🚀 Automated Verification Script

Create `scripts/verify-package.sh`:

```bash
#!/bin/bash
set -e

PACKAGE_DIR=$1
PACKAGE_NAME=$2

echo "🔨 Building package..."
cd "$PACKAGE_DIR"
pnpm build

echo "📦 Creating tarball..."
pnpm pack

echo "🧪 Testing installation..."
TARBALL=$(ls -t *.tgz | head -1)
TEST_DIR=$(mktemp -d)
cd "$TEST_DIR"
npm init -y
npm install "$PACKAGE_DIR/$TARBALL"

echo "✅ Testing imports..."
cat > test.mjs << EOF
import * as pkg from '$PACKAGE_NAME';
console.log('Exports:', Object.keys(pkg));
EOF
node test.mjs

echo "✅ Package verified successfully!"
rm -rf "$TEST_DIR"
```

Usage:

```bash
chmod +x scripts/verify-package.sh
./scripts/verify-package.sh packages/vue @wizzard-packages/vue
```

---

## 📚 Additional Resources

- [npm pack documentation](https://docs.npmjs.com/cli/v10/commands/npm-pack)
- [pnpm pack documentation](https://pnpm.io/cli/pack)
- [Node.js Package Entry Points](https://nodejs.org/api/packages.html#package-entry-points)
- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

---

**Last updated**: January 2025