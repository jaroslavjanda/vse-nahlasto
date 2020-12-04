import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFileAlt,
  faBuilding,
} from '@fortawesome/pro-regular-svg-icons';

export const headers = [
  {
    id: 'name',
    name: 'Služba',
    icon: <FontAwesomeIcon icon={faFileAlt} />,
    sortable: true,
  },
  {
    id: 'category',
    name: 'Kategorie',
    icon: <FontAwesomeIcon icon={faFolderOpen} />,
    sortable: true,
  },
  {
    id: 'organization',
    name: 'Organizace',
    icon: <FontAwesomeIcon icon={faBuilding} />,
    sortable: true,
    minWidth: '190px',
  },
];

export const tableIdentifier = 'service';
