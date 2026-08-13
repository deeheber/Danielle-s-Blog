---
title: Not All AI Builders Are Doing the Same Work
author: Danielle Heberling
pubDatetime: 2026-08-13T09:12:03.284Z
description: An opinion on the current landscape of what being a builder looks like in the ever evolving age of AI.
slug: types-of-ai-builders
tags: ["ai", "career", "opinion"]
---

In 2026, nearly everyone I interact with in tech wants to talk about AI. It comes up on LinkedIn, at meetups and conferences, and at work.

A lot of those conversations stay pretty surface-level. Someone says they’re excited about AI or that they’re “building with AI,” but I want to know what they’re building and how they’re doing it.

I’m an engineer. I want the technical details so we can learn from each other’s experiences.

I’ve noticed that “building with AI” can describe three different types of builders. This isn’t a maturity model where one category is automatically better than another. It’s a way to be more specific about what someone is actually doing.

I’ve listed them from most to least common based on my experience.

## 1. The builder who _uses AI to build_

This is by far the most common profile I come across.

These are folks who use AI coding assistants such as Codex or Claude to plan, write, or review code. AI is a tool in their workflow, but it isn’t part of the system they’re creating.

There are also people in traditionally non-engineering roles using the same tools, like product managers, marketers, and customer service teams. Sometimes they use these tools to write code without fully understanding what the code is doing.

My opinion: this is fine for a proof of concept. It can be a quick way to test an idea and learn whether it’s worth pursuing.

It shouldn’t be shipped to production without an engineer who knows what they’re doing reviewing or rebuilding it. Producing something that looks like working software doesn’t make it production-ready.

## 2. The builder who _builds with AI_

This group is less common, but they do exist.

These are often engineers building purpose-specific agents, software factories (automated pipelines that use AI to generate and assemble parts of a product), or applications that use LLM output as part of the product. They might also be experimenting with running local models.

The biggest difference between this group and category 1 is that AI isn’t only helping create the software. AI is part of how the software works.

If you take AI away from something built by category 1, the development process gets slower. If you take it away from something built by category 2, the product loses part of its functionality.

There’s also a less formal test: does the thing keep working when the builder’s laptop goes to sleep?

A local demo can teach you a lot. Deploying an AI-powered system for other people to use introduces different problems. Someone has to think about reliability, cost, and what happens when the model returns something unexpected.

## 3. The builder who _is building AI_

This is the smallest group in my experience.

These are the folks building and training the models themselves. Think AI researchers or engineers at companies like Anthropic and OpenAI who work on the models and supporting tools used by millions of people. Their day-to-day looks less like shipping product features and more like running training experiments, evaluating model behavior, and building the infrastructure other builders eventually rely on.

## Where I fall

My work currently spans categories 1 and 2. I use AI assistants for regular engineering work, but I’m especially interested in building systems where AI is part of how the product works.

At work, I built a tool that uses Claude Code to help developers investigate failed CloudFormation deployments. It runs on shared compute and posts its analysis in Slack, so the team can use it without my laptop or me being available.

That’s what category 2 looks like to me. AI isn’t only helping me build the tool. AI is part of how the tool works.

I wrote more about the architecture and its imperfect parts in [Getting Claude Code off my laptop and onto shared compute](https://danielleheberling.xyz/blog/headless-claude-on-aws/).

## Prediction

Okay, bold prediction time! Keep in mind that this post was written in 2026, and I’m fine with it not aging well.

I think category 1 will stick around, but those builders won’t be as in demand. Knowing how to use an AI coding assistant won’t give someone much of an advantage when everyone has access to the same tools.

To be clear, I’m not saying every engineer in category 1 is in trouble. Plenty of experienced engineers use AI while still understanding the systems they’re responsible for.

I’m talking about the folks whose main skill is getting an AI tool to produce something that looks right.

Those builders will probably still find jobs, but I think they’ll have fewer choices. This will be especially true for the engineering teams they’d actually want to work at. The people with more options will be able to tell when the AI is wrong, fix what it produced, and own the result when it reaches production.

I also think builders in categories 2 and 3 will have more options. They’re creating the systems and capabilities that everyone else is using. That requires more than knowing how to prompt a tool.

## Closing

The next time someone tells me they’re building with AI, I’m going to ask what they mean.

Are you using AI to build, building with AI, or building AI?

Where do you think you fall today?
