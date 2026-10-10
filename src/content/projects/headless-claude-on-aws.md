---
title: "Getting Claude Code onto shared compute"
order: 1
summary: "Developers shouldn’t have to wait for me to troubleshoot failed deploys. I built cfn-investigator with Claude Code, CodeBuild, and AWS MCP to help them investigate CloudFormation failures."
---

<a href="https://github.com/deeheber/headless-claude-on-aws" target="_blank" rel="noopener noreferrer">Repository</a> · [Getting Claude Code off my laptop and onto shared compute](/blog/headless-claude-on-aws/)

When a CloudFormation deploy failed, someone usually messaged me to ask what went wrong. AWS isn't everyone's day to day, but troubleshooting that depends on one person doesn't scale. I wanted developers to get a starting point without waiting for me.

<details>
<summary>Read more</summary>

<h3>What I built and why</h3>

I built cfn-investigator to run Claude Code headlessly on shared compute. The public repository is a simplified example, rebuilt from scratch and narrowed to CloudFormation. Give it a failing stack name and, optionally, a suspected commit. It reads stack state through the AWS MCP server and writes an analysis to CloudWatch Logs. There's a place to add forwarding to Slack or another destination.

I chose CodeBuild because the job fit: clone source, run a script, and post the result somewhere. It gave me the shell tools and logging I needed without building a Lambda container or setting up Fargate networking. I used an Anthropic API key to avoid <a href="https://www.proactiveops.io/archive/amazon-bedrock-leaves-builders-stuck-in-1st-gear/" target="_blank" rel="noopener noreferrer">the limitations of running Claude through Bedrock</a>. I was optimizing for a working prototype I could maintain alone.

<h3>Tradeoffs and lessons</h3>

There are compromises. AWS-managed `ReadOnlyAccess` is broader than this tool needs, and the tools are installed fresh on every run. The two-role split limits AWS calls through MCP; it doesn't sandbox Claude, which can still access the build role's credentials.

The useful result was giving someone enough context to take the next step. In the original implementation, the investigator identified a missing environment variable on a Fargate task definition. The developer added it and redeployed without needing to message me. The prompt also allows an “unsure” answer with ranked hypotheses. I'd rather get a useful shortlist than a confident wrong guess.

<h3>What I'd do next</h3>

If I built this again, I'd look at an agent SDK rather than running Claude Code headlessly. I'd want to spend less time on the plumbing around the agent. For a frequently used version of this prototype, I'd also narrow the IAM permissions and bake the tools into an image.

</details>
