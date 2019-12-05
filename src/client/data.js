export default {
    user: {
        id: '11',
        name: 'Main User',
        channels_number: 10,
        messages_number: 100
    },    
    channels: {
        /* id канала = id пользователя + порядковый номер канала, созданный этим пользователем*/
        "11_3": {
            id: "11_3",
            name: "Главный канал",
            // для новых непрочитанных сообщений отправляем уведомление на почту
            isImportant: true,
            members: ["11", "21", "34"],
            "updated_at": "2019-12-01T12:00:00",
            messages: [
                {
                    /* id сообщения глобальный для пользователя*/
                    id: "11_5345",
                    text: "сообщение 5345 является первым",
                    created_at: "2019-12-01T11:01:00"
                },
                {
                    id: "11_5346",
                    text: "тут не поспоришь",
                    created_at: "2019-12-01T11:02:00",
                    quote_text: "является первым",
                    parent_id: "5345"
                },
                {
                    id: "21_1004",
                    text: "редактированное сообщение 1004",
                    created_at: "2019-12-01T11:03:34",
                    edited_at: "2019-12-01T11:05:23",
                    initial_text: "сообщение 1004"
                }
            ],
            is_showed: false,
            channel_ids: ["21_6", "34_2"]
        },
        "21_6": {
            id: "21_6",
            name: "Подканал 1",
            messages: [],
            members: ["21", "55"],
            "updated_at": "2019-12-03T12:00:00",
            parent_id: "11_3"
        },
        "34_2": {
            id: "34_2",
            name: "Подканал 2",
            isImportant: true,
            members: ["34"],
            messages: [],
            "updated_at": "2019-12-02T12:00:00",
            parent_id: "11_3"
        },
        "21_5": {
            id: "21_5",
            name: "Random",
            members: ["11", "21"],
            messages: [],
            "updated_at": "2019-12-01T12:00:00"
        }
    },
    "profile": {
        id: "11",
        name: "Вася Пупкин",
        messages: [
            {
                id: "11_5350",
                text: "Послание себе",
                created_at: "2019-12-01T11:02:00"
            }
        ],
        email: "vasa@pupkin.ru",
        delayNoticeInMinutes: 10
    },
    "users": {
        "21": {
            id: "21",
            name: "Гена",
            "updated_at": "2019-12-01T14:00:00",
            messages: []
        },
        "34": {
            id: "34",
            name: "Дениска",
            "updated_at": "2019-12-01T13:00:00",
            messages: []
        },
        "55": {
            id: "55",
            name: "Володя",
            "updated_at": "2019-12-01T12:00:00",
            messages: []
        }    
    },
    "updated_at": "2019-12-01T12:00:00"
}
