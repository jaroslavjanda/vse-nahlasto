import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faEnvelope,
  faBook,
  faFileAlt,
  faUser,
  faCalendarAlt,
} from '@fortawesome/pro-regular-svg-icons';

export const headers = [
  {
    id: 'name',
    name: 'Jméno',
    icon: <FontAwesomeIcon icon={faAddressCard} />,
    sortable: true,
    minWidth: '170px',
    paddingLeft: '34px',
    paddingRight: '10px',
  },
  {
    id: 'email',
    name: 'Email',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    sortable: true,
    minWidth: '150px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  {
    id: 'ico',
    name: 'IČO',
    icon: <FontAwesomeIcon icon={faBook} />,
    sortable: true,
    minWidth: '130px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  {
    id: 'service',
    name: 'Služba',
    icon: <FontAwesomeIcon icon={faFileAlt} />,
    sortable: true,
    minWidth: '160px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  {
    id: 'solver',
    name: 'Řešitel',
    icon: <FontAwesomeIcon icon={faUser} />,
    sortable: true,
    minWidth: '170px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  {
    id: 'createdDate',
    name: 'Datum vzniku',
    icon: <FontAwesomeIcon icon={faCalendarAlt} />,
    sortable: true,
    minWidth: '160px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
];

export const tableIdentifier = 'message';
