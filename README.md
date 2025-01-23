# Battery Conservation Mode Extension

A GNOME Shell extension that allows to control the battery conservation mode on Lenovo laptops.

Conservation mode is designed for laptops that remain plugged in for extended periods. It limits battery wear by capping the charge at 60%, disconnecting the battery from power use, and relying solely on the adapter. This minimizes wear, preserving battery health for longer.

## Usage

When the button is pressed, the extension toggles battery conservation mode on or off. Since this action requires elevated privileges, the user will be prompted to enter their password.

An icon will be displayed in the top bar to indicate the current status of battery conservation mode.

<br>
<div align="center">
  <img src="https://github.com/user-attachments/assets/951fb6ed-2fcd-4fba-8eaa-3e3cb8d58240" width="auto" height="auto"/>
  <br><br>
  <em>Button to control the battery conservation mode.</em>
</div>
<br>

## Pre-built package

You can download the latest pre-built package from the [releases](https://github.com/ikajdan/battery_conservation_mode/releases/latest/download/battery-conservation-mode@kajdan.pm.zip) page.

To install it, run the following command from the directory where the downloaded file is located:

```bash
gnome-extensions install battery-conservation-mode@kajdan.pm.zip
```

## Build

To build the extension from source, run:

```bash
make build
```

The built extension will be located in the root directory of the project.

## Install

To install the built extension, run:

```bash
make install
```

If you want to remove the extension, run:

```bash
make uninstall
```

## Translate

First create an empty `.po` file for the desired language:

```bash
touch src/locale/<lang>.po
```

Then run the following command to extract the strings from the source code:

```bash
make translate
```

Edit the `.po` file and translate the strings. Finally, build the extension, and install it, to see the changes.

## License

This project is licensed under the GPL v3.0 License. See the [LICENSE](LICENSE.md) file for details.
