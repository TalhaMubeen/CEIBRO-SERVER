const projectPublishStatus = {
  DRAFT_PROJECT: 'draft',
  DONE_PROJECT: 'done',
  ON_GOING_PROJECT: 'On going',
  REJECTED_PROJECT: 'rejected',
  PUBLISHED_PROJECT: 'published',
};

const rolesAccess = ['create', 'edit', 'delete', 'self-made'];

module.exports = {
  projectPublishStatus,
  rolesAccess,
};
