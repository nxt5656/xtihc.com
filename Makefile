.PHONY: help install start dev build preview

NPM ?= npm
HOST ?= 127.0.0.1
PORT ?= 5173

help:
	@echo "Usage:"
	@echo "  make install           Install dependencies with npm ci"
	@echo "  make start             Start local VitePress dev server"
	@echo "  make dev               Same as make start"
	@echo "  make build             Build static site"
	@echo "  make preview           Preview built static site"
	@echo ""
	@echo "Options:"
	@echo "  HOST=0.0.0.0           Override host, default: 127.0.0.1"
	@echo "  PORT=5174              Override port, default: 5173"

install:
	$(NPM) ci

start: dev

dev:
	$(NPM) run docs:dev -- --host $(HOST) --port $(PORT)

build:
	$(NPM) run docs:build

preview:
	$(NPM) run docs:preview -- --host $(HOST) --port $(PORT)
