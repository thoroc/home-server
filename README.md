# Home Media Server - HMS Victor

## What

Setup for a home media server using `docker`/`docker-compose` to run `plex` and
associated software.

## Why

Setting up and running a plex server manually off a regular computer is fine,
but _AUTOMATION_!

## How

### Prerequisite

- [git](https://git-scm.com/)
- [docker](https://www.docker.com/) (only the cli is fine)
- [Deno](https://deno.com/)

### Installation & Setup

- clone the present repository: `git clone github.com/thoroc/home-server`
- move to the new folder on your machine: `cd $_`
- run first `deno task cli env`
- run `deno task cli start`

### Usage

```bash
Task cli deno run -A main.ts "--help"

Usage:   home-server-cli
Version: 0.1.0          

Description:

  CLI for managing home server

Options:

  -h, --help     - Show this help.                            
  -V, --version  - Show the version number for this program.  

Commands:

  list   - Lists the applications         
  start  - Starts the application(s)         
  stop   - Stops the application(s)          
  env    - setup the environment variables
```

## Stacks

- [ ] Portainer
