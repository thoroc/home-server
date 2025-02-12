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
$ deno task cli --help

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

### Container management

- [x] Portainer # Docker container manager - <https://www.portainer.io/>
- [x] Watchtower # Docker image updater - <https://containrrr.dev/watchtower/>

### Network infrastructure

- [ ] # DNS Server
- [ ] # Reverse Proxy

### Media Services

- [x] Plex Media Server # Media server - <https://plex.tv/>
- [x] qBittorrent # Torrent client
- [x] Prowlarr # Indexer manager - <https://prowlarr.com/>
- [x] Sonarr # TV Show manager - <https://sonarr.tv/>
- [x] Radarr # Movies manager - <https://radarr.video/>
- [x] Bazarr # Sutitle manager - <https://www.bazarr.media/>
- [x] Lidarr # Music manager - <https://lidarr.audio/>
- [ ] Meelo # Media server - <https://github.com/Arthi-chaud/Meelo>

#### Additional Services

- [x] Tautulli # Plex Server monitor - <https://tautulli.com/>
- [ ] Kometa # aka Plex Meta manager - <https://kometa.wiki/en/latest/>
- [ ] Tdarr # Transcoding manager - <https://home.tdarr.io/>

### Optional Services

- [x] Homarr # Homepage for hosted apps - <https://homarr.dev/>

## Future plans

- implement profiles: <https://event-driven.io/en/docker_compose_profiles/>

## References

- <https://docs.linuxserver.io/>
- <https://github.com/SimpleHomelab/docker-traefik>
- <https://docs.techdox.nz/>
- <https://thehomelab.wiki/>
- <https://home-automation-india.github.io/>
