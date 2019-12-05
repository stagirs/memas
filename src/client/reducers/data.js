export default (store, action) => {

  switch (action.type) {
    case 'showChannel':
      return {
        ...store.data,
        channels:{
            ... store.data.channels,
            [action.channel_id]: {
                ... store.data.channels[action.channel_id],
                is_showed: true
            }
        }
      };
    case 'hideChannel':
      return {
        ...store.data,
        channels:{
            ... store.data.channels,
            [action.channel_id]: {
                ... store.data.channels[action.channel_id],
                is_showed: false
            }
        }
      };  
    case 'addChannel':
        const id = store.data.user.id + "_" + store.data.user.channels_number;
        const storeData = {
            ...store.data,
            channels:{
                [id]: {
                    id: id,
                    name: action.name,
                    parent_id: action.parent_id,
                    messages: [],
                    updated_at: action.created_at,
                },
                ... store.data.channels
            },
            user:{
                ... store.data.user,
                channels_number: store.data.user.channels_number + 1
            }
        }
        const parent = store.data.channels[action.parent_id];
        if(parent){
            storeData.channels[action.parent_id] = {
                ... parent,
                channel_ids: !parent.channel_ids ? [id] : [id, ... parent.channel_ids]
            }
        }
        return storeData;   
    default:
      return store.data;
  }
};
