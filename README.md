<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Architecture Documentation
This document outlines the architecture of a notification service built with NestJS. The service is designed to send notifications through different channels based on the subscription status of companies and the type of notification.

## Components
  1. Company Service:
    * Manages company data and user associations.
    * Provides methods to retrieve company details and user subscription status.
  
  2. Notification Factory:
    * Responsible for creating notification instances.
    * Uses different notification types and user IDs to generate notifications.
  
  3. Notification Channels:
    * UI Channel: Sends notifications to a user interface.
    * Email Channel: Sends notifications via email.

  4. Notification Entity:
    * Holds the list of channels that a notification can use.
    * Filters channels based on company subscriptions.
    * Manages the sending of notifications through all active channels.

  5. Observers:
    * Watches for changes UI channel that trigger save notifications.

## Workflow
  1. The service starts by receiving a request to send a notification.
  2. The NotificationFactory creates a Notification object based on the type specified (e.g., monthly payslip, leave balance reminder).
  3. The Notification object retrieves the company and user details from the CompanyService to check which channels are subscribed.
  4. It filters the available channels based on the subscription data.
  5. If valid channels are available, it sends out notifications through those channels; otherwise, it throws an error.

## Endpoints
  1. Send notification
    * Method: Post
    * path: notification
    * body: 
      1. key: notificationType    value in : ["leave-balance-reminder", "monthly-payslip", "happy-birthday"] => required
      2. key: userId    value: number(1,2,3,4)  => required
      3. key: CompanyId    value: number(1,2)   => required
  2. Get notification for specific user
    * Method: Get
    * path: notification
    * Param: 
      1. key: userId    value: number(1,2,3,4) 


## Prerequisites
  * Docker

## Installation
```bash
$ docker-compose build
```
## Running the app

```bash
$ docker-compose up
```

## Test

```bash
$ docker-compose run test
```



## Stay in touch

- Author - [Abdulatif Hashash](https://www.linkedin.com/in/abdallatif-hashash-8aa594202/)

