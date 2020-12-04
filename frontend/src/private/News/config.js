import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';

export const headers = [
  {
    id: 'title',
    name: 'Aktualita',
    icon: <FontAwesomeIcon icon={faNewspaper} />,
    sortable: true,
  },
  {
    id: 'createdDate',
    name: 'Datum uveřejnění',
    icon: <FontAwesomeIcon icon={faCalendarAlt} />,
    sortable: true,
  },
];

export const tableIdentifier = 'news';
