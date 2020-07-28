#https://www.vishalon.net/blog/jsdoc-customize-output-documentation-files
#/usr/local/lib/node_modules/jsdoc/templates

#https://github.com/docstrap/docstrap

#rm -rf out/; /usr/local/bin/jsdoc Code.js -c jsdoc.template -R README.md

#rm -rf out/; /usr/local/bin/jsdoc Code.js -t /Users/leishi/Documents/GitHub/GoogleSheet_bioinfo/my_template -R README.md

#https://github.com/docstrap/docstrap
rm -rf out/; /usr/local/bin/jsdoc Code.js -c my_jsdoc.conf.json -t /usr/local/lib/node_modules/ink-docstrap/template  -R README.md


#https://matthewjamestaylor.com/add-css-to-html#embed-css
#and change the names, and remove footings

head -11 out/global.html > tmp.html
echo         '<style type="text/css" media="screen">' >> tmp.html
#manually add css files
for x in $(grep stylesheet out/global.html  | awk '{print $NF}' | sed 's/href="//g' | sed 's/">//g' | awk '{print "out/"$1}')
do
	cat $x >> tmp.html
done
echo '</style>' >> tmp.html
awk 'NR>=15' out/global.html  >> tmp.html

sed 's/global.html#/#/g' tmp.html | sed 's/index.html/#clean_peptide/g' | sed 's/scripts\/toc.js/https:\/\/stoneinter.github.io\/GoogleSheet_bioinfo\/out\/scripts\/toc.js/g' | sed 's/scripts\/docstrap.lib.js/https:\/\/stoneinter.github.io\/GoogleSheet_bioinfo\/out\/scripts\/docstrap.lib.js/g' > global.html

/bin/rm -f tmp.html
#


