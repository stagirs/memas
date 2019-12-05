export const selectActiveChatId = (chat_id) => ({
        type: "selectActiveChatId",
        chat_id: chat_id
});
export const activateUser = (user_id) => ({
        type: "activateUser",
        user_id: user_id
});
export const deactivateUser = (user_id) => ({
        type: "deactivateUser",
        user_id: user_id
});
export const showChannel = (channel_id) => ({
        type: "showChannel",
        channel_id: channel_id
});
export const hideChannel = (channel_id) => ({
        type: "hideChannel",
        channel_id: channel_id
});
export const addChannel = (name, parent_id, created_at) => ({
        type: "addChannel",
        name: name,
        parent_id: parent_id,
        created_at: created_at
});
export const changeChannelName = (id, name) => ({
        type: "changeChannelName",
        name: name,
        id: id
});
export const addChannelMember = (id, user_id) => ({
        type: "addChannelMember",
        user_id: user_id,
        id: id
});
export const removeChannelMember = (id, user_id) => ({
        type: "removeChannelMember",
        user_id: user_id,
        id: id
});
export const addChannelMessage = (id, text) => ({
        type: "addChannelMessage",
        text: text,
        id: id
});
export const addDirectMessage = (user_id, text) => ({
        type: "addDirectMessage",
        text: text,
        user_id: user_id
});