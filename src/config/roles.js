const allRoles = {
  user: [
    "createChatRoom",
    "getChatRooms",
    "getUsers"
  ],
  admin: [
    'getUsers', 
    'manageUsers',
    'createChatRoom',
    "getChatRooms"
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
