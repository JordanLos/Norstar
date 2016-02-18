SHELL := /bin/bash
watch-sass:
	sass --watch scss/main.scss:css/main.css
render-jade:
	jade -o ./ --watch jade/index.jade
start-browser-sync:
	browser-sync start --server --files "css/main.css, index.html"

