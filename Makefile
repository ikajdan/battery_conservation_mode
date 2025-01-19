BUNDLE = "battery-conservation-mode@kajdan.pm"

all: build install

.PHONY: build install clean run

build:
	@cd src \
	&& gnome-extensions pack --force --podir=locale/ \
	&& mv $(BUNDLE).shell-extension.zip ../$(BUNDLE).zip

install:
	gnome-extensions install --force $(BUNDLE).zip

clean:
	@if [ -f $(BUNDLE).zip ]; then rm -v $(BUNDLE).zip; fi

translations:
	@./tools/update-locale.sh $(BUNDLE)

run:
	@export MUTTER_DEBUG_DUMMY_MODE_SPECS=1280x800 \
	&& dbus-run-session -- gnome-shell --nested --wayland
