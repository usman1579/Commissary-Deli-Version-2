import * as Actions from './constants';

/**
 * Fetch Categories
 * @returns {{type: string}}
 */
export function fetchLocation() {
  console.log('Fetch Location')
  return {
    type: Actions.GET_LOCATION,
  };
}

export function setLocation(label) {
    return {
      type: Actions.SET_LOCATION,
      payload:label
    };
  }

export function NotificationUserId (val) {
  return {
    type: Actions.SET_NOTIFICATION_USER_ID,
    payload:val
  };
}  
