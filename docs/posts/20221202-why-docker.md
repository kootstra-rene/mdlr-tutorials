---
title: "Why are you using docker and docker compose?"
tldr: "Docker and docker-compose are used for easy of development and maintenance"
author: "Maarten Metz"
tags: ["faq"]
---

## Introduction

During development, `mdlr` requires an environment with docker and docker-compose installed. This blog explains why.

## Why docker?

```mdlr[blog-list
- Encapsulation; no contamination of development environment
- All `mdlr` projects share the same docker image (compare with npm)
- The javascript that is bundled during development (by `mdlr`, inside the docker container) is the exact same javascript that will run in production.
- Docker is already installed on most developer machines; most of the deployments are done using docker containers already.
```

## Why docker-compose?

- You'll get a very small but powerful interface towards your `mdlr` server: `docker-compose pull / up`. That's basically it.
- Use `docker-compose.yaml` to change your environment instead of using a commandline. Open up an (online) version of your favorite editor and you're on a roll!

## Costs

- Docker and docker-compose dependency (most developers already have it installed)

## Risks

- Docker requesting (insane) amounts of license costs all of a sudden.  
  
Mitigations:  
  
- We're not married with docker. Any virtualisation environment will do and we're ready to change. For users this would mean changing from `docker-compose.yaml` to `the-new-and-free-virtualisation-thingy.yaml`.
- For (production) deployment `mdlr` does not depend on docker

## Future

It should even be possible to deploy a `mdls-js` docker container on your platform of choice and use that one instance for all your developers. That way the individual `docker` and `docker-compose` installments on development machines are no longer needed.
