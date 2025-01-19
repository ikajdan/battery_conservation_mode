#!/usr/bin/sh

set -eu

PACKAGE_NAME="$1"
echo "Updating locale files for package: $PACKAGE_NAME"

GIT_ROOT=$(git rev-parse --show-toplevel)
cd "${GIT_ROOT}/src/"

POT_FILE="messages.pot"
touch "$POT_FILE"

xgettext --output="$POT_FILE" \
         --join-existing *.js \
         --from-code UTF-8 \
         --no-wrap \
         --sort-by-file \
         --default-domain="$PACKAGE_NAME" \
         --package-name="$PACKAGE_NAME" \
         --package-version="1.0"

for po_file in locale/*; do
    echo "$po_file"
    msgmerge --update \
             --sort-by-file \
             --no-wrap \
             --backup=off \
             --quiet \
             "$po_file" "$POT_FILE"
done

rm "$POT_FILE"
