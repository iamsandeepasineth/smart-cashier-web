# Repo rename plan: MiniPOS → Smart Cashier

**Status:** Waiting for your approval. Nothing has been renamed yet.

## What gets renamed

| Repo now | New name | Local folder (GitHub Desktop) |
|---|---|---|
| `iamsandeepasineth/mini-pos-releases` (public, installers only) | `smart-cashier-releases` | not cloned |
| `iamsandeepasineth/POS` (app source) | `smart-cashier` | `pos\POS` |
| `iamsandeepasineth/pos-web` (this website) | `smart-cashier-web` | `pos\POS - web` |

## How I'll do it: through your GitHub Desktop sign-in

- **The sign-in.** GitHub Desktop keeps the sign-in for `iamsandeepasineth` in Windows Credential Manager (`GitHub - https://api.github.com/iamsandeepasineth`). I checked that it's there. I didn't open or read it.
- **How it's used.** A short PowerShell script reads that sign-in into memory and calls GitHub's rename API (`PATCH /repos/{owner}/{repo}`). The sign-in is never printed, saved to a file or put in a git remote.
- **No new tools.** You don't need to install `gh` or create a token. Only the `iamsandeepasineth` account is used. The other saved account (`Darkhenrhal`) isn't touched.

## Steps

1. **Commit the current work** (Smart Cashier name, logo and colors) in both repos, so the rename starts from a clean state. *(See question 1.)*
2. **Check before renaming.**
   - The three repos exist and the signed-in account is their admin.
   - None of the three new names are already taken.
3. **Rename the releases repo first.** The website and the next app build already point to `smart-cashier-releases`.
4. **Check that installed shops still get updates.**
   - Installed apps still have `mini-pos-releases` baked in.
   - I'll fetch `github.com/iamsandeepasineth/mini-pos-releases/releases/latest/download/latest.yml` through the old name. It must redirect to the new repo and return v1.1.3's `latest.yml`.
   - **If that check fails, I rename the repo back and stop.**
5. **Rename `POS` → `smart-cashier`, then `pos-web` → `smart-cashier-web`.**
6. **Update the local git remotes** so GitHub Desktop pushes to the new names:
   ```
   POS          git@github.com:iamsandeepasineth/smart-cashier.git
   POS - web    git@github.com:iamsandeepasineth/smart-cashier-web.git
   ```
   GitHub Desktop reads the remote from the repo, so after you press **Fetch origin** it shows the new names. You don't need to remove and re-add anything.
7. **Push** both repos (or you push from GitHub Desktop, see question 1).
8. **Check that everything works:**
   - The website's download button resolves the latest `.exe` from `smart-cashier-releases`.
   - `npm run release:check` passes in the app repo.
   - `git fetch` works in both folders.
   - GitHub Desktop shows both repos with no "repository not found" errors.

## What doesn't change

- **App ID `mini-pos` and data folder `%APPDATA%\pos`:** shops update in place and keep their data.
- **Your Turso databases, the control-plane server and its URL:** these are separate infrastructure, not repos.
- **Old links keep working.** GitHub redirects the old repo URLs to the new names. **Never create a new repo with an old name**, because that breaks the redirect.
- **The CI upload token (`RELEASES_REPO_TOKEN`).** It's linked to the repo itself, not its name, so it keeps working after the rename. I'll confirm this on the next release.

## Undoing it

Each rename can be reversed with the same API call, back to the old name. Local remotes can be switched back with `git remote set-url`.

## Questions

1. **Commit and push:** should I commit to `main` and push, or commit only and let you push from GitHub Desktop? My suggestion: I commit, you push from GitHub Desktop.
2. **Local folder names:** keep `pos\POS` and `pos\POS - web` (my suggestion, nothing breaks), or rename them to `smart-cashier` and `smart-cashier-web`? Renaming means closing GitHub Desktop first, then using **Locate…** on each repo once.
