---
author: Danielle Heberling
pubDatetime: 2025-02-17T15:12:03.284Z
title: Fargate on a Budget
description: Fargate on a Budget
slug: fargate-on-a-budget
---

## The Business Problem

At the day job, we had an internal use application that needed cloud infrastructure to meet the following requirements

- the code is server side and it needs to be able to run for longer than 15 minutes (aka no Lambda because the timeout is limited to 15 min or under)
- since this is an internal use app, it can tolerate occasional disruptions
- non-engineering stakeholders need to have an easy way to access this application
- the application will only be used by a few people (less than 10) and there will be periods of time where no one will be actively using it
- we do a lot of things on AWS, so it is faster to get approval if we use AWS

## A Solution

For NDA and security reasons this is a variation of the solution that I came up with, not the exact solution.

It includes the following:

1. A single Fargate spot instance behind an Application Load Balancer
2. Two EventBridge Scheduler schedules that turn the Fargate spot instances on at a specified time and off at a specified time

Disclaimer that other solutions exist, this is not the only way to accomplish this.

## Architecture Diagram and Example Code

Here's the high level architecture diagram of this solution.

![Fargate Scheduler Architecture](/assets/fargate-scheduler-arch-diagram.png)

Example code with instructions on how to deploy this into your AWS account, can be found in [this GitHub repo](https://github.com/deeheber/fargate-on-a-budget-demo).

**Disclaimer that in this example, we are using a demo Docker image. If you are setting up an application that contains proprietary information that shouldn't be open to the public internet, please ensure that authentication is in place. Because authentication is not the focus of this article, it has been intentionally omitted.**

Let's zoom in a bit closer on the two major components of this solution:

1. Fargate Spot
2. EventBridge Scheduler

## Fargate Spot

With Fargate there are two capacity provider types: Fargate and Fargate Spot.

Fargate is the standard which gives you on-demand access to containerized computer.

Fargate Spot is simililar to Fargate, but cheaper (advertised as up to 70% discounted) and can be interrupted by AWS to take the capacity back. The reason for this is because AWS operates at a massive scale and lots of times there are instances available that will run and cost AWS money regardless. In order to make money off of this extra capacity, AWS offers this extra capacity as Spot instances at a discounted rate. Because AWS might need this capacity back as demand rises, they reserve the right to give you a two minute warning before shutting down your instance to put it back into the regular Fargate on-demand pool.

[The launch blog post](https://aws.amazon.com/blogs/aws/aws-fargate-spot-now-generally-available/) has a pretty good overview and explaination for an official description.

So launching a Fargate Spot instance involves 1. launching it and 2. setting up your application to handle a graceful shutdown given a two minute warning from AWS.

### Launching the Instance

In the example code, we're using the [`ApplicationLoadBalancedFargateService`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedFargateService.html) CDK construct.

You can specify one or multiple capacity providers with the `capacityProviderStrategies` property with weights. The higher the weight the more often that launch type will be utilized.

In the example code, I've set it up to prefer Spot, but it also has a regular Fargate launch type as a back up in case there is not Spot availability.

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

### Enable Graceful Shutdowns

In the example code, I've done this in two places.

1. Add a `stopTimeout` to the container on the Fargate Task ensuring it is two minutes long or under
2. Set the deregistration delay on the Application Load Balancer to be lower than two minutes to give the instance time to seperate from the LB before terminating

## EventBridge Scheduler

In the example, we have two Schedules. One to turn the Fargate instance "on" and a second one to turn it "off."

This is accomplished by using an AWS CLI command to set the `desiredCount` on the service to either `1` (on) or `0` (off). Here's [https://awscli.amazonaws.com/v2/documentation/api/2.1.21/reference/ecs/update-service.html](the official documentation for the command).

If this command were run string on the CLI via the command line it would look something like:

```bash
aws ecs update-service --cluster <cluster-name> --service <service-name> --desired-count <desired-count-int>
```

We aren't doing that in this case though...we're using [EventBridge's Universal Targets](https://docs.aws.amazon.com/scheduler/latest/UserGuide/managing-targets-universal.html) feature. Universal Targets allow you to run most (not all - see the link to view unsupported commands) AWS CLI commands directly in an EventBridge Schedule without the need to add compute such as Lambda.

In our example, we have one Schedule that sets the `desiredCount` to `1` (on) at 9am PT Mon-Fri and it sets the `desiredCount` to `0` (off) at 5pm PT Mon-Fri.

These cron expressions can be adjusted...be sure to ask your stakeholder who will be using the app when they will not be using it to ensure that it is not shut down when they need it.

## Summary

This was a walkthrough for a solution for ways to deploy a Fargate instance on a budget.

The example code repository can be found [on GitHub here](https://github.com/deeheber/fargate-on-a-budget-demo).

What tips and tricks do you have for saving money with Fargate?
