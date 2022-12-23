SOURCE_FILES:=$(shell find src/ -type f -name '*.ts')

include .env

.PHONY:all
all: build

.PHONY:build
build: dist/build package-lock.json

.PHONY:test
test:
	node_modules/.bin/nyc node_modules/.bin/mocha

.PHONY:lint
lint:
	node_modules/.bin/eslint --quiet 'src/*.ts'

.PHONY:lint-fix
lint-fix: fix

.PHONY:fix
fix:
	node_modules/.bin/eslint --quiet 'src/**/*.ts' --fix

.PHONY:watch
watch:
	node_modules/.bin/tsc --watch

.PHONY:start
start: build
	node dist/index.js

.PHONY: ngrok
ngrok:
	ngrok http ${PORT}

dist/build: $(SOURCE_FILES)
	node_modules/.bin/tsc
	@# Creating a small file to keep track of the last build time
	touch dist/build

.env:
	cp .env.sample .env


.PHONY:clean
clean:
	rm -r dist

