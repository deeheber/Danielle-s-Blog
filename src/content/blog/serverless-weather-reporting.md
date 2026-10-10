---
author: Danielle Heberling
title: Serverless Weather Reporting with AWS Step Functions and CDK
pubDatetime: 2023-03-05T10:12:03.284Z
description: Serverless Weather Reporting with AWS Step Functions and CDK
tags: ["aws", "serverless", "tutorial"]
---

![Snow on evergreen trees](/assets/snow-trees.jpg)

> Photo by <a href="https://unsplash.com/@devjustesen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Devin Justesen</a> on <a href="https://unsplash.com/photos/QrL-aRyuf_8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Unsplash</a>

## Background

I live in the <a href="https://en.wikipedia.org/wiki/Pacific_Northwest" target="_blank" rel="noopener noreferrer">Pacific Northwest</a>. Approximately 1-2 times per year, it snows. When this happens, people act shocked because "it never happens here."\* Our local governments do not have many snow plows nor do they salt the roads much. This means that when it snows, the roads are highly dangerous. The city of Portland, Oregon often shuts down for multiple days.

Former residents of Portland created a website, <a href="http://isitsnowinginpdx.com/" target="_blank" rel="noopener noreferrer">isitsnowinginpdx.com</a>. I cannot speak for their motivations, but I find this site both entertaining and informative.

After moving out of Portland into the suburbs, I noticed that the site was not as accurate, so I decided to build my own site <a href="http://isitsnowinginhillsboro.com/" target="_blank" rel="noopener noreferrer">isitsnowinginhillsboro.com</a>.

## Architecture Overview

Behind the scenes, this site is using AWS Serverless technologies. <a href="https://aws.amazon.com/s3/" target="_blank" rel="noopener noreferrer">S3</a> hosts site assets, a <a href="https://aws.amazon.com/step-functions/" target="_blank" rel="noopener noreferrer">Step Function</a> updates the site, and <a href="https://aws.amazon.com/eventbridge/scheduler/" target="_blank" rel="noopener noreferrer">EventBridge Scheduler</a> triggers the Step Function every 10 minutes.

I made the decision to **not** put <a href="https://aws.amazon.com/cloudfront/" target="_blank" rel="noopener noreferrer">CloudFront</a> in front of this S3 Bucket, because this is a region specific website. Most people viewing this site live in the area and adding a CDN feels like unnecessary complexity given the use case. As a result, the site renders of `HTTP` rather than `HTTPS`.

Here's a breakdown of what the Step Function workflow does:

1. Get the site's current status (`snow` or `no snow`) from a DynamoDB table
2. Check the current weather using the <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap API</a> via a Lambda Function
3. A choice state compares the two values
4. If the two values match, nothing happens and the workflow ends
5. If the two values do not match, it updates the site to show the current weather obtained from the API
   - A Lambda Function generates the HTML and places that HTML file into an S3 bucket (more on this later)
   - If the Lambda Function is successful, then it updates the site status in DynamoDB

Here's a visual representation of the workflow:
![Weather site workflow](/assets/weather-workflow.png)

## Challenges

Overall things went smoothly. I did run into a few tiny issues.

### Issue 1: EventBridge Scheduler and CDK

EventBridge Scheduler is a new-ish feature and does not have an L2 construct. I was able to implement what I needed for this site using an L1 construct, but with an L1 construct you're writing Cloudformation without the benefits that an L2 construct provides. In this case, I had to define an <a href="https://github.com/deeheber/weather-site/blob/blog-post/lib/weather-site-stack.ts#L219-L237" target="_blank" rel="noopener noreferrer">IAM Role to allow the Scheduler to invoke the Step Function and an inline policy</a>. This is likely a feature that would be included in an L2 construct.

More info on L1 vs L2 constructs <a href="https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs_l1_using" target="_blank" rel="noopener noreferrer">here</a>. I plan to keep an eye on this open <a href="https://github.com/aws/aws-cdk-rfcs/issues/474" target="_blank" rel="noopener noreferrer">RFC</a>.

### Issue 2: HTML Generation

Step Functions have <a href="https://aws.amazon.com/about-aws/whats-new/2021/09/aws-step-functions-200-aws-sdk-integration/" target="_blank" rel="noopener noreferrer">direct integrations</a> with many services. The advantage of this is you do not have write a Lambda Function to make those AWS SDK calls and can save money as well as enjoy the built in error/retry logic that comes with the Step Function service. I used the direct integration for the two calls to DynamoDB and it worked quite well.

When it came to generating HTML and using the S3 PutObject, the direct integration added quotes around the HTML. This resulted in an HTML document that looked similar to `"<h1>My site<h1>"`. The extra quotation marks caused the page to not render properly in the browser. I eventually got this working with a Lambda Function by <a href="https://github.com/deeheber/weather-site/blob/blog-post/src/functions/update-site.ts#L68" target="_blank" rel="noopener noreferrer">sending the Body as a Buffer</a>, but I prefer the direct integration.

## Your Turn

The code is open source and you can view it <a href="https://github.com/deeheber/weather-site/tree/main" target="_blank" rel="noopener noreferrer">here</a>.

You can clone the repo following the instructions in the <a href="https://github.com/deeheber/weather-site/blob/main/README.md" target="_blank" rel="noopener noreferrer">README.md</a> file to create your own weather site. Plug in the latitude and longitude of your city. Also, it's not limited to snow! Check out the `Main` weather types <a href="https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2" target="_blank" rel="noopener noreferrer">here</a> for all available options.

<a href="https://github.com/deeheber/weather-site/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Open source contributions are welcome</a>.

Thanks to the original creators of <a href="http://isitsnowinginpdx.com/" target="_blank" rel="noopener noreferrer">isitsnowinginpdx.com</a> for the inspiration.

\* To be fair the last instance of snow in the area was <a href="https://www.oregonlive.com/weather/2023/02/portland-records-snowiest-day-since-1943-landing-at-no-2-on-all-time-list.html" target="_blank" rel="noopener noreferrer">more than usual</a>.

\*\* **Edit February 23, 2024**: I've <a href="https://github.com/deeheber/weather-site/issues/7" target="_blank" rel="noopener noreferrer">added CloudFront</a> to this. It's nice to have the SSL cert, but to me the work felt like overkill in terms of effort and the extra infra needed for SSL. Hopefully AWS can improve this experience.
