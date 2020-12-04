import React, { useState, useEffect } from 'react';
import { loadOrganizationById } from '../../../../api/organization/get-organization-by-id';
import Loader from '../../../../components/Loader';
import OrganizationDetailPage from './DetailPage';
const OrganizationUpdate = (props) => {
  const [updateData, setUpdateData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _data = await loadOrganizationById({
        id: props.match.params.id,
      });
      setUpdateData(_data);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <OrganizationDetailPage data={updateData} />}
    </>
  );
};
export default OrganizationUpdate;
