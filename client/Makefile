build/qoc.js : setup
	npx webpack

.PHONY: babel
babel:
	npx babel src -d build/lib

.PHONY: clean
clean:
	rm build/*

.PHONY: setup
setup:
	mkdir -p build

.PHONY: test
test:
	npx mocha --require babel-register --recursive test

.PHONY: run
run:
	npx webpack-dev-server --public lvh.me