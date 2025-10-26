# Danielle's Blog

A modern, fast blog built with Astro and React. PRs welcome - especially if you spot my typos!

## 📋 Table of Contents

- [Demo](#-demo)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Customization](#-customization)
- [Available Commands](#️-available-commands)
- [Tech Stack](#-tech-stack)

## 🎬 Demo

Check out the live site: https://danielleheberling.xyz/

## 📦 Prerequisites

**Node.js** - See `.nvmrc` file for required version

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Your blog will be running at `localhost:4321`

## ⚙️ Customization

### Site Configuration

Update the `src/config.ts` file to customize:

- Site metadata (title, description, author)
- Social media links
- Logo settings
- Locale settings

### Blog Posts

- All blog posts are stored in `src/content/blog` directory
- Add Posts - [markdown](src/content/blog/adding-new-post.md)

### Talks

Update the `speakingData.json` file in `src/data` directory

## 🎖️ Available Commands

All commands are run from the root of the project, from a terminal:

> **_Note!_** For `Docker` commands we must have it [installed](https://docs.docker.com/engine/install/) in your machine.

| Command                              | Action                                                                                                                           |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `npm install`                        | Installs dependencies                                                                                                            |
| `npm run dev`                        | Starts local dev server at `localhost:4321`                                                                                      |
| `npm run build`                      | Build your production site to `./dist/`                                                                                          |
| `npm run preview`                    | Preview your build locally, before deploying                                                                                     |
| `npm run format:check`               | Check code format with Prettier                                                                                                  |
| `npm run format`                     | Format codes with Prettier                                                                                                       |
| `npm run sync`                       | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `npm run lint`                       | Lint with ESLint                                                                                                                 |
| `npm run lint:check`                 | Check code linting with ESLint                                                                                                   |
| `npm run type-check`                 | Run TypeScript type checking without emitting files                                                                              |
| `docker compose up -d`               | Run on docker, You can access with the same hostname and port informed on `dev` command.                                         |
| `docker compose run app npm install` | You can run any command above into the docker container.                                                                         |

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://reactjs.org/)  
**Styling** - [TailwindCSS](https://tailwindcss.com/)  
**Fuzzy Search** - [FuseJS](https://fusejs.io/)  
**Code Formatting** - [Prettier](https://prettier.io/)
**Linting** - [ESLint](https://eslint.org)
**Deployment** - [Cloudflare Pages](https://pages.cloudflare.com/)
