BUNDLE = "conservation-mode@kajdan.pm"

all: build install run

.PHONY: build install clean run

build:
	@cd src \
	&& gnome-extensions pack --force \
	&& mv $(BUNDLE).shell-extension.zip ../$(BUNDLE).zip

install:
	gnome-extensions install --force $(BUNDLE).zip

clean:
	@if [ -f $(BUNDLE).zip ]; then rm -v $(BUNDLE).zip; fi

run:
	dbus-run-session -- gnome-shell --nested --wayland
