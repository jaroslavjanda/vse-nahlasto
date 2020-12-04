import React, { useState, useEffect } from 'react';
import TableMenu from './FilterMenu';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import { loadAdmins } from './../../../api/admins/get-admins';
import { deleteAdminById } from './../../../api/admins/delete-admin-by-id';
import { headers, tableIdentifier } from './config';
import { orderBy } from 'lodash';
import { loadOrganizationOverview } from '../../../api/overviews/get-organization-overview';
import { loadServices } from '../../../api/services/get-services';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Category = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);
  const [overviews, setOverviews] = useState({
    organizationOverview: null,
  });
  const [headersSort, setHeaderSort] = useState(
    headers.map((header) => ({
      ...header,
      sortDirection: 0,
    })),
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAdmins = async () => {
      const _data = await loadAdmins({ filters: null }).catch(() => {
        alert('Fetch services failed');
      });
      setData(_data);
    };

    const fetchOverview = async () => {
      const _organization = await loadOrganizationOverview().catch(() => {
        alert('Failed load category overview');
      });
      setOverviews({
        ...overviews,
        organizationOverview: _organization,
      });
    };

    const fetchAdminsByParams = async (params) => {
      const _data = await loadAdmins({ filters: params }).catch(() => {
        alert('Fetch services failed');
      });
      console.log('Fetch with params', params);
      setData(_data);
    };
    fetchOverview().then(() => setIsLoadingOverview(false));
    props.location.selectBox
      ? fetchAdminsByParams({
          name: '',
          email: '',
          organizationName: props.location.selectBox.organizationName,
        }).then(() => setIsLoading(false))
      : fetchAdmins().then(() => setIsLoading(false));
  }, []);

  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat uživatele?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                const updatedData = data.filter(
                  (_item) => _item.id !== item.id,
                );
                await deleteAdminById({ id: item.id }).then((result) => {
                  result === 200
                    ? setData(updatedData)
                    : alert('Failed deleting');
                  onClose();
                });
              }}
            >
              <i className="far fa-trash-alt"></i>Ano
            </button>
            <button className="no" onClick={onClose}>
              Ne
            </button>
          </div>
        );
      },
    });
  };

  const handleSortClick = (sortKey) => {
    const item = headersSort.filter((header) => header.id === sortKey)[0];
    const updateState = (num) => {
      setHeaderSort(
        headersSort.map((u) => {
          if (u.id === sortKey) {
            return {
              ...u,
              sortDirection: num,
            };
          } else {
            return {
              ...u,
              sortDirection: 0,
            };
          }
        }),
      );
    };
    let direction;
    switch (item.sortDirection) {
      case 1:
        updateState(2);
        direction = 'asc';
        break;
      case 2:
        updateState(0);
        direction = 'desc';
        break;
      case 0:
        updateState(1);
        direction = 'desc';
        break;
      default:
        break;
    }
    const _sortedCollection = orderBy(data, [sortKey], [direction]);
    setData(_sortedCollection);
  };

  const fetchDataWithParams = async (params) => {
    setIsLoading(true);
    const _data = await loadAdmins({ filters: params })
      .catch(() => {
        alert('Fetch services failed');
      })
      .then((_data) => {
        setData(_data);
        setIsLoading(false);
      });
  };

  return (
    <>
      <TableMenu
        overviews={overviews}
        sentParams={props.location.selectBox}
        fetchDataWithParams={(params) => fetchDataWithParams(params)}
      />
      {!isLoading && (
        <Table
          headers={headersSort}
          data={data}
          tableIdentifier={tableIdentifier}
          deleteItem={deleteItem}
          handleSortClick={(sortKey) => handleSortClick(sortKey)}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default Category;
