const admin = require('firebase-admin');

admin.initializeApp({
});

// Parse Generic Error
module.exports.parseError = errorObj => {
  const status = Number(errorObj.message);
  if (isNaN(status)) {
    return { status: 500, data: {result: false, error: errorObj.message} };
  } else {
    let error = 'Invalid request';
    switch (status) {
    case 401:
      error = 'Unauthorized request';
      break;
    }
    return { status, data: {result: false, error} };
  }
};

/**
 * Get Data from firebase table by path
 * @param {string} path
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getFirebaseData = async (path) => {
  return admin.database()
    .ref(path)
    .once('value')
    .then(sn => sn.val());
};

/**
 * Get User info
 * @param {string} uid
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getUserInfo = async (uid) => {
  return admin.auth().getUser(uid);
};

/**
 * Set Data from firebase table by path
 * @param {string} path
 * @param {Object} data
 * @throws {Error}
 * @return {Promise}
 */
module.exports.setFirebaseData = async (path, data) => {
  return admin.database()
    .ref(path)
    .set(data);
};
