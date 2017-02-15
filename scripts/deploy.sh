#!/usr/bin/env bash
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
git commit -am"Deploy version $PACKAGE_VERSION"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "git push origin $BRANCH"
git push origin $BRANCH
