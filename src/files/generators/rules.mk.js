const Generator = require('./index');

const C = require('const');

class RulesMK extends Generator {

	loadTemplate() { return require('./templates/rules.mk'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		let mcu;
		switch (keyboard.controller) {
			case C.CONTROLLER_ATMEGA32U2: mcu = 'atmega32u2'; break;
			case C.CONTROLLER_ATMEGA32U4: mcu = 'atmega32u4'; break;
			case C.CONTROLLER_AT90USB1286: mcu = 'at90usb1286'; break;
		}

		let f_cpu;
		switch (keyboard.settings.f_cpu) {
			case C.F_CPU_16: f_cpu = '16000000'; break;
			case C.F_CPU_8: f_cpu = '8000000'; break;
		}

		let bt_ble;
		let bt_ezkey;
		switch (keyboard.settings.bluetooth) {
			case C.BLUETOOTH_NONE: bt_ble = 'no'; bt_ezkey = 'no'; break;
			case C.BLUETOOTH_ADAFRUIT_BLE: bt_ble = 'yes'; bt_ezkey = 'no'; break;
			case C.BLUETOOTH_EZKEY_HID: bt_ble = 'no'; bt_ezkey = 'yes'; break;
		}

		let bootloaderSize;
		switch (keyboard.settings.bootloaderSize) {
			case C.BOOTLOADER_512: bootloaderSize = '512'; break;
			case C.BOOTLOADER_2048: bootloaderSize = '2048'; break;
			case C.BOOTLOADER_4096: bootloaderSize = '4096'; break;
			case C.BOOTLOADER_8192: bootloaderSize = '8192'; break;
		}

		return {
			'mcu': mcu,
			'f_cpu': f_cpu,
			'bt_ble': bt_ble,
			'bt_ezkey': bt_ezkey,
			'bootloader_size': bootloaderSize,
			'use_backlight': keyboard.pins.led ? 'yes' : 'no',
			'use_rgb': keyboard.pins.rgb ? 'yes' : 'no'
		};
	}

}

module.exports = RulesMK;
