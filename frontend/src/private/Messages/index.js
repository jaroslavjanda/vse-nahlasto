import React, { useState, useEffect } from 'react';
import TableMenu from './FilterMenu';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import { loadMessages } from './../../../api/messages/get-messages';
import { deleteMessageById } from './../../../api/messages/delete-message-by-id';
import { headers, tableIdentifier } from './config';
import { orderBy } from 'lodash';
import { loadServices } from '../../../api/services/get-services';
import { loadCategoryOverview } from '../../../api/overviews/get-category-overview';
import { loadOrganizationOverview } from '../../../api/overviews/get-organization-overview';
import { loadAdminOverview } from '../../../api/overviews/get-admin-overview';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Category = (props) => {
  const [data, setData] = useState(null);
  const [overviews, setOverviews] = useState({
    categoryOverview: null,
    organizationOverview: null,
    adminsOverview: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);
  const [headersSort, setHeaderSort] = useState(
    headers.map((header) => ({
      ...header,
      sortDirection: 0,
    })),
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _services = await loadMessages({ filters: null }).catch(() => {
        console.log('Fetch services failed');
      });
      console.log('Normal fetch');
      setData(_services);
    };
    const fetchDataByParams = async (params) => {
      const _services = await loadMessages({ filters: params }).catch(() => {
        console.log('Fetch services failed');
      });
      console.log('Fetch with params', params);
      setData(_services);
    };
    const fetchOverviews = async () => {
      const _category = await loadCategoryOverview().catch(() => {
        console.log('Failed load category overview');
      });
      const _organization = await loadOrganizationOverview().catch(() => {
        console.log('Failed load category overview');
      });
      const _admins = await loadAdminOverview().catch(() => {
        console.log('Failed load admins overview');
      });
      setOverviews({
        ...overviews,
        categoryOverview: _category,
        organizationOverview: _organization,
        adminsOverview: _admins,
      });
    };
    fetchOverviews().then(() => setIsLoadingOverview(false));
    props.location.selectBox
      ? fetchDataByParams(props.location.selectBox).then(() =>
          setIsLoading(false),
        )
      : fetchData().then(() => setIsLoading(false));
  }, []);

  const deleteItem = async (item) => {
    const updatedData = data.filter((_item) => _item.id !== item.id);
    await deleteMessageById({ id: item.id }).then((result) =>
      result === 200 ? setData(updatedData) : console.log('Failed deleting'),
    );
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
    const _services = await loadMessages({ filters: params })
      .catch(() => {
        console.log('Fetch services failed');
      })
      .then((_services) => {
        setData(_services);
        setIsLoading(false);
      });
  };

  return (
    <>
      {!isLoadingOverview && (
        <TableMenu
          overviews={overviews}
          sentParams={props.location.selectBox}
          fetchDataWithParams={(params) => fetchDataWithParams(params)}
        />
      )}
      {!isLoading && (
        <>
          {console.log(data.data)}
          <Table
            /**havePagination={{
              total: data.total,
              perPage: data.perPage,
            }}**/
            reloadData={(params) => fetchDataWithParams(params)}
            headers={headersSort}
            data={data}
            tableIdentifier={tableIdentifier}
            deleteItem={deleteItem}
            handleSortClick={(sortKey) => handleSortClick(sortKey)}
          />
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default Category;
