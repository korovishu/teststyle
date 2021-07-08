import {
  setData,
  getData,
  pushData,
  updateData,
  updateChildData,
  removeData,
  removeChildChildData,
} from './baseActions';

export const createNav = (blogId, blogTitle) => {
  return (dispatch, getState, { getFirebase }) => {
    return setData(getFirebase, {
      ref: 'nav',
      key: blogId,
      data: { title: blogTitle },
    })
      .then(() => {
        console.log('New nav created');
      })
      .catch(() => {
        console.log('Nav creation failed');
      });
  };
};

export const addNavChild = (topicId, blogId, blogTitle) => {
  return (dispatch, getState, { getFirebase }) => {
    return updateChildData(getFirebase, {
      ref: 'nav',
      key: topicId,
      childKey: 'children',
      data: { [blogId]: blogTitle },
    })
      .then(() => {
        console.log('New child added to nav');
      })
      .catch(() => {
        console.log('Adding child to nav failed');
      });
  };
};

export const removeNavChild = (topicId, blogId) => {
  return (dispatch, getState, { getFirebase }) => {
    return removeChildChildData(getFirebase, {
      ref: 'nav',
      key: topicId,
      childKey: 'children',
      childChildKey: blogId,
    })
      .then(() => {
        console.log('Child removed nav');
      })
      .catch(() => {
        console.log('Removing child from nav failed');
      });
  };
};

export const createBlog = (parentId, title, blogData, parentName, type) => {
  return (dispatch, getState, { getFirebase }) => {
    const payload = {
      ref: 'blog',
      data: {
        title: title,
        blogData: blogData,
        childIds: [],
        parentId: parentId,
        parentTitle: parentName,
        type: type,
      },
    };

    return pushData(getFirebase, payload).then(newRef => {
      if (type === 'topic') {
        console.log('Create topic success');
        dispatch(createNav(newRef.key, title));
      } else {
        console.log('Create blog success');
        dispatch(addNavChild(parentId, newRef.key, title));
      }
    });
  };
};

export const removeBlog = blogId => {
  return (dispatch, getState, { getFirebase }) => {
    const payload = {
      ref: 'blog',
      key: blogId,
    };
    return removeData(getFirebase, payload)
      .then(() => {
        console.log('removeBlog success');
      })
      .catch(() => {
        console.log('removeBlog error');
      });
  };
};

export const editBlog = (blogId, args) => {
  return (dispatch, getState, { getFirebase }) => {
    const payload = {
      ref: 'blog',
      key: blogId,
      childKey: 'blogData',
      data: args,
    };
    return updateChildData(getFirebase, payload)
      .then(() => {
        console.log('editBlog success');
      })
      .catch(() => {
        console.log('editBlog error');
      });
  };
};

export const editBlogTitle = (blogId, newTitle) => {
  return (dispatch, getState, { getFirebase }) => {
    const payload = {
      ref: 'blog',
      key: blogId,
      data: { title: newTitle },
    };
    return updateData(getFirebase, payload)
      .then(() => {
        console.log('editBlog success');
      })
      .catch(() => {
        console.log('editBlog error');
      });
  };
};

export const getBlog = (ref, key) => {
  return (dispatch, getState, { getFirebase }) => {
    return getData(getFirebase, { ref: ref, key: key });
  };
};
