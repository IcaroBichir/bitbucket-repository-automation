#!/bin/bash
for repository in \
repo-1 \
repo-2 \
repo-3; do
    BITBUCKET_USERNAME=your-username node index.js --no-create -r $repository
done
