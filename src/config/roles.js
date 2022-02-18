const allRoles = {
  user: ['createChatRoom', 'getChatRooms', 'getUsers', 'manageProject', 'manageProfile'],
  admin: ['getUsers', 'manageUsers', 'createChatRoom', 'getChatRooms', 'manageProject', 'manageProfile'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
