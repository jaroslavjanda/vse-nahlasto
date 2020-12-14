import React, { useState } from 'react';
import {
  Label,
  Input,
  FormButtonCancel,
  FormButtonSave,
  FormButton,
} from '../../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import {
  ButtonWrapNoMargin,
  DeleteButton,
  ButtonWrap,
} from '../../../../../components/Buttons';
import { Header, SubHeader } from '../../../../../components/Admin';
import { Link } from 'react-router-dom';
import * as routes from './../../../../../routes';
import { deleteNewsById } from '../../../../../api/news/delete-news-by-id';
import { Editor } from '@tinymce/tinymce-react';
import { saveMessage } from '../../../../../api/messages/save-message';
import { saveImage } from '../../../../../api/image/uploadImage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DetailPage = ({ data }) => {
  const [updateData, setUpdatedData] = useState(
    data
      ? data
      : {
          title: '',
          image: '',
          content: '',
        },
  );

  const onChange = ({ target }) => {
    setUpdatedData({
      ...updateData,
      [target.id]: target.id == 'content' ? target.getContent() : target.value,
    });
  };
  const redirect = () => {
    window.location.href = '/admin/news';
  };

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
                await deleteNewsById({ id: item.id }).then((result) => {
                  result === 200 ? redirect() : alert('Failed deleting');
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

  const saveData = (e, publish) => {
    e.preventDefault();
    saveImage(
      document.getElementById('image').files.length > 0
        ? document.getElementById('image').files[0]
        : null,
    ).then((response) => {
      saveMessage(
        {
          ...updateData,
          image: response,
        },
        publish,
      ).then(() => redirect());
    });
  };

  return (
    <div>
      <div>
        <SubHeader>Aktualita</SubHeader>
        <Header>{!data ? 'Vytvoř aktualitu' : updateData.title}</Header>
        <form>
          <Row align="end" justify="center">
            <Col xl={6}>
              <Label>Název aktuality</Label>
              <Input
                id="title"
                value={updateData.title}
                onChange={(e) => onChange(e)}
                placeholder="Zadejte název..."
              />
            </Col>
            <Col xl={3}>
              <Label>Obrázek aktuality</Label>
              <Input
                type="file"
                style={{ display: 'none' }}
                id="image"
                value={
                  !updateData.image.includes('http') ? updateData.image : ''
                }
                placeholder=""
                onChange={(e) => onChange(e)}
              />
              <Input
                value={
                  updateData.image != '' ? 'Obrázek vybrán' : 'Obrázek nevybrán'
                }
                onChange={(e) => onChange(e)}
              />
            </Col>
            <Col xl={3}>
              <ButtonWrap>
                {' '}
                <FormButton
                  type="button"
                  onClick={() => document.getElementById('image').click()}
                >
                  Nahrát
                </FormButton>
              </ButtonWrap>
            </Col>
          </Row>
          <Row align="end">
            <Col xl={12}>
              <Label>Text aktuality</Label>
              <Editor
                initialValue={updateData.content}
                apiKey={'l21yby61jwct5j1c9l72pp0s3o02oipcg118rjynd4nq5sfr'}
                id="content"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
                }}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Row>
          <Row align="right" style={{ marginTop: '60px' }}>
            <Col xl={2}>
              {data ? (
                <DeleteButton onClick={() => deleteItem(data)}>
                  Smazat zprávu
                </DeleteButton>
              ) : (
                <div></div>
              )}
            </Col>
            <Col offset={{ xl: 2 }} xl={2}>
              <Link to={routes.ADMIN_NEWS}>
                <ButtonWrapNoMargin>
                  <FormButtonCancel>Zrušit</FormButtonCancel>
                </ButtonWrapNoMargin>
              </Link>
            </Col>
            <Col xl={2}>
              <Link>
                <ButtonWrap>
                  {' '}
                  <FormButtonCancel onClick={(e) => saveData(e, false)}>
                    Uložit jako koncept
                  </FormButtonCancel>
                </ButtonWrap>
              </Link>
            </Col>
            <Col xl={3}>
              <ButtonWrapNoMargin>
                {' '}
                <FormButtonSave
                  onClick={(e) => saveData(e, true)}
                  type="submit"
                >
                  Uložit
                </FormButtonSave>
              </ButtonWrapNoMargin>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};
export default DetailPage;
