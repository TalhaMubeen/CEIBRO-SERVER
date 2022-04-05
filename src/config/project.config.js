const projectPublishStatus = {
  DRAFT_PROJECT: 'draft',
  DONE_PROJECT: 'done',
  ON_GOING_PROJECT: 'On going',
  REJECTED_PROJECT: 'rejected',
  PUBLISHED_PROJECT: 'published',
  COMPLETED_PORJECT: 'completed',
  SUBMITTED_PORJECT: 'submitted',
  APPROVED_PROJECT: 'approved',
};

const rolesAccess = ['create', 'edit', 'delete', 'self-made'];

module.exports = {
  projectPublishStatus,
  rolesAccess,
};
