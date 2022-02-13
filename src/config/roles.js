const allRoles = {
  user: ['createChatRoom', 'getChatRooms', 'getUsers', 'manageProject'],
  admin: ['getUsers', 'manageUsers', 'createChatRoom', 'getChatRooms', 'manageProject'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
