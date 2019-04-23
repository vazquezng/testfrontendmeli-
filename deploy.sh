#!/bin/bash

clear

echo "Start deploy release"
echo " ==== yarn run build -- --release ===== "
yarn run build -- --release

echo " ==== node build/server.js ===== "
node build/server.js

echo "success deploy => http://localhost:8000/"
