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
- the application will only be used by a few people (less than 10) and it can be shut down during "off" hours
- we are all in on AWS, so it should be an AWS based solution

## A Solution

For NDA and security reasons this is a variation of the solution that I came up with, not the exact solution.

It includes the following:

- A single Fargate spot instance behind an Application Load Balancer
- Two EventBridge Scheduler schedules that turn the Fargate spot instances on at a specified time and off at a specified time

Disclaimer that other solutions exist, this is not the only way to accomplish this.

## Architecture Diagram and Example Code

Here's the high level architecture diagram of this solution.

![Fargate Scheduler Architecture](/assets/fargate-scheduler-arch-diagram.png)

If you'd like to take a look at example code with instructions on how to deploy this into your AWS account, check out [this GitHub repo](https://github.com/deeheber/fargate-scheduler-demo).

**Major disclaimer that in this example, we are using a demo Docker image. If you are setting up an application that contains proprietary information that shouldn't be open to the public internet, please ensure that authentication and authorization is in place. Because authentication/authorization is not the main focus of this example, it has been purposefully left out.**

Let's dig in a bit further on the two major components of this solution:

1. Fargate Spot
2. EventBridge Scheduler

## Fargate Spot

// TODO

## EventBridge Scheduler

// TODO

## Summary

This was a walkthrough for a solution for ways to deploy a Fargate instance on a budget.

The example repo can be found <TODO add GitHub repo link here>.

What tips and tricks do you have for saving money with Fargate?
