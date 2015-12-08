/**
 * Created by naor on 12/7/15.
 */

(function () {
  const userList = document.querySelector('#userList');
  const userMap = {};
  const userDataMap = {};

  io.socket.get('/user', list => {
    list.forEach(addUserEl);
  });

  io.socket.on('user', change => {
    console.log('change', change);
    const userData = change.data;
    switch (change.verb) {
      case 'created':
        addUserEl(userData);
        break;
      case 'updated':
        const key = 'user' + change.id;
        const userEl = userMap[key];
        const data = userDataMap[key];
        Object.assign(data, userData);
        userEl.textContent = formatUser(data);
      break;
      case 'deleted':

        // TODO: Complete this one

      break;
    }
  });

  function addUserEl(userData) {
    const userEl = document.createElement('li');
    const key = 'user' + userData.id;
    userMap[key] = userEl;
    userDataMap[key] = userData;
    userEl.textContent = formatUser(userData);
    userList.appendChild(userEl);
  }

  function formatUser(userData) {
    return `${userData.name} | born: ${new Date(userData.dateOfBirth).getFullYear()}`;
  }
})();

