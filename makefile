build:
	mkdir -p build
	cat lib/kona/kona.js > build/kona.js
	cat lib/kona/jquery-proxy.js >> build/kona.js
	cat lib/kona/bindable-collection.js >> build/kona.js
	cat lib/kona/bindable-collection-view.js >> build/kona.js
	cat lib/kona/bindable-collection-view-pagination.js >> build/kona.js
	cat lib/kona/bindable-object.js >> build/kona.js
	cat lib/kona/binded-element.js >> build/kona.js
	cat lib/kona/binded-form.js >> build/kona.js
	cat lib/kona/binded-list.js >> build/kona.js
	cat lib/kona/binded-paginator.js >> build/kona.js

test: build
	open SpecRunner.html
