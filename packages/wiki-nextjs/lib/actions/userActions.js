import { updateChildData, removeChildChildData } from './baseActions';

export const removeUserTopic = (uid, access_type, topic_id) => {
  return (dispatch, getState, { getFirebase }) => {
    return removeChildChildData(getFirebase, {
      ref: 'user_permissions',
      key: uid,
      childKey: access_type,
      childChildKey: topic_id,
    })
      .then(() => {
        console.log(`topic removed from ${access_type} list`);
      })
      .catch(() => {
        console.log(`removing topic from ${access_type} list failed`);
      });
  };
};

export const addUserTopic = (uid, access_type, topic_id, title) => {
  return (dispatch, getState, { getFirebase }) => {
    return updateChildData(getFirebase, {
      ref: 'user_permissions',
      key: uid,
      childKey: access_type,
      data: { [topic_id]: title },
    })
      .then(() => {
        console.log(`topic added to ${access_type} list`);
      })
      .catch(() => {
        console.log(`adding topic to ${access_type} list failed`);
      });
  };
};
