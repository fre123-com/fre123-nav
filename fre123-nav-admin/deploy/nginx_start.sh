#!/bin/bash

file='/etc/nginx/conf.d/default.conf'

if [ ! $B_API ]; then
    echo "Backend API is empty! please set an environment variable named {B_API}."
    exit
else
    echo "Backend API is: "$B_API
    B_API=${B_API//\//\\\/}
    if [ "$(uname)" == "Darwin" ]; then
        sed -i '' 's/proxy_pass localhost/proxy_pass '$B_API'/g' $file
        sed -i '' 's/b_name/'$B_NAME'/g' $file
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        sed -i 's/proxy_pass localhost/proxy_pass '$B_API'/g' $file
        sed -i 's/b_name/'$B_NAME'/g' $file
    fi
    echo "Start Nginx..."
    nginx -g "daemon off;"
fi
