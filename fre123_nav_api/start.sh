#!/bin/sh

s_type=$1
s_env=$2

if [ ${s_type} == "api" ]
then
    script_command="pipenv run gunicorn -c src/config/gunicorn.py src.http_app:app"
else
    echo "Service type doesn't exist: "$s_type
    exit
fi

if [ ${s_env} == "local" ]
then
    start_script="PIPENV_DOTENV_LOCATION=./.env "$script_command
elif [ ${s_env} == "dev" ]
then
    start_script="PIPENV_DOTENV_LOCATION=./dev.env "$script_command
elif [ ${s_env} == "pro" ]
then
    start_script="PIPENV_DOTENV_LOCATION=./pro.env "$script_command
else
    echo "Environment variable type doesn't exist: "$s_type
    exit
fi

echo "Start "$s_type"("$s_env") serve: "$start_script
eval $start_script
