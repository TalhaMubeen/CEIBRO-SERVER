const allRoles = {
  user: ['createChatRoom', 'getChatRooms', 'getUsers', 'manageProject', 'manageProfile', 'getAvailableUsers'],
  admin: [
    'getUsers',
    'manageUsers',
    'createChatRoom',
    'getChatRooms',
    'manageProject',
    'manageProfile',
    'getAvailableUsers',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
