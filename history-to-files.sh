#!/bin/bash

# Adapted from https://stackoverflow.com/questions/12850030/git-getting-all-previous-version-of-a-specific-file-folder

EXPORT_TO=./history

GIT_PATH_TO_FILE=inciweb-incidents.json

# check if file exist
if [ ! -f ${GIT_PATH_TO_FILE} ]; then
    echo "error: File '${GIT_PATH_TO_FILE}' does not exist. ${USAGE}" >&2
    exit 1
fi

# extract just a filename from given relative path (will be used in result file names)
GIT_SHORT_FILENAME=$(basename $GIT_PATH_TO_FILE)

# create folder to store all revisions of the file
if [ ! -d ${EXPORT_TO} ]; then
    echo "creating folder: ${EXPORT_TO}"
    mkdir  ${EXPORT_TO}
fi

## clear export folder each time you run script
# rm ${EXPORT_TO}/*

# reset coutner
COUNT=0

# iterate all revisions
git rev-list --all --objects -- ${GIT_PATH_TO_FILE} | \
    cut -d ' ' -f1 | \
while read h; do \
     COUNT=$((COUNT + 1)); \
     COUNT_PRETTY=$(printf "%04d" $COUNT); \
     COMMIT_DATE=`git show $h | head -3 | grep 'Date:' | awk '{print $4"-"$3"-"$6}'`; \
     if [ "${COMMIT_DATE}" != "" ]; then \
         git cat-file -p ${h}:${GIT_PATH_TO_FILE} > ${EXPORT_TO}/${COUNT_PRETTY}.${COMMIT_DATE}.${h}.${GIT_SHORT_FILENAME};\
     fi;\
done    

# return success code
echo "result stored to ${EXPORT_TO}"
exit 0