---
author: Danielle Heberling
pubDatetime: 2026-03-31T15:12:03.284Z
title: I Built a Bookmarklet for Hillsboro Hops Fans
description: A browser bookmarklet that exports Hillsboro Hops games to your calendar
tags: ["javascript", "community", "tutorial"]
---

Ever since I became a <a href="https://www.milb.com/hillsboro" target="_blank" rel="noopener noreferrer">Hillsboro Hops</a> season ticket holder, I've been manually adding each game to my calendar so I don't accidentally book something on a game night. Manually entering dates and times is error prone, and I've definitely shown up to a game an hour late because I typed something wrong.

The ticket site lets you manage, swap, and forward tickets but has no way to export your games to a calendar. So I built one.

## What's a bookmarklet?

A bookmarklet is a bookmark that runs JavaScript instead of opening a URL. You save it to your browser's bookmark bar once, navigate to a specific page, click it, and it does something useful without installing anything.

## What this one does

Log into the Hops ticket site, go to your ticket inventory, select all months, and click the bookmark. It reads your ticket page, builds a `.ics` file from your game events, and downloads it. Then you import it into Apple Calendar, Google Calendar, Outlook, or anything that supports `.ics` files. The whole thing runs in your browser with no server, no account, nothing leaving your machine.

## One thing worth knowing

This works by reading the structure of the ticket page. If mlb.tickets.com ever redesigns it, the bookmarklet will likely break. I've got a note about that in the repo and I'm happy to update it if it happens. Just <a href="https://github.com/deeheber/hillsboro-hops-game-calendar/issues" target="_blank" rel="noopener noreferrer">open an issue</a>.

The code is open source <a href="https://github.com/deeheber/hillsboro-hops-game-calendar" target="_blank" rel="noopener noreferrer">on GitHub</a>.

Opening day is April 7. Let's go Hops ⚾️

![Mascot Barley at the ballpark](/assets/barley-hop.jpeg)
