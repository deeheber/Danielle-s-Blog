---
author: Danielle Heberling
pubDatetime: 2025-02-17T15:12:03.284Z
title: Fargate on a Budget
description: Fargate on a Budget
slug: fargate-on-a-budget
---

## The Business Problem

At the day job, we have an application that needs to meet the following requirements for deploying to production

- the code is server side and it should be able to run for longer than 15 minutes
- this is an internal use app, it can tolerate occasional disruptions
- non-engineering stakeholders need to have a way to access this application
- the application will be used by fewer then 10 people and there will be periods of time where no one will be using it
- it is faster to get approval if we use AWS, because we currently use AWS heavily

## A Solution

For non-disclosure agreement and security reasons this is a variation of the solution, not the exact solution.

It includes the following:

1. A Fargate Spot instance behind an Application Load Balancer
2. Two EventBridge Scheduler schedules that turn the Fargate Spot instances on at a specified time and off at a specified time

Disclaimer: other solutions exist, this is not the only way to accomplish this.

## Architecture Diagram and Example Code

Here's the high level architecture diagram of this solution.

![Fargate Scheduler Architecture](/assets/fargate-scheduler-arch-diagram.png)

Example code with instructions on how to deploy this into your AWS account, can be found in [this GitHub repo](https://github.com/deeheber/fargate-on-a-budget-demo).

**Disclaimer: in this example, we are using a demo Docker image. If you are setting up an application that contains information that shouldn't be open to the public internet, ensure that authentication is in place. Authentication has been intentionally omitted, because it is not the focus of this article.**

Let's zoom in a bit closer on the two major components of this solution:

1. Fargate Spot
2. EventBridge Scheduler

## Fargate Spot

With Fargate there are two capacity provider types: Fargate and Fargate Spot.

Fargate is the standard which gives you on-demand access to containerized compute.

Fargate Spot is simililar to Fargate, but cheaper (advertised as up to 70% discounted) and can be interrupted by AWS to take the capacity back. The reason for this is because AWS operates at a massive scale and lots of times there are instances available that will run and cost AWS money regardless. In order to make money off of this extra capacity, AWS offers this extra capacity as Spot instances at a discounted rate. Because AWS might need this capacity back as demand rises, they reserve the right to give you a two minute warning before shutting down your instance to put it back into the regular Fargate on-demand pool.

[The launch blog post](https://aws.amazon.com/blogs/aws/aws-fargate-spot-now-generally-available/) has an excellent overview for an AWS official description.

Launching a Fargate Spot instance involves 1. launching it and 2. setting up the container to handle a graceful shutdown given a two minute warning from AWS.

### Launching the Instance

The example code uses the [`ApplicationLoadBalancedFargateService`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedFargateService.html) CDK construct.

You can specify one or multiple capacity providers with the `capacityProviderStrategies` property with weights. The higher the weight, the more often that launch type will be utilized.

The example code sets things up to prefer Spot, but to use a regular Fargate launch type in case there is no Spot availability.

```typescript
capacityProviderStrategies: [
          {
            capacityProvider: 'FARGATE_SPOT',
            weight: 50,
          },
          // Backup in case FARGATE_SPOT is not available
          {
            capacityProvider: 'FARGATE',
            weight: 1,
          },
        ],
```

### Handle Graceful Shutdowns

In the example code, this is done in two places:

1. Adds a `stopTimeout` to the container on the Fargate Task for 120 seconds (needs to be at or below 2 minutes)
2. Sets the deregistration delay on the Application Load Balancer at 30 seconds to give the instance time to seperate from the Load Balancer before terminating (also needs to be at or below 2 minutes)

## EventBridge Scheduler

In the example, there are two EventBridge Scheduler schedules - "up" and "down".

This is accomplished by using an AWS CLI command to set the `desiredCount` on the ECS Service to either `1` (on/up) or `0` (off/down). Here's [https://awscli.amazonaws.com/v2/documentation/api/2.1.21/reference/ecs/update-service.html](the official documentation for the command).

If this command were run on the command line via the AWS CLI it would look something like:

```bash
aws ecs update-service --cluster <cluster-name> --service <service-name> --desired-count <desired-count-int>
```

We aren't doing that exact thing in this case...we're using [EventBridge's Universal Targets](https://docs.aws.amazon.com/scheduler/latest/UserGuide/managing-targets-universal.html) feature. Universal Targets allow you to run most (not all - see the link to view unsupported commands) AWS CLI commands directly in an EventBridge Schedule without the need to add compute (such as Lambda).

In our example, we have one Schedule that sets the `desiredCount` to `1` (on/up) at 9am PT Mon-Fri and it sets the `desiredCount` to `0` (off/down) at 5pm PT Mon-Fri.

These cron expressions can be adjusted...be sure to ask your stakeholder(s) that use the app when they will be using it to ensure that it is not shut down when it is needed.

## Summary

This was a walkthrough of a solution that allows us to run a Fargate instance on a budget. The solution utilizes Fargate Spot and EventBridge Scheduler to periodically shut down the Fargate Tasks during periods of no usage.

The example code repository can be found [on GitHub](https://github.com/deeheber/fargate-on-a-budget-demo).

What tips and tricks do you have for saving money with Fargate?

<br />
<br />
