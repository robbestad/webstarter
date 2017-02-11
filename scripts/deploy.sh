#!/usr/bin/env bash
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
git commit -am"Deploy version $PACKAGE_VERSION"
git push origin master