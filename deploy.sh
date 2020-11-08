#!/bin/bash
npm run build
cd dist
zip -r dist.zip .
#zip -r build/build.zip build/.
unzip -o dist.zip -d /home/payvolut/domains/admin.payvolut.com/public_html/