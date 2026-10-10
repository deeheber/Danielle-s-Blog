---
author: Danielle Heberling
pubDatetime: 2023-07-17T22:10:03.284Z
title: My Personal Blog Site's CI/CD
description: My Personal Blog Site's CI/CD
slug: blog-ci-cd
tags: ["devops", "tutorial"]
---

![Tools](/assets/tools.jpg)

> Photo by <a href="https://unsplash.com/@dancristianpaduret?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Dan Cristian Pădureț</a> on <a href="https://unsplash.com/photos/XC7lc8biINg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Unsplash</a>

## Goals

In 2018, I set out to create [this blog](https://www.danielleheberling.xyz/). <a href="https://medium.com/" target="_blank" rel="noopener noreferrer">Medium</a> and other blogging platforms existed; however, I wanted to have more control and ownership of my content. To me, it's fine to syndicate blog blog to other places for more reach, but I wanted my own space on the internet.

I also had the other following goals in mind:

1. Low maintence
2. Low cost (or free)
3. Use technology that I wanted to learn
4. Write blog blog in a transferrable format, such as markdown

## Tech Choices

In 2018, the hype of <a href="https://jamstack.org/" target="_blank" rel="noopener noreferrer">JAMstack</a> and <a href="https://www.gatsbyjs.com/" target="_blank" rel="noopener noreferrer">Gatsby</a> was in the air. Upon taking a closer look at Gatsby, I learned that it utilized <a href="https://graphql.org/" target="_blank" rel="noopener noreferrer">GraphQL</a> (tech I didn't know at the time and wanted to learn), <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a>, and blog blog were written in markdown. After choosing Gatsby, I did some searching for the easiest way to deploy it and landed on <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>.

To this day, my blog is still Gatsby hosted on Netlify and you <a href="https://github.com/deeheber/danielle-heberling-dot-xyz" target="_blank" rel="noopener noreferrer">can view the code source on GitHub</a>.

## Implementation

### CI/CD

When a new site is created on Netlify, you can <a href="https://docs.netlify.com/configure-builds/repo-permissions-linking/#link-a-git-repository" target="_blank" rel="noopener noreferrer">link it to a GitHub repository</a>. You then have the options to set up CI/CD to perform build, deploys, or previews whenever you push or merge to a specified branch.

For my site, I decided to keep it simple and stuck with the defaults. Whenever I put up a Pull Request against the `main` branch, Netlify runs a build and gives me a preview link to view the site with changes. Whenever I merge into the `main` branch, Netlify builds and deploys my site for me.

### Linking the deploy to updating my README

Later in my journey, I wanted to learn about <a href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer">GitHub actions</a> and built an action that pulls the three most recent blog blog down from my blog's RSS feed (included with Gatsby) and writes them to the markdown file in my <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme" target="_blank" rel="noopener noreferrer">profile README repo</a>. You can read about the process of creating it in [my past blog post](https://www.danielleheberling.xyz/blog/github-actions/).

A feature that I wanted was a connection between deploying my blog to prod and having the GitHub action scrape my RSS feed to update my README file. In the past, I had it running as a recurring Cron job, but I wanted something that would have a guarantee of the latest three blog blog being up to date. I had looked into using Netlify's <a href="https://docs.netlify.com/site-deploys/notifications/#outgoing-webhooks" target="_blank" rel="noopener noreferrer">outgoing webhook feature</a>, but found it to be challenging to customize the POST request to match what was needed to trigger a GitHub action.

I realized that I always wait for the Netlify deploy to prod to complete, manually check the site, and delete the branch...so I decided to utilize the branch deletion action to trigger the scrape of the RSS feed to update my README repo. I then discovered that the GitHub action <a href="https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#triggering-a-workflow-from-a-workflow" target="_blank" rel="noopener noreferrer">repository_dispatch</a> would be helpful in triggering the scrape of my RSS feed on branch delete.

I first created a token to save as a secret in my `danielle-heberling-dot-xyz` (blog) repository that gave it read/write permissions to my `deeheber` (README) repository. I then added a workflow to my `danielle-heberling-dot-xyz` repo to post an event to my `deeheber` repo via `repository_dispatch`. It looks like this:

```yaml
name: alert README repo of changes on main

on:
  workflow_dispatch:
  # Runs on git reference deletion (branch or tag)
  delete:

jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Update README in deeheber/deeheber repo
        run: |
          curl -H "Accept: application/vnd.github.everest-preview+json" \
          -H "Authorization: token ${{ secrets.DISPATCH_TOKEN }}" \
          --request POST \
          --data '{"event_type": "scrape", "client_payload": {"ref": "${{ github.ref }}"}' https://api.github.com/repos/deeheber/deeheber/dispatches
```

I noticed there were some pre-made actions that can do this for me, but I decided that since this is a simple `POST` request that I can do this via `curl` without the extra dependency of a 3rd party maintained GitHub action.

Then on the receiving repo (`deeheber`), I added an action to listen for that `scrape` `event_type` to trigger scraping my RSS feed and writing the three most recent blog blog/links to the `README` file. The `on` section is the only part that I had to change for this to work:

```yaml
name: Build README

on:
  workflow_dispatch:
  repository_dispatch:
    types: [scrape]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repo
        uses: actions/checkout@v3
      - name: Use Node
        uses: actions/setup-node@v3
        with:
          node-version: "18.x"
      - name: Install node dependencies
        run: npm install
      - name: Check for RSS feed updates
        run: npm run scrape
      - name: Commit and push
        run: |-
          git diff
          git config --global user.email "actions@users.noreply.github.com"
          git config --global user.name "README-bot"
          git add -A
          git commit -m "Update content" || git commit --allow-empty -m "Empty commit"
          git push
```

On both actions, I decided to keep the <a href="https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow" target="_blank" rel="noopener noreferrer">workflow_dispatch</a> event in place, so I could manually run these workflows.

## Closing

There are many different ways that I could've accomplished this, but this is what I ended up implementing. It is not perfect, but more than good enough for a personal blog site in my opinion.

Since I'm already using Netlify for hosting, I figured it was easiest to utilize their built in CI/CD services. I could've spent time rolling this myself using various AWS services or other things, but I wanted something that I didn't need to spend that much time on with the initial setup and/or maintence.

Thank you to Netlify, Gatsby, and GitHub for having a very permissive free tier that enables me to keep my blog up and running. I only need to pay for my custom domain name (danielleheberling.xyz) in order to keep things running.

> Edit October 8, 2023:
> Sadly Netlify is amongst the many tech companies <a href="https://www.netlify.com/blog/ceo-announcement-to-the-netlify-team/" target="_blank" rel="noopener noreferrer">that laid off a lot of employees</a> including folks on the Gatsby team. My thoughts are with those who lost their jobs. I hope they find new opportunities soon. I'm not sure what this means for the future of Netlify and Gatsby, but I hope they can continue to provide a great service to their customers. Time will tell.

> Edit July 8, 2024
> Update: The blog website mentioned in this post has been retired. It has been rebuilt using Astro and deployed to Cloudflare Pages.
