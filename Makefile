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

ngrok-watch-server: export NGROK_ORIGIN := $(shell curl http://127.0.0.1:4040/api/tunnels -s | jq '.tunnels[0].public_url' -j --raw-output  -)
ngrok-watch-server:
	@[ "${NGROK_ORIGIN}" ] && /bin/true || ( echo "Could not get a NGROK public URL. Is it running? You might need to run 'make ngrok first'"; exit 1 )
	CURVEBALL_ORIGIN="$(NGROK_ORIGIN)" npx tsc-watch --onSuccess 'node dist/index.js'

dist/build: $(SOURCE_FILES)
	node_modules/.bin/tsc
	@# Creating a small file to keep track of the last build time
	touch dist/build

.PHONY:clean
clean:
	rm -r dist

