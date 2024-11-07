---
author: Danielle Heberling
pubDatetime: 2024-11-07T15:12:03.284Z
title: Ephemeral Jobs Longer than the Lambda Timeout
description: Ephemeral Jobs Longer than the Lambda Timeout
slug: ecs-run-task
---

![horse race](/assets/horse-race.jpg)

> Photo by <a href="https://unsplash.com/@cadop?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mathew Schwartz</a> on <a href="https://unsplash.com/photos/equestrian-riding-horse-at-daytime-5qRWQEdK7Sg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## The Problem

There's an ad-hoc job that runs in the background that doesn't have a client waiting for a synchronous response.

You could run this in AWS Lambda to save money. A benefit with an ephemeral job run is that AWS only charges for when the Lambda is running.

Problem is that this specific job runs longer than the Lambda timeout (at the time of writing this it is 15 minutes). We could write extra logic to make it work, but that adds unnecessary complexity.

You still want to run this ephemerally to save money and resources...so what can you do?

## A Solution

One option is to use [ECS run-task](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html) with a [Fargate](https://aws.amazon.com/fargate/) launch type.

AWS Resources Needed:

- [An ECS Cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html) - a logical grouping of tasks or services (in my example we're using the `default` cluster that comes with new AWS accounts)
- [A Task Definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html) - a blueprint for your application which contains one or more containers and parameters to run
- [A Container](https://aws.amazon.com/what-is/cloud-containers/) - a lightweight, standalone, executable package of software that includes everything needed to run an application. This is commonly used with [Docker](https://www.docker.com/).

Once those resources are deployed, the container can be triggered to run on demand with `ECS run-task`. Once the code is done running and the container exits, then the running ECS Task will disappear. The benefit is that you'll no longer be charged money for a running Fargate task.

There's a few ways to run an ECS task on demand:

- AWS CLI
- AWS SDK (could invoke from within Lambda etc)
- In a Step Function state
- EventBridge Scheduler
- AWS Console

Here's an example of what this command looks like via the AWS CLI:

```bash
aws ecs run-task \
  --cluster default \
  --task-definition my-task \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet1,subnet2],securityGroups=[securityGroup1],assignPublicIp=ENABLED}"
```

## Show Me the Code

There's a [full code example](https://github.com/deeheber/ecs-run-task-demo) of how to deploy these cloud resources and invoke the deployed task via ecs run-task with the AWS CLI.

Take a look at [the `README` file](https://github.com/deeheber/ecs-run-task-demo/blob/main/README.md) for directions.

## Bonus

There are a few more benefits to ECS run-task that I won't mention, but one notable one is the ability to override specific things in the task definition.

For example, if you want to override the `CMD` defined in the `Dockerfile` used to build the Container Image for the task, you could do this by adding the `--overrides` flag.

```bash
aws ecs run-task \
  --cluster default \
  --task-definition my-task \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet1,subnet2],securityGroups=[securityGroup1],assignPublicIp=ENABLED}" \
  --overrides '{"containerOverrides":[{"name":"my-container","command":["npm", "run", "migrate"]}]}'
```

I've seen this used for one off commands that need to run every now and then such as database migrations, though I'm certain there are other good use cases. Here's [the full list](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_TaskOverride.html) of what can be overridden.

Special thanks to [Chase Douglas](https://www.linkedin.com/in/chasedouglas/) for giving me this idea. 🙌🏻

<br />
<br />
