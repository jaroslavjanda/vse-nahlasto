import React, { useState, useEffect } from 'react';
import TableMenu from './FilterMenu';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import { loadServices } from './../../../api/services/get-services';
import { deleteServiceById } from './../../../api/services/delete-service-by-id';
import { headers, tableIdentifier } from './config';
import { orderBy } from 'lodash';
import { loadCategoryOverview } from '../../../api/overviews/get-category-overview';
import { loadOrganizationOverview } from '../../../api/overviews/get-organization-overview';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Category = (props) => {
  const [data, setData] = useState(null);
  const [overviews, setOverviews] = useState({
    categoryOverview: null,
    organizationOverview: null,
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
      const _services = await loadServices({ filters: null }).catch(() => {
        console.log('Fetch services failed');
      });
      console.log('Normal fetch');
      setData(_services);
    };
    const fetchDataByParams = async (params) => {
      const _services = await loadServices({ filters: params }).catch(() => {
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
      setOverviews({
        ...overviews,
        categoryOverview: _category,
        organizationOverview: _organization,
      });
    };
    fetchOverviews().then(() => setIsLoadingOverview(false));
    setIsLoadingOverview(false);
    props.location.selectBox
      ? fetchDataByParams(props.location.selectBox).then(() =>
          setIsLoading(false),
        )
      : fetchData().then(() => setIsLoading(false));
  }, []);

  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat službu?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                const updatedData = data.filter(
                  (_item) => _item.id !== item.id,
                );
                await deleteServiceById({ id: item.id }).then((result) => {
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
    const _services = await loadServices({ filters: params })
      .catch(() => {
        alert('Fetch services failed');
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
      {!isLoading && !isLoadingOverview && (
        <Table
          headers={headersSort}
          data={data}
          tableIdentifier={tableIdentifier}
          deleteItem={deleteItem}
          handleSortClick={(sortKey) => handleSortClick(sortKey)}
          overviews={overviews}
        />
      )}
      {(isLoading || isLoadingOverview) && <Loader />}
    </>
  );
};

export default Category;
