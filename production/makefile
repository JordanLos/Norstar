SHELL := /bin/bash

all:
	make watch-sass render-jade start-browser-sync -j

watch-sass:
	sass --watch scss/main.scss:css/main.css
render-jade:
	jade -o ./ --watch jade/index.jade
start-browser-sync:
	browser-sync start --server --files "js/behaviour.js, css/main.css, index.html"

