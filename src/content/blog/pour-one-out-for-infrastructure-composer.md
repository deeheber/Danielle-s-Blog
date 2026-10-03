---
title: Pour one out for Infrastructure Composer
author: Danielle Heberling
pubDatetime: 2026-10-02T12:00:00Z
featured: false
draft: false
description: A personal farewell to Infrastructure Composer, the Stackery journey behind it, and the people who made it matter.
tags: ["aws", "serverless", "career", "opinion"]
---

AWS posted an <a href="https://docs.aws.amazon.com/infrastructure-composer/latest/dg/infrastructure-composer-end-of-support.html" target="_blank" rel="noopener noreferrer">end of support notice</a> for Infrastructure Composer. New sign-ups stop October 29, 2026 and the standalone console goes away on December 7, 2026.

For me it's personal. Part of Infrastructure Composer started as <a href="https://stackery.io" target="_blank" rel="noopener noreferrer">Stackery</a>, where I spent some of the best years of my career helping build what AWS went on to acquire. I was proud then. Still am.

So consider this part eulogy, part celebration, and a little bit of me being bitter. All of it is my personal opinion.

## Surprised, but not surprised

My first reaction to the notice was "huh." My second reaction was "yeah, that tracks."

In my opinion AWS has never been great at helping people actually do serverless. They're excellent at primitives. Wiring it together, getting IAM right, deploying it, knowing what you built once it's running? That's on you. It was clunky when I started, and it's still clunky now.

Plenty of people want to write code or define product. Not many want to go deep on shipping it, and most places run on AWS. That gap is a big part of why I have a job, so I can't complain too loudly.

The way I saw it, Stackery existed to bridge that gap.

## What Stackery actually was

If you never used it, Stackery was a tool for designing, developing, and delivering serverless applications. Those three verbs mattered equally.

- **Design.** A canvas where you dragged out functions, tables, queues, and APIs, and got a real SAM template (CloudFormation with serverless shortcuts) out the other side. The diagram and the template were the same thing.
- **Develop.** The Stackery CLI, with local development via what we called "cloud local" emulation, plus environment management, secrets, and permissions generated correctly instead of hand-rolled.
- **Deliver.** Deployment and CI/CD built in, across environments (each one an AWS account and region), including ephemeral environments for branches and test runs.

We started provider agnostic and ended up going deep on AWS. That's a big part of why I ended up where I am today.

## What drifted, and what's still around

When the AWS version launched, nearly all the hype went to the visualization. Drag a Lambda onto a canvas, get a template. Useful, but it was only one piece of what Stackery did.

There's a sync button in the VS Code toolkit that runs sam sync for you, but the pipeline and team pieces didn't come with it. Nobody promised they would. I just hoped.

After that it mostly sat still. That's what happens when a small product gets absorbed into a big company made up of "two pizza teams" and loses its priority.

The visual authoring piece lives on in the VS Code toolkit, and existing templates and stacks aren't affected.

## The part that was actually worth it

In hindsight, the product was never the important part. The journey was.

I grew more as a professional at Stackery than anywhere else, because I loved what I was doing and the people around it: customers, community, coworkers. Serverless was new, the patterns weren't written down yet, and we figured them out by shipping. Then I got to share it: blogging, speaking, standing at the booth explaining why cold starts mostly don't matter to strangers.

<img src="/assets/stackery-reinvent-2019-badge.jpg" alt="AWS re:Invent 2019 badge for Danielle Heberling of Stackery, Inc., labeled Exhibiting Sponsor Speaker." width="400" />

> My re:Invent 2019 badge from the Stackery days.

And the people. Colleagues who became lifelong friends. Job leads years later from someone I sat next to. My first engineering manager role. Speaking and organizing in the wider tech community. Nearly every good thing in my career since has a thread back to that office.

It's also super cool to say I contributed to something that became an AWS product. Even if it didn't fully reflect what we built. Even if it's reaching end of support.

## It's gone, but the journey goes on

So, pour one out for Infrastructure Composer. It deserved a better steward than it got.

But the problem it was solving is still here. I believe in serverless and managed services as much as I ever did. They're not as easy to implement as the marketing makes them look. AWS serverless, and AWS in general, is still user hostile. Not to mention doing it with a team. So I've got more work to do.

If you're building something you're proud of right now, pay attention to the people in the room with you. That's the part you get to keep. ❤️
