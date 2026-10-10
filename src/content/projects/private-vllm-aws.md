---
title: "Running an open-weight model on AWS"
order: 2
summary: "I deployed vLLM on a GPU instance with CloudFormation and connected through Session Manager. Running a model for my own coding workflow taught me about the costs and limitations."
---

<a href="https://github.com/deeheber/private-vllm-aws" target="_blank" rel="noopener noreferrer">Repository</a> · <a href="https://github.com/deeheber/private-vllm-aws/blob/main/docs/deployment.md" target="_blank" rel="noopener noreferrer">Deployment guide</a>

I wanted to learn what it takes to run an open-weight model on AWS for my own coding workflow, including the infrastructure and costs of running it myself.

<details>
<summary>Read more</summary>

<h3>What I built and why</h3>

The starting point was one GPU instance running vLLM in Docker, deployed with CloudFormation. I connect from my laptop through an AWS Systems Manager Session Manager port-forwarding tunnel. The instance has no public IP or inbound security group rules, and inference stays inside my AWS account.

I chose vLLM partly because I wanted a container-based setup. One container on a GPU instance works for my own experiments. If a team depended on it, I'd look at ECS Managed Instances to manage it as a shared service. vLLM also provides the APIs my coding clients need and can serve concurrent requests against one copy of the model. For just experimenting on a single VM, running Ollama would have been easier.

<h3>Tradeoffs and lessons</h3>

I focused on getting the workflow working before choosing a final model. The default is gpt-oss-20b, and the project README notes noticeably weaker results than hosted Claude on multi-step tasks, especially with this default.

Even On-Demand GPU capacity was hard to find in the US regions I tried. I wanted to stay in North America for latency, but Canadian regions didn't offer the instance types I needed at the time. I'd love to see enough capacity to make this reliable for everyday use.

And stopping the GPU doesn't stop every charge: the network and storage still cost money while those resources exist.

<h3>What I'd do next</h3>

If I extended this into something a team depended on, I'd evaluate it against real coding tasks first.

</details>
