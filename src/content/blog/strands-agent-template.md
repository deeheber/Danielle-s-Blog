---
author: Danielle Heberling
title: A Strands Agent Template (For the Impatient)
pubDatetime: 2026-01-19T10:12:03.284Z
description: A Template for Deploying Strands Agents on AWS
---

Ever since AWS announced <a href="https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html" target="_blank" rel="noopener noreferrer">Bedrock AgentCore Runtime</a> back in July 2025, I've been experimenting with deploying agents to production. The hype around "agentic AI" is everywhere, but most examples I found were either too simple or way too complex for what I actually needed.

Here's what I wanted 👉 a way to go from zero to a deployed agent on AWS without spending three days on infrastructure setup. So I built a template that does exactly that.

## What I Built

The <a href="https://github.com/deeheber/strands-agent-template" target="_blank" rel="noopener noreferrer">strands-agent-template</a> repo is a GitHub template that gives you everything you need to deploy a <a href="https://strandsagents.com/latest/" target="_blank" rel="noopener noreferrer">Strands agent</a> to AWS Bedrock AgentCore Runtime. Click "Use this template" and you're most of the way there.

What's included:

- ✅ Production-ready CDK infrastructure with IAM, logging, and tracing
- ✅ Local development setup so you can test before deploying
- ✅ GitHub Actions for CI/CD
- ✅ OpenTelemetry observability built in
- ✅ Testing, linting, and formatting configured

## Why Python + TypeScript?

I went with Python for the agent code and TypeScript for infrastructure. This isn't because I love context switching (I don't), but because each framework is strongest in its native language. Strands has great Python support and documentation, while CDK is cleanest in TypeScript.

As these frameworks mature, I might consolidate to one language. But for now, this combo gives you access to the best libraries and examples for both.

## Quick Start

If you just want to see it work after setting up the AWS CLI and configuring credentials:

```bash
# Test locally
cd agent && source .venv/bin/activate && python src/agentcore_app.py
# Test in another terminal
curl -X POST http://localhost:8080/invocations -H "Content-Type: application/json" -d '{"prompt": "What is 42 * 137?"}'
# Deploy to AWS
cd cdk && npm install && npm run build && npm run cdk:deploy
```

The template comes with a basic example agent. Replace it with your own logic and you're done. Under 10 minutes from clone to deployed.

## What You Actually Get

Here's what stood out to me after using this in a few projects.

1. **Local testing that doesn't lie.** You can run your agent locally before deploying anything to AWS. This matters more than you'd think. I've wasted too much time debugging issues that only showed up after deployment.

2. **Observability without the extra work.** CloudWatch logs and OpenTelemetry tracing are configured out of the box. When something breaks (and it will), you can actually figure out why.

3. **CI/CD that works.** GitHub Actions run your tests on every push. Both Python and TypeScript tooling is configured. It catches the obvious stuff before you deploy.

## If You're Just Getting Started

If this is your first time deploying an agent to AWS, here's what I'd focus on:

- Start by running the example locally. Don't deploy anything yet. Get familiar with how Strands agents work.
- Then make a tiny change to the agent logic. See how it behaves. Break something on purpose and watch what happens.
- Only then deploy to AWS. Use the CloudWatch dashboard to see what your agent is actually doing.

The template includes detailed deployment docs in the DEPLOYMENT.md file. I tried to write them for someone who hasn't used CDK or AgentCore before.

## What's Next

I'm actively using this template for a few projects, so it'll keep evolving based on what I learn. If you find gaps or have suggestions, open an issue or submit a PR. The CONTRIBUTING.md file has guidelines.

This is meant to be a starting point, not a finished product. Take it, modify it, make it yours.

You can find the template on <a href="https://github.com/deeheber/strands-agent-template" target="_blank" rel="noopener noreferrer">GitHub</a>.

Let me know if you use it. I'm curious what works and what doesn't for other folks trying to deploy agents on AWS.

&nbsp;
