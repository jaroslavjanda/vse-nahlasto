import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faFileAlt } from '@fortawesome/pro-regular-svg-icons';

export const headers = [
  {
    id: 'name',
    name: 'Kategorie',
    icon: <FontAwesomeIcon icon={faFolderOpen} />,
    sortable: true,
  },
  {
    id: 'servicesCount',
    name: 'Služeb',
    icon: <FontAwesomeIcon icon={faFileAlt} />,
    sortable: false,
  },
];

export const tableIdentifier = 'category';
