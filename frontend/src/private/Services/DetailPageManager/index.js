import React, { useState, useEffect } from 'react';
import { loadServiceListDetail } from '../../../../api/services/get-services-list-detail';
import Loader from '../../../../components/Loader';
import DetailPage from './DetailPage';
const UpdatePage = (props) => {
  const [updateData, setUpdateData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _data = await loadServiceListDetail({
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
