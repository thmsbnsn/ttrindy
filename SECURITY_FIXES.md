# Security Vulnerabilities - Fix Guide

## Current Status

The project has security vulnerabilities detected by `npm audit`. Here's how to address them:

## Non-Breaking Fixes (Safe)

Run this first to fix issues that don't require breaking changes:
```bash
npm audit fix
```

This should fix:
- `path-to-regexp` (high severity)
- `undici` vulnerabilities (moderate)

## Breaking Changes (Requires Care)

### 1. esbuild Vulnerability
- **Affects**: `vite` and `@vercel/node`
- **Fix**: Would require upgrading to `vite@7.2.2` (breaking change)
- **Action**: Consider updating Vite when ready for a major version upgrade

### 2. js-yaml and prismjs Vulnerabilities
- **Affects**: `sanity` package
- **Fix**: Would require upgrading to `sanity@4.15.0` (breaking change)
- **Action**: Test thoroughly before upgrading Sanity

## Recommended Approach

1. **Immediate**: Run `npm audit fix` for safe fixes
2. **Short-term**: Monitor and plan for major version upgrades
3. **Before Production**: Address all high-severity vulnerabilities

## Manual Updates (If Needed)

If `npm audit fix` doesn't resolve everything:

```bash
# Update Vite (breaking change - test thoroughly)
npm install vite@latest

# Update Sanity (breaking change - test thoroughly)
npm install sanity@latest

# Update other packages
npm update
```

## Notes

- Development environment vulnerabilities are less critical than production
- Some vulnerabilities only affect development servers (like esbuild)
- Always test thoroughly after major version upgrades
- Consider using `npm audit fix --force` only after testing in a separate branch

