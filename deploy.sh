#!/bin/bash
npm run build
cd dist
zip -r dist.zip .
#zip -r build/build.zip build/.
unzip -o dist.zip -d /home/ldrguidebook/public_html