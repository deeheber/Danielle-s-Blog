---
author: Danielle Heberling
title: On Kubernetes
pubDatetime: 2025-10-12T10:12:03.284Z
description: Danielle answering why she wanted to get a Kubernetes certificate
---

Earlier this month I took the exam for the <a href="https://training.linuxfoundation.org/certification/kubernetes-cloud-native-associate/" target="_blank">Kubernetes and Cloud Native Associate (KCNA) certification</a> and passed.

After years of working in AWS Serverless, this certification raised some eyebrows. People asked: why?

## Here's my list of reasons why I got this certificate

### 1. Using the best tool for the job

The philosophy here is "serverless first", but not "serverless always." There are cases where other tools are a better choice for your workload. Most of my container orchestration work has been with AWS ECS/Fargate. It seemed worth exploring what a non-proprietary container orchestration tool has to offer.

### 2. Understanding the systems and how they work at a deeper level

Serverless removes the undifferentiated heavy lifting. But sometimes customization is needed beyond what managed services offer. K8s is a natural choice for that.

Think of it like when your car breaks down. You can take it to the repair shop and pay someone else to fix it (serverless), or you can pop open the hood, buy the parts, and do the repair yourself (K8s). Being able to do both has value.

### 3. Kubernetes is everywhere

It's inevitable that a future job will require interacting with a K8s system. Having baseline knowledge will help get things done faster.

This isn't a value judgment on whether all these companies actually need K8s. That's a whole other conversation.

## What is the KCNA

You can read all about it on the Linux Foundation website, but to me it was the basic fundamentals of all of the moving parts of K8s, how they interact, and when you would need to use them.

It was rather surface level and introductory much like I envision the AWS Cloud Practitioner certification is. If you want depth, this isn't the cert for you, but if you want a high level intro this is an excellent choice.

## What Next?

People have asked if this means becoming a "Kubernetes person" now. The plan is to be pragmatic. Learn enough K8s to use the right tool for the job. No abandoning serverless or becoming a K8s evangelist.

The immediate future includes completing the <a href="https://cloudresumechallenge.dev/docs/extensions/kubernetes-challenge/" target="_blank">Kubernetes Resume Challenge</a> and building some other personal projects to learn.

Honestly, it's been fun to be a beginner again.
