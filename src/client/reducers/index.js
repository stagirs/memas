import updateData from './data';
import updateState from './state';

const reducer = (state, action) => {
  return {
    data: updateData(state, action),
    state: updateState(state, action)
  };
};

export default reducer;
