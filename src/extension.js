import GObject from 'gi://GObject';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import { QuickToggle, SystemIndicator } from 'resource:///org/gnome/shell/ui/quickSettings.js';

const CONSERVATION_MODE_PATH = '/sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode';

const ConservationModeToggle = GObject.registerClass(
    class ConservationModeToggle extends QuickToggle {
        constructor() {
            super({
                title: _('Battery Conservation'),
                iconName: 'emoji-nature-symbolic',
                toggleMode: true,
            });

            this._syncState();

            this.connect('notify::checked', () => {
                if (this.checked) {
                    GLib.spawn_async(
                        null,
                        ['/usr/bin/env', 'bash', '-c', `echo '1' | pkexec tee ${CONSERVATION_MODE_PATH}`],
                        null,
                        GLib.SpawnFlags.SEARCH_PATH,
                        null
                    );
                } else {
                    GLib.spawn_async(
                        null,
                        ['/usr/bin/env', 'bash', '-c', `echo '0' | pkexec tee ${CONSERVATION_MODE_PATH}`],
                        null,
                        GLib.SpawnFlags.SEARCH_PATH,
                        null
                    );
                }
            });
        }

        _syncState() {
            try {
                let [success, output] = GLib.spawn_command_line_sync(`cat ${CONSERVATION_MODE_PATH}`);
                if (success) {
                    let value = output.toString().trim();
                    this.checked = value === '1';
                }
            } catch (error) {
                logError(error, 'Failed to read conservation mode state');
            }
        }
    });

const ConservationModeIndicator = GObject.registerClass(
    class ConservationModeIndicator extends SystemIndicator {
        constructor() {
            super();

            this._indicator = this._addIndicator();
            this._indicator.iconName = 'emoji-nature-symbolic';

            const toggle = new ConservationModeToggle();
            toggle.bind_property('checked',
                this._indicator, 'visible',
                GObject.BindingFlags.SYNC_CREATE);
            this.quickSettingsItems.push(toggle);
        }
    });

export default class ConservationModeExtension extends Extension {
    enable() {
        this._indicator = new ConservationModeIndicator();
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._indicator);
    }

    disable() {
        this._indicator.quickSettingsItems.forEach(item => item.destroy());
        this._indicator.destroy();
    }
}
