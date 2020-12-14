import React, { useState } from 'react';
import {
  Label,
  Input,
  FormButtonCancel,
  FormButtonSave,
  FormButton,
} from '../../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faPlus,
  faTimesCircle,
  faFileAlt,
  faUser,
} from '@fortawesome/pro-regular-svg-icons';
import {
  Header,
  PanelWithItems,
  SubHeader,
  PanelItem,
  NextPanelItem,
} from '../../../../../components/Admin';
import {
  DeleteButton,
  ButtonWrap,
  ButtonWrapNoMargin,
} from '../../../../../components/Buttons';
import { Link } from 'react-router-dom';
import * as routes from '../../../../../routes';
import { deleteOrganizationById } from '../../../../../api/organization/delete-organization-by-id';
import * as EmailValidator from 'email-validator';
import { saveOrganization } from '../../../../../api/organization/save-organization';
import { saveImage } from '../../../../../api/image/uploadImage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { parseToken } from '../../../../../api/token/parseToken';
const OrganizationDetailPage = ({ data }) => {
  const [token, setToken] = useState(parseToken());
  const [updateData, setUpdatedData] = useState(
    data
      ? data
      : {
          organizationName: '',
          picture: '',
          currentEmail: '',
          emailIsValid: '',
          notificationEmail: [],
        },
  );

  const onChange = ({ target }) => {
    setUpdatedData({
      ...updateData,
      [target.id]: target.value,
    });
  };

  const redirect = () => {
    window.location.href = '/admin/organization';
  };

  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat organizaci?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                await deleteOrganizationById({ id: item.id }).then((result) => {
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

  const deleteMail = (id) => {
    setUpdatedData({
      ...updateData,
      notificationEmail: updateData.notificationEmail.filter(
        (mail) => mail !== id,
      ),
    });
  };

  const addEmail = (e) => {
    e.preventDefault();
    if (EmailValidator.validate(updateData.currentEmail)) {
      setUpdatedData({
        ...updateData,
        notificationEmail: [
          ...updateData.notificationEmail,
          updateData.currentEmail,
        ],
        currentEmail: '',
        emailIsValid: true,
      });
    } else {
      setUpdatedData({
        ...updateData,
        emailIsValid: false,
      });
    }
  };

  const saveData = (e) => {
    e.preventDefault();
    saveImage(
      document.getElementById('picture').files.length > 0
        ? document.getElementById('picture').files[0]
        : null,
    ).then((response) => {
      saveOrganization({
        ...updateData,
        picture: response,
      }).then(() => redirect());
    });
  };
  return (
    <div>
      <SubHeader>Organizace</SubHeader>
      <Header>
        {!data ? 'Vytvořit organizaci' : updateData.organizationName}
      </Header>
      {data && (
        <PanelWithItems>
          <PanelItem>
            <Link
              to={{
                pathname: `${routes.ADMIN_ADMINS}`,
                selectBox: {
                  organizationName: updateData.id,
                },
              }}
            >
              <FontAwesomeIcon icon={faUser} /> Správci organizace
            </Link>
          </PanelItem>
          <NextPanelItem>
            <Link
              to={{
                pathname: `${routes.ADMIN_SERVICE}`,
                selectBox: {
                  organizationName: updateData.id,
                },
              }}
            >
              <FontAwesomeIcon icon={faFileAlt} /> Služby organizace
            </Link>
          </NextPanelItem>
        </PanelWithItems>
      )}
      <form onSubmit={saveData}>
        <Row align="end" justify="center">
          <Col xl={6}>
            <Label>Název organizace</Label>
            <Input
              required
              id="organizationName"
              value={updateData.organizationName}
              placeholder="Zadejte název..."
              onChange={(e) => onChange(e)}
            />
          </Col>
          <Col xl={3}>
            <Label>Obrázek organizace</Label>
            <Input
              type="file"
              style={{ display: 'none' }}
              id="picture"
              value={
                !updateData.picture.includes('http') ? updateData.picture : ''
              }
              placeholder=""
              onChange={(e) => onChange(e)}
            />
            <Input
              value={
                updateData.picture != '' ? 'Obrázek vybrán' : 'Obrázek nevybrán'
              }
              onChange={(e) => onChange(e)}
            />
          </Col>
          <Col xl={3}>
            <ButtonWrap>
              <FormButton
                type="button"
                onClick={() => document.getElementById('picture').click()}
              >
                <FontAwesomeIcon icon={faUpload} /> Nahrát
              </FormButton>
            </ButtonWrap>
          </Col>
        </Row>
        <Row align="end">
          <Col xl={4}>
            <Label>Notifikační emaily</Label>
            <Input
              isValid={updateData.emailIsValid}
              type="email"
              id="currentEmail"
              value={updateData.currentEmail}
              placeholder="Zadejte email..."
              onChange={(e) => onChange(e)}
            />
          </Col>
          <Col xl={2}>
            <ButtonWrap>
              <FormButton onClick={(e) => addEmail(e)}>
                <FontAwesomeIcon icon={faPlus} /> Přidat
              </FormButton>
            </ButtonWrap>
          </Col>
        </Row>
        <Row>
          <Col>
            {updateData.notificationEmail.map((mail) => (
              <div key={mail} style={{ marginTop: '12px' }}>
                <FontAwesomeIcon
                  style={{ color: '#F21905' }}
                  onClick={() => deleteMail(mail)}
                  icon={faTimesCircle}
                />
                <span style={{ fontSize: '24px' }}>{mail}</span>
              </div>
            ))}
          </Col>
        </Row>

        <Row align="center" style={{ marginTop: '60px' }}>
          <Col xl={2}>
            {!data || token.role != 'SysAdmin' ? (
              ''
            ) : (
              <DeleteButton onClick={() => deleteItem(data)}>
                Smazat organizaci
              </DeleteButton>
            )}
          </Col>
          <Col align="right" offset={{ xl: 6 }} xl={2}>
            <Link to={routes.ADMIN_ORGANIZATION}>
              <ButtonWrap>
                <FormButtonCancel>Zrušit</FormButtonCancel>
              </ButtonWrap>
            </Link>
          </Col>
          <Col align="right" xl={2}>
            <ButtonWrapNoMargin>
              {' '}
              <FormButtonSave type="submit">Uložit</FormButtonSave>
            </ButtonWrapNoMargin>
          </Col>
        </Row>
      </form>
    </div>
  );
};
export default OrganizationDetailPage;
