import {  Editor, Plugin, requestUrl, Notice} from 'obsidian';
import {CloudFlareImagesSettingTab} from "./settings";

interface Settings {
	token: string;
	id: string;
}

const DEFAULT_SETTINGS : Settings= {
	token: '',
	id: '',
}

export default class CloudFlareImagesPlugin extends Plugin {
	settings : Settings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new CloudFlareImagesSettingTab(this.app, this));
		// 이미지 붙여넣기 이벤트 감지
		this.registerEvent(
			this.app.workspace.on('editor-paste',this.handlePaste.bind(this))
		)
		// 이미지 드래그앤드롭 이벤트 감지
	}

	onunload() {}

	async handlePaste(evt: ClipboardEvent, editor: Editor){
		const items = evt.clipboardData?.items;
		if(!items) return;

		for( let i = 0; i < items.length; i++ ){
			const item = items[i];
			if(item.type.indexOf('image') !== -1){
				evt.preventDefault();

				const file = item.getAsFile();
				if(file){
					try {
						const imageUrl = await this.uploadToCloudFlare(file);
						editor.replaceSelection(`![Image](${imageUrl})`);
					} catch (error) {
						// 에러 처리
						new Notice(`failed to upload image: ${error.message}`, 5000);
					}
				}
			}
		}
	}

	async uploadToCloudFlare(file:File){
		const token = this.settings.token;
		const id = this.settings.id;
		console.log(this.settings);

		if(!token || !id){
			console.error('setting error. check your token or id');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		await requestUrl(
			{
				url:`https://api.cloudflare.com/client/v4/accounts/${id}/images/v2/direct_upload`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		).then(async (res) => {
			const result = JSON.parse(res.text).result;
			await fetch(result.uploadURL,{body:formData, method:'post'})
			return `https://imagedelivery.net/0ls7rUWRjBE8C2UFoz_eSw/${result.id}/post`
		}).catch((error) => {
			new Notice(`check your id or token : ${error.message}`, 5000);
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
