#!/usr/bin/env bash

CYAN=`tput setaf 6`
RESET_COLORS=`tput sgr0`
echo ""
echo "${CYAN}/*******************************"
echo "${CYAN} *   vue-hours deploy helper   *"
echo "${CYAN} *******************************/"
echo "${RESET_COLORS}"

PS3='Yo get schwifty: '
options=("Build"
         "Deploy - With build"
         "Deploy - Without build"
         "Remove / Wipe Project from AWS"
         "Quit")

select opt in "${options[@]}"
do
    case $opt in
        "Build")
            npm run build
            break
            ;;
        "Deploy - With build")
            echo "TODO: deploy with build"
            break
            ;;
        "Deploy - Without build")
            echo "TODO: deploy without build"
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
