import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faEnvelope,
  faUserCrown,
  faBuilding,
} from '@fortawesome/pro-regular-svg-icons';

export const headers = [
  {
    id: 'name',
    name: 'Jméno',
    icon: <FontAwesomeIcon icon={faAddressCard} />,
    sortable: true,
  },
  {
    id: 'email',
    name: 'Email',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    sortable: true,
  },
  {
    id: 'role',
    name: 'Role',
    icon: <FontAwesomeIcon icon={faUserCrown} />,
    sortable: true,
  },
  {
    id: 'organizationName',
    name: 'Organizace',
    icon: <FontAwesomeIcon icon={faBuilding} />,
    sortable: true,
  },
];

export const tableIdentifier = 'admins';
