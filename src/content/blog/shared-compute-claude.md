---
author: Danielle Heberling
title: Getting Claude Code off my laptop and onto shared compute
pubDatetime: 2026-05-23T10:12:03.284Z
description: A story about an imperfect solution to a problem
tags: ["aws", "ai", "devops", "claude", "cloudformation"]
---

Running Claude Code on my own machine was easy. Getting it onto shared compute my whole team could trigger was the hard part. There's plenty written about the local side. A lot less about the team side.

I made that move because of how a broken deploy plays out for us. I'm the only DevOps engineer on my team. A CloudFormation deploy fails. A Slack notification fires. And more often than not, someone pings me to ask what went wrong.

I get why. AWS isn't everyone's day to day, and a `CREATE_FAILED` event with a rollback behind it isn't the friendliest thing to read. The pings weren't the real problem, though. A broken deploy that hinges on one person doesn't scale.

So I decided to build my way out of it. I'd give the team a starting point on a broken deploy without pinging me. It wouldn't fix the problem, but it'd tell them what broke and where to start.

## What I built

Most of my time went to building the wrapper around the model. The prompt, the MCP config, the plumbing to run it on shared compute.

The result is a tool I'm calling the cfn-investigator. I put a thinned down version on GitHub as [headless-claude-on-aws](https://github.com/deeheber/headless-claude-on-aws). It's narrowed to CloudFormation only and meant as a jumping-off point, not a copy of what I run at work. Same idea, rebuilt from scratch. It's close enough that you could follow it, learn from it, or fork it as a base.

The shape is small. It's a CodeBuild project that runs Claude Code headlessly. You hand it a failing stack name, optionally with the commit you suspect. It reads the stack state through the AWS MCP server with a read only role, works out the likely cause, and writes a short analysis. The example logs it to CloudWatch with a one line spot to forward it anywhere. Mine posts it in the Slack thread where the alert fired, right under the question.

One design choice worth calling out is how it handles confidence. The system prompt tells it to be honest, including an "unsure" option that ranks hypotheses instead of inventing a clean answer. A ranked shortlist beats a confident wrong guess.

## Why it looks the way it does

It is not "best practice."

I picked CodeBuild over Lambda or Fargate, and handed Claude Code an Anthropic API key instead of routing through Bedrock. None were textbook choices. They got me to a working prototype fastest. CodeBuild matched the job. Clone the source, run a script, post the result somewhere. That's what the investigator does. The rest of the reasoning, including why I skipped Bedrock, is in the README.

If I'm being real, the biggest factor was knowing I'd be the only one responsible for this. So I optimized for two things, shipping something that worked and keeping it boring enough to maintain alone. Fancy was a liability. That's an engineering trade-off, not an accident.

## The imperfect but working part

This is the part I actually care about.

The repo is a monstrosity of YAML and bash. The IAM is broader than it should be (it uses AWS managed `ReadOnlyAccess`, which you'd want to scope down). The tools get installed fresh on every run instead of baked into an image. The two role split scopes the MCP server's AWS calls, not Claude itself.

And it works. A broken deploy comes with a starting point attached now, so the next move doesn't wait on one person.

In my opinion we've gotten a little precious about reference architectures. There's a strong pull to wait until you can build the clean, fully managed, perfectly scoped version. But the clean version often doesn't exist yet, or isn't mature, or would take three times as long to ship. Meanwhile the messy version that you actually understand and can keep running yourself is sitting right there, solving the real problem today.

## What you might want instead

The reason I had to write all that YAML is that the managed options either didn't exist or weren't mature when I started.

That's changed. Before I write more YAML next time, I want to look at [Claude on AWS](https://aws.amazon.com/about-aws/whats-new/2026/05/claude-platform-aws/), [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview), and the [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview). Any of those would let you skip most of the plumbing I built by hand. I haven't used them for real yet, so I can't tell you how they hold up, but they're the first place I'd look now.

I'm sharing my version for the cases where the managed path isn't a fit, and as a concrete example you can pull apart.

## Take a look

The code is up at [github.com/deeheber/headless-claude-on-aws](https://github.com/deeheber/headless-claude-on-aws). The README walks through deploying it, populating the secrets, and kicking off a run.

If you build something like this, I'd love to hear how it went. Especially the parts that didn't work.
