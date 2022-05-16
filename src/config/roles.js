const allRoles = {
  user: ['manageGroup', 'createChatRoom', 'getChatRooms', 'getUsers', 'manageProject', 'manageProfile', 'getAvailableUsers'],
  admin: [
    'manageGroup',
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
