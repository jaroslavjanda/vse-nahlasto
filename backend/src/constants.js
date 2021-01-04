import path from 'path';

export const ROOT_DIR = path.resolve(__dirname, '..');

const TICKET_UPLOAD_DIR = path.resolve(
  ROOT_DIR,
  'public/images/uploads/tickets',
);
const COMMUNITY_UPLOAD_DIR = path.resolve(
  ROOT_DIR,
  'public/images/uploads/communities',
);
const COMMENT_UPLOAD_DIR = path.resolve(
  ROOT_DIR,
  'public/images/uploads/comments',
);

export const DirType = {
  TICKET_UPLOAD_DIR: 'TICKET_UPLOAD_DIR',
  COMMUNITY_UPLOAD_DIR: 'COMMUNITY_UPLOAD_DIR',
};

export const resolverDIR = (DIR) => {
  switch (DIR) {
    case DirType.TICKET_UPLOAD_DIR:
      return TICKET_UPLOAD_DIR;
    case DirType.COMMUNITY_UPLOAD_DIR:
      return COMMUNITY_UPLOAD_DIR;
    default:
      return '';
  }
};


