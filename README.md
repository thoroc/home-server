HOME SERVER
===========

What?
--------

This repository is a modification of the superb https://www.smarthomebeginner.com/docker-home-media-server-2018-basic tutorial. It is also a mean to learn more about Docker and docker-compose, while adding to it with personal experience.

The aim is to have a simple local deployment for a Home Media server around Plex Media Server

Why?
-------

Usually you have to install all these application together on the same machine, and it is often a headach. 

It is also a good opportunity to play about with Docker that seems to be omni present in web developpemnt

How?
-------

 * clone the present repository: ```git clone github.com/thoroc/home-server```
 * move to the new folder on your machine
 * copy and edit ```.env.dist``` as ```.env```
 * run ```make``` to see a list of available tasks

Technology
-------------

  * portainer
  * watchtower
  * plex
  * couchpotato
  * qbittorent

Plex:
-----

1. go to portainer http://localhost:9000 & launch couchpotato from there OR go directly to http://localhost:32400
2. setup Plex
3. setup new ```Films``` and ```TV programmes``` libraries using ```/data/movies``` and ```/data/tvshows``` respectively as the directories

CouchPotato:
------------

1. go to portainer http://localhost:9000 & launch couchpotato from there OR go directly to http://localhost:5050
2. disable the ```blackhole``` feature (permission error encoutered)
3. go to the settings and enable qBittorrent from the Downloaders section with the following:

```
    host: http://qbittorrent:8090/
    username: admin
    password: adminadmin
```
