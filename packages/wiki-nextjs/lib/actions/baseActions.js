export const setData = (getFirebase, payload) => {
  const firebase = getFirebase().database();
  return firebase.ref(payload.ref).child(payload.key).set(payload.data);
};

export const pushData = (getFirebase, payload) => {
  const firebase = getFirebase().database();
  return firebase.ref(payload.ref).push(payload.data);
};

export const removeData = (getFirebase, payload) => {
  const firebase = getFirebase().database();
  return firebase.ref(payload.ref).child(payload.key).remove();
};

export const removeChildChildData = (getFirebase, payload) => {
  const firebase = getFirebase().database();
  return firebase
    .ref(payload.ref)
    .child(payload.key)
    .child(payload.childKey)
    .child(payload.childChildKey)
    .remove();
};

export const updateData = (getFirebase, payload) => {
  const firebase = getFirebase().database();
  return firebase.ref(payload.ref).child(payload.key).update(payload.data);
};

export const updateChildData = (getFirebase, payload) => {
  const firebase = getFirebase().database();
  return firebase
    .ref(payload.ref)
    .child(payload.key)
    .child(payload.childKey)
    .update(payload.data);
};

export const getData = (getFirebase, payload) => {
  const firebase = getFirebase().database();

  return firebase
    .ref(payload.ref)
    .child(payload.key)
    .get()
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.log('Error', error);
    });
};
