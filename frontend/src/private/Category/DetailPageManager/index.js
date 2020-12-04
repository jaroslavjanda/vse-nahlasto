import React, { useState, useEffect } from 'react';
import { loadCategoryById } from '../../../../api/category/get-category-by-id';
import Loader from '../../../../components/Loader';
import CategoryPage from './DetailPage';
const CategoryUpdate = (props) => {
  const [updateData, setUpdateData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _data = await loadCategoryById({
        id: props.match.params.id,
      });
      setUpdateData(_data);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <CategoryPage data={updateData} />}
    </>
  );
};
export default CategoryUpdate;
