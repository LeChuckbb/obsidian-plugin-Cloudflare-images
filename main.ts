import {  Editor, Plugin, requestUrl, Notice } from 'obsidian';
import * as dotenv from 'dotenv';

export default class MyPlugin extends Plugin {
	async onload() {
		// 이미지 붙여넣기 이벤트 감지
		this.registerEvent(
			this.app.workspace.on('editor-paste',this.handlePaste.bind(this))
		)
	}

	onunload() {
	}

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
						new Notice(`이미지 업로드 실패: ${error.message}`, 5000);
						console.error('Image upload failed:', error);
					}
				}
			}
		}
	}



	async uploadToCloudFlare(file:File){
		const token = process.env["CLOUD_FLARE_TOKEN "];
		const id = process.env["CLOUD_FLARE_ID "];

		if(!token || !id){
			console.error('환경변수 설정 오류');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		const response = await requestUrl(
			{
				url:`https://api.cloudflare.com/client/v4/accounts/${id}/images/v2/direct_upload`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const result = JSON.parse(response.text).result;
		await fetch(result.uploadURL,{body:formData, method:'post'})
		return `https://imagedelivery.net/0ls7rUWRjBE8C2UFoz_eSw/${result.id}/post`
	}
}
