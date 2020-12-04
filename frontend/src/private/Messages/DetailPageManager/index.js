import React, { useState, useEffect } from 'react';
import { loadMessageById } from '../../../../api/messages/get-message-by-id';
import Loader from '../../../../components/Loader';
import MessagePage from './MessageDetail';
const UpdatePage = (props) => {
  const [updateData, setUpdateData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const _data = await loadMessageById({
        id: props.match.params.id,
      });
      setUpdateData(_data);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <MessagePage data={updateData} />}
    </>
  );
};
export default UpdatePage;
