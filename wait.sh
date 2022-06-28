#!/bin/sh

# while ! mysqladmin ping -h "localhost" --silent; do
#     echo "can't connect, retrying..."
#     sleep 2
# done

#sleep for 15 secs until db container is initialized
sleep 15

node dist/index.js