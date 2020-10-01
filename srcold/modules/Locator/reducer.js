import {fromJS} from 'immutable';

import * as Actions from './constants';

const initState = fromJS({
  Location: [],
  selectedLocation:{
    id:'',
    name:'',
  },
  loading: false,
});

export default function locationReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.GET_LOCATION:
      return state.set('loading', true);
    case Actions.GET_LOCATION_SUCCESS:
      return state.set('loading', false).set('Location', fromJS(action.payload));
    case Actions.GET_LOCATION_ERROR:
      return state.set('loading', false).set('Location', initState.get('Location'));
    case Actions.SET_LOCATION:
        return state.set('selectedLocation', action.payload);
    case 'UPDATE_DEMO_CONFIG_SUCCESS':
      return initState;
    default:
      return state;
  }
}
