import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faUser,
  faUserCowboy,
  faFileAlt,
} from '@fortawesome/pro-regular-svg-icons';

export const headers = [
  {
    id: 'name',
    name: 'Organizace',
    icon: <FontAwesomeIcon icon={faBuilding} />,
    sortable: true,
  },
  {
    id: 'orgAdminCount',
    name: 'Administrátorů organizace',
    icon: <FontAwesomeIcon icon={faUserCowboy} />,
    sortable: true,
  },
  {
    id: 'orgUserCount',
    name: 'Uživatelů',
    icon: <FontAwesomeIcon icon={faUser} />,
    sortable: true,
  },
  {
    id: 'serviceCount',
    name: 'Služeb',
    icon: <FontAwesomeIcon icon={faFileAlt} />,
    sortable: false,
  },
];

export const tableIdentifier = 'organization';
