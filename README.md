# Obsidian CloudFlare Images Plugin

Automatically upload images to CloudFlare Images when you paste copied images or drag & drop image files into Obsidian. The plugin instantly generates shareable links for your uploaded images.

> **Note**: A CloudFlare Images account is required to use this plugin.

## Features

- 📋 **Paste to Upload**: Paste copied images directly into your notes
- 🖱️ **Drag & Drop**: Drop image files from your computer into the editor
- ⚡ **Instant Links**: Automatically generates markdown image links
- 🔗 **Shareable URLs**: Creates public CloudFlare Images URLs
- 🔒 **Secure**: Uses your personal CloudFlare API credentials

## Prerequisites

Before using this plugin, you need:

1. A CloudFlare account with CloudFlare Images enabled
2. Your CloudFlare Account ID
3. A CloudFlare API token with Images permissions

## Installation

### From Obsidian Community Plugins

*This plugin is pending approval for the official community plugins directory.*

### Manual Installation

1. Download the latest release from the [Releases page](../../releases)
2. Extract the files to your vault's plugins folder: `VaultFolder/.obsidian/plugins/cloudflare-images/`
3. Reload Obsidian or enable the plugin in Settings → Community Plugins

## Configuration

1. Go to **Settings → Community Plugins → CloudFlare Images**
2. Enter your **CloudFlare Account ID**
3. Enter your **CloudFlare API Token**

### Getting Your CloudFlare Credentials

#### Account ID
1. Log in to your CloudFlare dashboard
2. Select your domain/account
3. Your Account ID is displayed in the right sidebar

#### API Token
1. Go to [CloudFlare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use the **Custom token** template
4. Set permissions:
	- **Account**: `CloudFlare Images:Edit`
	- **Zone Resources**: Include `All zones` or specific zones
5. Copy the generated token
