#!/usr/bin/sh

DIST_FILE=.env.dist
ENV_FILE=${DIST_FILE%.*}

declare -A DIST_ENVS
declare -A LOCAL_ENVS

function store_env_vars ()
{
    echo "Processing file: $1"
    echo "Passing array: $2"
    funky $2
    if [[ -f $1 ]]
    then
        mapfile -t $2 < $1
        while read -r LINE
        do
            # check that line is neither a comment or blank
            [[ -z $LINE || $LINE =~ ^[[:space:]]*# ]] && continue
            echo "Text read from file: $LINE"
            # split each line into an array
            VARS=(${LINE//=/ })
            KEY=${VARS[0]}
            VALUE=${VARS[1]}
            # echo "> key=${VARS[0]};value=${VARS[1]};"
            # $2[${VARS[0]}]="${VARS[1]}"
            echo "> key=$KEY;value=$VALUE;"
            $2[$KEY]="$VALUE"
            echo ${2[$KEY]}
        done < $1
    fi
}

function write_env_vars()
{
    echo "writting stuff now"
    for key in ${!DIST_ENVS[@]}; do echo $key; done
    for value in ${DIST_ENVS[@]}; do echo $value; done
}

# let's check that we don't have a .env already present
if ! ( [[ -s $ENV_FILE ]] && cmp $ENV_FILE $DIST_FILE 2>/dev/null 1>&2 )
then
    echo "No ${ENV_FILE} found. Copying ${DIST_FILE} to ${ENV_FILE}"
    cp $DIST_FILE $ENV_FILE
else
    if [[ -f $DIST_FILE && -f $ENV_FILE ]]
    then
        mapfile -t $LOCAL_ENVS < $1
        while read -r LINE
        do
            # check that line is neither a comment or blank
            [[ -z $LINE || $LINE =~ ^[[:space:]]*# ]] && continue
            echo "Text read from file: $LINE"
            # split each line into an array
            VARS=(${LINE//=/ })
            KEY=${VARS[0]}
            VALUE=${VARS[1]}
            # echo "> key=${VARS[0]};value=${VARS[1]};"
            # $2[${VARS[0]}]="${VARS[1]}"
            echo "> key=$KEY;value=$VALUE;"
            set $LOCAL_ENVS[$KEY]="$VALUE"
            echo "> ${LOCAL_ENVS[$KEY]}"
        done < $DIST_FILE
    fi
    # write_env_vars
    # while IFS='' read -r LINE || [[ -n $LINE ]]; do
    #     echo "Text read from file: $LINE"
    #     echo $LINE >> $ENV_FILE
    # done < $DIST_FILE
    # write_env
fi


