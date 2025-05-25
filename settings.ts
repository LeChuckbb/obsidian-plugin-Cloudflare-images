import {App, PluginSettingTab, Setting} from 'obsidian';
import CloudFlareImagesPlugin from "./main";

export class CloudFlareImagesSettingTab extends PluginSettingTab{
	plugin: CloudFlareImagesPlugin;

	constructor(app: App, plugin: CloudFlareImagesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() :void{
		let { containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Cloudflare API Token')
			.addText((text) => text.setPlaceholder('token').setValue(this.plugin.settings.token).onChange(async (value) => {
				this.plugin.settings.token = value;
				await this.plugin.saveSettings();
			}))

		new Setting(containerEl)
			.setName('Cloudflare Account ID')
			.addText((text) => text.setPlaceholder('id').setValue(this.plugin.settings.id).onChange(async (value) => {
				this.plugin.settings.id = value;
				await this.plugin.saveSettings();
			}))

	}

}
