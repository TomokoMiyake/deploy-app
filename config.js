const choices = [
    {
        'title': '日報',
        'value': '日報'
    },
    {
        'title': '新年会調整',
        'value': '新年会調整'
    }
];

const appTemps = [
    {
        'name': '日報',
        'fields': {
            '日付': {
                'type': 'DATE',
                'code': '日付',
                'label': '日付',
                'noLabel': false,
                'required': false,
                'unique': false,
                'defaultValue': '',
                'defaultNowValue': true
            },
            'ユーザー選択': {
                'type': 'USER_SELECT',
                'code': 'ユーザー選択',
                'label': '名前',
                'noLabel': false,
                'required': false,
                'entities': [],
                'defaultValue': []
            },
            'ドロップダウン': {
                'type': 'DROP_DOWN',
                'code': 'ドロップダウン',
                'label': '部署',
                'noLabel': false,
                'required': false,
                'options': {
                    '総務': {
                        'label': '総務',
                        'index': '0'
                    },
                    'サポート': {
                        'label': 'サポート',
                        'index': '1'
                    },
                    'マーケティング': {
                        'label': 'マーケティング',
                        'index': '2'
                    },
                    '営業': {
                        'label': '営業',
                        'index': '3'
                    },
                    '開発': {
                        'label': '開発',
                        'index': '4'
                    }
                },
                'defaultValue': ''
            },
            'ラジオボタン': {
                'type': 'RADIO_BUTTON',
                'code': 'ラジオボタン',
                'label': '目標達成度',
                'noLabel': false,
                'required': true,
                'options': {
                    '達成': {
                        'label': '達成',
                        'index': '0'
                    },
                    '未達': {
                        'label': '未達',
                        'index': '1'
                    }
                },
                'defaultValue': '達成',
                'align': 'HORIZONTAL'
            },
            '文字列__複数行_': {
                'type': 'MULTI_LINE_TEXT',
                'code': '文字列__複数行_',
                'label': '業務内容',
                'noLabel': false,
                'required': false,
                'defaultValue': ''
            },
            '文字列__複数行__0': {
                'type': 'MULTI_LINE_TEXT',
                'code': '文字列__複数行__0',
                'label': '所感、学び',
                'noLabel': false,
                'required': false,
                'defaultValue': ''
            },
            '添付ファイル': {
                'type': 'FILE',
                'code': '添付ファイル',
                'label': '添付ファイル',
                'noLabel': false,
                'required': false,
                'thumbnailSize': '150'
            },
        }
    },
    {
        'name': '新年会調整',
        'fields': {
            'ユーザー選択': {
                'type': 'USER_SELECT',
                'code': 'ユーザー選択',
                'label': 'お名前',
                'noLabel': false,
                'required': false,
                'entities': [],
                'defaultValue': []
            },
            '複数選択': {
                'type': 'MULTI_SELECT',
                'code': '複数選択',
                'label': '出席可能な日（複数選択可）',
                'noLabel': false,
                'required': false,
                'options': {
                    '11日（金）': {
                        'label': '11日（金）',
                        'index': '0'
                    },
                    '16日（水）': {
                        'label': '16日（水）',
                        'index': '1'
                    },
                    '18日（金）': {
                        'label': '18日（金）',
                        'index': '2'
                    },
                    '24日（木）': {
                        'label': '24日（木）',
                        'index': '3'
                    }
                },
                'defaultValue': []
            },
            '文字列__複数行_': {
                'type': 'MULTI_LINE_TEXT',
                'code': '文字列__複数行_',
                'label': 'コメント',
                'noLabel': false,
                'required': false,
                'defaultValue': ''
            }
        }
    }
];
exports.appTemps = appTemps;
exports.choices = choices;