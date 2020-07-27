#https://www.vishalon.net/blog/jsdoc-customize-output-documentation-files
#/usr/local/lib/node_modules/jsdoc/templates

#https://github.com/docstrap/docstrap

#rm -rf out/; /usr/local/bin/jsdoc Code.js -c jsdoc.template -R README.md

#rm -rf out/; /usr/local/bin/jsdoc Code.js -t /Users/leishi/Documents/GitHub/GoogleSheet_bioinfo/my_template -R README.md

#https://github.com/docstrap/docstrap
rm -rf out/; /usr/local/bin/jsdoc Code.js -c my_jsdoc.conf.json -t /usr/local/lib/node_modules/ink-docstrap/template  -R README.md


#https://matthewjamestaylor.com/add-css-to-html#embed-css
#manually add css files
#and change the names, and remove footings
