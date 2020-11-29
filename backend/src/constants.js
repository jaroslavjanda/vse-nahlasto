import path from 'path';

export const ROOT_DIR = path.resolve(__dirname, '..');
export const TICKET_UPLOAD_DIR = path.resolve(
  ROOT_DIR,
  'public/images/uploads/tickets',
);
export const COMMUNITY_UPLOAD_DIR = path.resolve(
  ROOT_DIR,
  'public/images/uploads/communities',
);
export const COMMENT_UPLOAD_DIR = path.resolve(
  ROOT_DIR,
  'public/images/uploads/comments',
);
