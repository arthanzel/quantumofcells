build/qoc.js : setup
	npx webpack

.PHONY: clean
clean:
	rm build/*

.PHONY: setup
setup:
	mkdir -p build

.PHONY: test
test:
	npx mocha --require babel-register --recursive test

.PHONY: watch
watch:
	npx webpack --watch