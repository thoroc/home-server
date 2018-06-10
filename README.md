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