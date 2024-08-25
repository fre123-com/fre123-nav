#!/bin/sh

file='.output/server/chunks/app/server.mjs'
source_str='"http://localhost";'

if [ ! $B_API ]; then
    echo "Backend API is empty! please set an environment variable named {B_API}."
    exit
else
    echo "Backend API is: "$B_API
    target_str='"'$B_API'";'
    target_str=${target_str//\//\\\/}
    source_str=${source_str//\//\\\/}
    if [ "$(uname)" == "Darwin" ]; then
        sed -i '' 's/'$source_str'/'$target_str'/g' $file

        echo $(sed -i '' 's/'$source_str'/'$target_str'/g' $file)
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        sed -i 's/'$source_str'/'$target_str'/g' $file
    fi
    # echo current date
    /bin/date

    echo "Web service started successfully..."
    PORT=3000 node .output/server/index.mjs
fi
