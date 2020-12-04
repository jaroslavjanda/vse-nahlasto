import React, { useState, useEffect } from 'react';
import { loadNewsById } from '../../../../api/news/get-news-by-id';
import Loader from '../../../../components/Loader';
import DetailPage from './DetailPage';
const UpdatePage = (props) => {
  const [updateData, setUpdateData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _data = await loadNewsById({
        id: props.match.params.id,
      });
      setUpdateData(_data);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <DetailPage data={updateData} />}
    </>
  );
};
export default UpdatePage;
