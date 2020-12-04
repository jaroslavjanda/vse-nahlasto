import React, { useState, useEffect } from 'react';
import TableMenu from './FilterMenu';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import { deleteNewsById } from './../../../api/news/delete-news-by-id';
import { headers, tableIdentifier } from './config';
import { orderBy } from 'lodash';
import { loadNews } from '../../../api/news/get-news-list';
import { loadServices } from '../../../api/services/get-services';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Category = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [headersSort, setHeaderSort] = useState(
    headers.map((header) => ({
      ...header,
      sortDirection: 0,
    })),
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _data = await loadNews({ filters: null }).catch(() => {
        alert('Fetch news failed');
      });
      setData(_data);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);

  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat aktualitu?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                const updatedData = data.filter(
                  (_item) => _item.id !== item.id,
                );
                await deleteNewsById({ id: item.id }).then((result) => {
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
    const _news = await loadNews({ filters: params })
      .catch(() => {
        alert('Fetch news failed');
      })
      .then((_news) => {
        setData(_news);
        setIsLoading(false);
      });
  };

  return (
    <>
      <TableMenu
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
