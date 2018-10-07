#!/usr/bin/env bash

BUCKET_NAME="vue-hours"


create_s3_bucket() {
    aws s3 mb "s3://${BUCKET_NAME}" # create bucket
    aws s3 website "s3://${BUCKET_NAME}" --index-document index.html
}


CYAN=`tput setaf 6`
RESET_COLORS=`tput sgr0`
echo ""
echo "${CYAN}/*******************************"
echo "${CYAN} *   vue-hours deploy helper   *"
echo "${CYAN} *******************************/"
echo "${RESET_COLORS}"

PS3='Yo get schwifty: '
options=("Build"
         "Deploy - Backend"
         "Deploy - Frontend"
         "Remove / Wipe Project from AWS"
         "Quit")

select opt in "${options[@]}"
do
    case $opt in
        "Build")
            npm run build
            break
            ;;
        "Deploy - Backend")
            echo "TODO: deploy with build"
            break
            ;;
        "Deploy - Frontend")
            create_s3_bucket
            npm run build
            aws s3 sync --acl public-read --sse AES256 dist/ "s3://${BUCKET_NAME}"
            rm -r ./dist
            break
            ;;
        "Remove / Wipe Project from AWS")
            echo "TODO: serverless wite"
            break
            ;;
        "Quit")
            break
            ;;
        *) echo invalid option;;
    esac
done
