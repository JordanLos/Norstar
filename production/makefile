SHELL := /bin/bash

all:
	make watch-sass render-jade start-browser-sync -j
production:
	make min-cat-css min-cat-js img-min

watch-sass:
	sass --watch scss/main.scss:css/main.css scss/noJS.scss:css/noJS.css
render-jade:
	jade -o ./ --watch jade/index.jade
start-browser-sync:
	browser-sync start --server --files "js/*.js, css/*.css, index.html"

min-cat-js:
	rm -rf js/main.js
	@bash -c 'cat js/libraries/jquery-2.1.4.js js/node_modules/fullpage.js/jquery.fullPage.js js/libraries/{TweenMax.js,CSSPlugin.min.js,TimelineLite.min.js} js/behaviour.js > js/main.js'
	minify js/main.js

min-cat-css:
	@bash -c 'cat css/jquery.fullPage.css css/main.css > css/cat.css'
	minify css/cat.css

img-min:
	svgo -f img
