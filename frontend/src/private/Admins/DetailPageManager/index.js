import React, { useState, useEffect } from 'react';
import { loadAdminById } from '../../../../api/admins/get-admin-by-id';
import Loader from '../../../../components/Loader';
import DetailPage from './DetailPage';
const UpdatePage = (props) => {
  const [updateData, setUpdateData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const _data = await loadAdminById({
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
