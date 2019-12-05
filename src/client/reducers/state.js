export default (store, action) => {


    switch (action.type) {

        case 'selectActiveChatId':
            return {
                ...store.state,
                active_chat_id: action.chat_id
            };
        case 'activateUser': {
            let set = new Set(store.state.active_users);
            set.add(action.user_id);
            return {
                ...store.state,
                active_users: set
            };
        }    
        case 'deactivateUser': {
            let set = new Set(store.state.active_users);
            set.delete(action.user_id);
            return {
                ...store.state,
                active_users: set
            };
        }
        default:
            return store.state;
    }
};
