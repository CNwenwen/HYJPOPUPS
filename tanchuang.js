const witcat_popUps_picture = "";

const witcat_popUps_icon = "";

const witcat_popUps_extensionId = "popUps";

/** @typedef {string|number|boolean} SCarg 来自Scratch圆形框的参数，虽然这个框可能只能输入数字，但是可以放入变量，因此有可能获得数字、布尔和文本（极端情况下还有 null 或 undefined，需要同时处理 */

class popUps {
    constructor(runtime) {
        this.runtime = runtime;
        this._formatMessage = runtime.getFormatMessage({
            "zh-cn": {
                "popUps.name": "弹窗拓展",
                "popUps.popup": "浏览器弹窗[content]",
                "popUps.ask": "询问[content]并获取用户输入",
                "popUps.confirmation": "用户确认[content]",
                "popUps.win": "win消息提示[content]标题[title]图标[icon]",
                "popUps.icon.1": "当前网页图标",
                "popUps.icon.2": "ccw图标",
                "popUps.icon.3": "gandi图标",
                "popUps.docs": "📖拓展教程",
            },
            en: {
                "popUps.name": "popUps",
                "popUps.popup": "Browser popup[content]",
                "popUps.ask": "Ask for [content] and get user input",
                "popUps.confirmation": "User confirmation [content]",
                "popUps.win": "win Message Prompt [content] title [title] icon [icon]",
                "popUps.icon.1": "Current page icon",
                "popUps.icon.2": "ccw icon",
                "popUps.icon.3": "gandi icon",
                "popUps.docs": "📖 Tutorial",
            }
        })
    }

    /**
     * 翻译
     * @param {string} id
     * @return {string}
     */
    formatMessage(id) {
        return this._formatMessage({
            id,
            default: id,
            description: id
        });
    }

    getInfo() {
        return {
            id: witcat_popUps_extensionId, // 拓展id
            name: this.formatMessage("popUps.name"), // 拓展名
            blockIconURI: witcat_popUps_icon,
            menuIconURI: witcat_popUps_icon,
            color1: "#EC3838",
            color2: "#B32B2B",
            blocks: [
                {
                    blockType: "button",
                    text: this.formatMessage('popUps.docs'),
                    onClick: 
this.docs
,
                },
                {
                    opcode: "popup",
                    blockType: "command",
                    text: this.formatMessage("popUps.popup"),
                    arguments: {
                        content: {
                            type: "string",
                            defaultValue: '一个弹窗',
                        },
                    },
                },
                {
                    opcode: "ask",
                    blockType: "reporter",
                    text: this.formatMessage("popUps.ask"),
                    arguments: {
                        content: {
                            type: "string",
                            defaultValue: '一个弹窗',
                        },
                    },
                },
                {
                    opcode: "confirmation",
                    blockType: "Boolean",
                    text: this.formatMessage("popUps.confirmation"),
                    arguments: {
                        content: {
                            type: "string",
                            defaultValue: '一个弹窗',
                        },
                    },
                },
                {
                    opcode: "win",
                    blockType: "command",
                    text: this.formatMessage("popUps.win"),
                    arguments: {
                        content: {
                            type: "string",
                            defaultValue: '一个弹窗',
                        },
                        title: {
                            type: "string",
                            defaultValue: '一个标题',
                        },
                        icon: {
                            type: "string",
                            menu: 'icon',
                        },
                    },
                },
            ],
            menus: {
                icon: {
                    acceptReporters: true,
                    items: [
                        {

                            text: this.formatMessage('popUps.icon.1'),
                            value: 'CurrentPage'
                        },
                        {
                            text: this.formatMessage('popUps.icon.2'),
                            value: 'https://m.ccw.site/community/images/logo-ccw.png'

                        },
                        {
                            text: this.formatMessage('popUps.icon.3'),
                            value: 'https://super-static-assets.s3.amazonaws.com/58fe03d8-cb04-43ac-bd5f-3c87ad5188db/uploads/favicon/38c96a18-4d32-4876-9eb5-13a7b7aa4fca.png'

                        }
                    ]
                },
            }
        };
    }


    /** 打开教程 */
    docs() {
        let a = document.createElement('a');
        a.href = "https://www.ccw.site/post/d6d96e80-3f58-4a19-b7e6-c567d3a6a583";
        a.rel = "noopener noreferrer";
        
a.target = "_blank";
        
a.click
();
    }

    popup(args) {
        alert(String(args.content));
    }

    ask(args) {
        return prompt(String(args.content));
    }

    confirmation(args) {
        return confirm(String(args.content));
    }

    async ask_notif_perm() {
        const perm = Notification.permission;
        if (perm === "default") {
            await Notification.requestPermission();
        }
    }

    async win(args) {
        await this.ask_notif_perm();
        let perm = Notification.permission;
        if (perm !== "granted") {
            console.warn(`popups: 还没有获取通知权限`);
            return;
        }
        let icon = String(args.icon)
        if (icon === "CurrentPage") {
            icon = document.getElementsByTagName("link")[0].href;
        }
        new Notification(String(args.title), {
            body: String(args.content),
            icon: icon,
        });
    }
}

window.tempExt = {
    Extension: popUps,
    info: {
        name: "popUps.name",
        description: "popUps.descp",
        extensionId: witcat_popUps_extensionId,
        iconURL: witcat_popUps_picture,
        insetIconURL: witcat_popUps_icon,
        featured: true,
        disabled: false,
        collaborator: "白猫 @ CCW"
    },
    l10n: {
        "zh-cn": {
            "popUps.name": "弹窗拓展",
            "popUps.descp": "更多弹窗"
        },
        en: {
            "popUps.name": "popUps",
            "popUps.descp": "More pop-ups"
        }
    }
};