---
title: "Is it snowing in Hillsboro?"
order: 3
---

<a href="https://github.com/deeheber/weather-site" target="_blank" rel="noopener noreferrer">Repository</a> · [Serverless Weather Reporting with AWS Step Functions and CDK](/blog/serverless-weather-reporting/) · [I Rewrote My Step Function as a Durable Function](/blog/durable-functions/)

After moving from Portland to the suburbs, I noticed the <a href="https://isitsnowinginpdx.com/" target="_blank" rel="noopener noreferrer">Portland snow site</a> wasn't accurate for my area. I built my own version to answer one question: is it snowing in Hillsboro? I also wanted hands-on experience building a state machine with Step Functions.

<details>
<summary>Read more</summary>

<h3>What I built and why</h3>

The site gives visitors a simple YES or NO. Behind it, EventBridge Scheduler periodically starts a Step Functions workflow. The workflow compares the stored status with current conditions from <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a> and updates the site when the answer changes. The current version stores status in Parameter Store and serves the static site through S3 and CloudFront. The infrastructure is defined in TypeScript with AWS CDK.

<h3>Tradeoffs and lessons</h3>

Step Functions gave me a visual workflow and managed retries and state tracking. I used direct service integrations where they fit, but HTML generation needed a Lambda function. My original attempt to write HTML directly through the S3 integration introduced extra quotation marks. Sending it as a buffer from Lambda worked.

The infrastructure has its own tradeoffs. I initially skipped CloudFront because the audience was local, then added it for HTTPS. Getting a certificate felt like a lot of infrastructure for such a small site. Step Functions also makes the execution easy to inspect, but passing JSON between states and defining error handling can make the CDK code verbose.

<h3>How it's evolved</h3>

I later <a href="https://github.com/deeheber/durable-function-weather-site" target="_blank" rel="noopener noreferrer">rebuilt the workflow separately</a> with Lambda durable functions to compare the developer experience. Writing the workflow in plain TypeScript felt more natural to me. I still preferred Step Functions' visual debugging. Building the same project both ways gave me something concrete to compare.

I wouldn't change much. The project has evolved as I've tried new AWS features, which was part of the learning.

</details>
