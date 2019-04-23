#!/bin/bash

clear

echo "Start deploy docker"
echo " ==== docker-compose build ===== "
docker-compose build

echo " ==== docker-compose up -d ===== "
docker-compose up -d

echo " ==== docker system prune -f ===== "
docker system prune -f


echo "success deploy => http://localhost:8000/"
