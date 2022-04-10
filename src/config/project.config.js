const projectPublishStatus = {
  DRAFT_PROJECT: 'draft',
  DONE_PROJECT: 'done',
  ON_GOING_PROJECT: 'ongoing',
  REJECTED_PROJECT: 'rejected',
  PUBLISHED_PROJECT: 'published',
  COMPLETED_PORJECT: 'completed',
  SUBMITTED_PORJECT: 'submitted',
  APPROVED_PROJECT: 'approved',
};

const avaialablePermissions = {
  create_permission: 'create',
  edit_permission: 'edit',
  delete_permission: 'delete',
  self_made_permission: 'self-made',
};

const roleEntities = {
  ROLE_ENTITY: 'roles',
  MEMBER_ENTITY: 'member',
  TIMEPROFILE_ENTITY: 'timeProfile',
};

const rolesAccess = Object.values(avaialablePermissions);
const memberAccess = Object.values(avaialablePermissions);
const timeProfileAccess = Object.values(avaialablePermissions);

module.exports = {
  projectPublishStatus,
  rolesAccess,
  memberAccess,
  timeProfileAccess,
  avaialablePermissions,
  roleEntities,
};
