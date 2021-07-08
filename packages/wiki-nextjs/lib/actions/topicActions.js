import { updateChildData, removeChildChildData } from './baseActions';

import { addUserTopic, removeUserTopic } from './userActions';

export const removeUser = (topic_id, uid, access_type) => {
  return (dispatch, getState, { getFirebase }) => {
    return removeChildChildData(getFirebase, {
      ref: 'topic_permissions',
      key: topic_id,
      childKey: access_type,
      childChildKey: uid,
    })
      .then(() => {
        console.log(access_type, 'removed from topic');
        dispatch(removeUserTopic(uid, access_type, topic_id));
      })
      .catch(() => {
        console.log(`removing ${access_type} from topic failed`);
      });
  };
};

export const addUser = (topic_id, uid, userEmail, access_type) => {
  return (dispatch, getState, { getFirebase }) => {
    return updateChildData(getFirebase, {
      ref: 'topic_permissions',
      key: topic_id,
      childKey: access_type,
      data: { [uid]: userEmail },
    })
      .then(() => {
        console.log(`new ${access_type} added`);
        dispatch(addUserTopic(uid, access_type, topic_id, topic_id));
      })
      .catch(() => {
        console.log(`new ${access_type} addition failed`);
      });
  };
};

export const demoteUser = (topic_id, uid, userEmail) => {
  return dispatch => {
    try {
      dispatch(removeUser(topic_id, uid, 'manager'));
      dispatch(addUser(topic_id, uid, userEmail, 'member'));
      console.log('Manager demotion successful');
    } catch (err) {
      console.log('Manager demotion failed');
    }
  };
};
