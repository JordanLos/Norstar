SHELL := /bin/bash

all:
	make watch-sass render-jade start-browser-sync -j
production:

watch-sass:
	sass --watch scss/main.scss:css/main.css
render-jade:
	jade -o ./ --watch jade/index.jade
start-browser-sync:
	browser-sync start --server --files "js/behaviour.js, css/main.css, index.html"

cat-files:
	rm -rf js/main.js
	@bash -c 'cat js/libraries/jquery-2.1.4.js js/node_modules/fullpage.js/jquery.fullPage.js js/libraries/{TweenMax.js,CSSPlugin.min.js,TimelineLite.min.js} js/behaviomr.js > js/main.js'
	minify js/main.js

