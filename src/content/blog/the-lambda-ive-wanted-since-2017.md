---
author: Danielle Heberling
title: The Lambda I've wanted since 2017
pubDatetime: 2026-11-01T08:00:00Z
draft: false
description: Trying Lambda Web Functions with a small TypeScript and Express app.
tags: ["aws", "serverless"]
---

Since 2017, I've wanted to run a regular web app on Lambda: use a familiar framework, start the HTTP server, and let Lambda handle scaling, including down to zero when nobody's using it. Services like Fargate already let me run a conventional web app on managed compute. The appeal here is getting Lambda's scaling behavior without needing an adapter.

I built a small <a href="https://github.com/deeheber/lambda-web-functions" target="_blank" rel="noopener noreferrer">TypeScript and Express project</a> to try out <a href="https://docs.aws.amazon.com/lambda/latest/dg/web-functions.html" target="_blank" rel="noopener noreferrer">Lambda Web Functions</a>. I wanted something small enough to learn from, with a foundation I could build on for more complex projects.

## What's different?

The Lambda most of us know takes an event, runs a handler, and returns a result. AWS now calls these Event Functions. Web Functions run an HTTP server directly, so I can use Express without an adapter. The app starts with `app.listen()` and handles requests like it would locally.

I don't need API Gateway for this app either. Lambda Function URLs already made that possible, so that part isn't new.

One execution environment can also handle multiple requests concurrently, rather than the traditional model's one invocation at a time per environment. Those requests share a process, so I still need to keep user-specific state out of global variables.

Web Functions currently support Node.js and scale automatically, including to zero when idle. Limits and cold starts still apply. I'd still use Event Functions for queue messages or S3 events.

## What I built

The repo uses Express 5, TypeScript, and AWS Serverless Application Model (SAM). The template creates two Web Functions running the same code so I can try both endpoint authentication options.

One uses `IamAuth`, where Lambda checks signed AWS requests before they reach Express. The other uses `ApplicationManaged`, where my application validates Cognito access tokens. The <a href="https://docs.aws.amazon.com/lambda/latest/dg/web-functions-endpoint-access-control.html" target="_blank" rel="noopener noreferrer">AWS access control guide</a> explains both options.

Both functions expose three routes:

- `/health` returns a status response.
- `/whoami` returns authentication context and process information so I can inspect environment reuse.
- `/stream` sends numbered server-sent events at an interval so I can check that responses arrive incrementally.

Locally, I can start the server and test the routes like any other Express app. I still need deployed tests for AWS-specific behavior, especially IAM authentication.

## What I haven't tried yet

As of November 1, 2026, I haven't benchmarked it, tested production load, or compared costs.

Web Functions charge for active CPU time, memory over the lifetime of an execution environment, requests, and data transfer. Waiting on a database or external API can use little CPU, but memory charges continue. Whether that costs less depends on the workload. The <a href="https://docs.aws.amazon.com/lambda/latest/dg/web-functions.html" target="_blank" rel="noopener noreferrer">AWS documentation</a> explains those billing components.

I've left <a href="https://github.com/deeheber/lambda-web-functions#future-experiments" target="_blank" rel="noopener noreferrer">issues in the repo</a> for canary deployments, Multi-Region endpoints, VPC access, and CloudFront with origin access control.

CloudFront with a custom domain is probably where I'd go next.
