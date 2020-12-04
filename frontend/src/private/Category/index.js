import React, { useState, useEffect } from 'react';
import TableMenu from './FilterMenu';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import { loadCategories } from './../../../api/category/get-categories';
import { deleteCategoryById } from './../../../api/category/delete-category-by-id';
import { headers, tableIdentifier } from './config';
import { orderBy } from 'lodash';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Category = () => {
  const [data, setData] = useState(null);
  const [sortedData, setSortedData] = useState(null);
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
      const _data = await loadCategories().catch(() => {
        alert('Fetch category failed');
      });
      setData(_data);
      setSortedData(_data);
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
            <p>Opravdu chcete smazat kategorii?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                const updatedData = data.filter(
                  (_item) => _item.id !== item.id,
                );
                await deleteCategoryById({ id: item.id }).then((result) => {
                  result === 200
                    ? setSortedData(updatedData)
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
        direction = 'desc';
        break;
      case 2:
        updateState(0);
        direction = null;
        break;
      case 0:
        updateState(1);
        direction = 'asc';
        break;
      default:
        break;
    }
    if (direction === null) {
      setSortedData(data);
    } else {
      const _sortedCollection = orderBy(data, [sortKey], [direction]);
      setSortedData(_sortedCollection);
    }
  };

  const onSearchChange = (props) => {
    const allFilter = new Set();

    data
      .filter((e) =>
        e.name
          .toUpperCase()
          .replace(' ', '')
          .includes(props.toUpperCase().replace(' ', '')),
      )
      .map((result) => allFilter.add(result));
    const dataReady = [...allFilter];
    setSortedData(dataReady);
  };

  return (
    <>
      <TableMenu onSearchChange={(props) => onSearchChange(props)} />
      {!isLoading && (
        <Table
          headers={headersSort}
          data={sortedData}
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
