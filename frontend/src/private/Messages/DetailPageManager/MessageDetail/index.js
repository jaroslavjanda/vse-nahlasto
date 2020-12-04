import React, { useState, useEffect } from 'react';
import {
  Label,
  SmallLabel,
  Input,
  FormSelect,
  FormSelectWrapper,
  Select,
  SelectWrapper,
  FormButtonCancel,
  FormButtonSave,
  FormTextArea,
} from '../../../../../components/Inputs';
import { FilterMenu } from './../../../../../components/Admin';

import { Row, Col } from 'react-grid-system';
import { DeleteButton } from '../../../../../components/Buttons';
import {
  Header,
  PanelWithItems,
  SubHeader,
} from '../../../../../components/Admin';
import { Link } from 'react-router-dom';
import * as routes from './../../../../../routes';
import { deleteServiceById } from '../../../../../api/services/delete-service-by-id';
import { loadRegionOverview } from '../../../../../api/overviews/get-region-overview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faFolderOpen,
  faBuilding,
  faInfo,
} from '@fortawesome/pro-regular-svg-icons';
import { loadAdmins } from '../../../../../api/admins/get-admins';
import { saveChanges } from '../../../../../api/messages/save-changes';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteAdminById } from '../../../../../api/admins/delete-admin-by-id';
import { deleteMessageById } from '../../../../../api/messages/delete-message-by-id'; // Import css
const DetailPage = ({ data }) => {
  const [region, setRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [updateData, setUpdatedData] = useState({
    ...data,
    solverId: data.solver ? data.solver.id : '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let params = {
        name: '',
        email: '',
        organizationName: updateData.organizationOverview.id,
      };
      const _admins = await loadAdmins({ filters: params }).catch(() => {
        console.log('Failed load admins overview');
      });
      setUsers(_admins);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);

  const onChange = ({ target }) => {
    setUpdatedData({
      ...updateData,
      [target.id]: target.value,
    });
  };
  const redirect = () => {
    window.location.href = '/admin/message';
  };

  const saveData = (archive) => {
    saveChanges({
      note: updateData.note,
      solverId: updateData.solverId,
      archived: archive,
      id: updateData.id,
    }).then(() => redirect());
  };

  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat zprávu?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                await deleteMessageById({ id: item.id }).then((result) => {
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

  return (
    <div>
      {!isLoading && (
        <>
          <Row>
            <Col xl={6}>
              <FilterMenu style={{ paddingBottom: '49px' }}>
                <SmallLabel>Informace o odesílateli</SmallLabel>
                <p>
                  <strong>{updateData.name}</strong>
                </p>
                <p>{updateData.organization}</p>
                <p>{updateData.typeOfEntity}</p>
                <p style={{ textDecoration: 'underline' }}>
                  {updateData.email}
                </p>
                <p style={{ textDecoration: 'underline' }}>
                  {updateData.phoneNumber}
                </p>
                <p>
                  <span>IČO: </span>
                  <span style={{ color: '#5067D6' }}>{updateData.ico}</span>
                </p>
              </FilterMenu>
            </Col>
            <Col xl={6}>
              <FilterMenu style={{ paddingBottom: '24px', color: '#5067d6' }}>
                <SmallLabel>Informace o zprávě</SmallLabel>
                <Row style={{ marginTop: '12px' }}>
                  <Col md={4}>
                    <strong>
                      <FontAwesomeIcon
                        style={{ minWidth: '20px' }}
                        icon={faFileAlt}
                      />{' '}
                      Služba
                    </strong>
                  </Col>
                  <Col>
                    <a
                      style={{ color: 'black', textDecoration: 'underline' }}
                      href={`/services/detail/${data.service.id}`}
                    >
                      {data.service.name}
                    </a>
                  </Col>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                  <Col md={4}>
                    <strong>
                      <FontAwesomeIcon
                        style={{ minWidth: '20px' }}
                        icon={faFolderOpen}
                      />{' '}
                      Kategorie
                    </strong>
                  </Col>
                  <Col style={{ color: 'black' }}>{data.category}</Col>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                  <Col md={4}>
                    <strong>
                      <FontAwesomeIcon
                        style={{ minWidth: '20px' }}
                        icon={faBuilding}
                      />{' '}
                      Organizace
                    </strong>
                  </Col>
                  <Col style={{ color: 'black' }}>
                    {data.organizationOverview.name}
                  </Col>
                </Row>

                <Row style={{ marginTop: '12px' }}>
                  <Col md={4}>
                    <strong>
                      <FontAwesomeIcon
                        style={{ minWidth: '20px' }}
                        icon={faInfo}
                      />{' '}
                      Stav
                    </strong>
                  </Col>
                  <Col style={{ color: 'black' }}>
                    {data.archived ? 'Archiv' : 'Aktivní'}
                  </Col>
                </Row>
                <SmallLabel style={{ marginTop: '24px' }}>Řešitel</SmallLabel>
                <SelectWrapper style={{ width: '300px' }}>
                  <Select
                    id="solverId"
                    value={updateData.solverId}
                    onChange={(e) => onChange(e)}
                  >
                    <option value="">Vyber řešitele</option>
                    {!users ? (
                      <option>No data</option>
                    ) : (
                      users.map((user) => {
                        return (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        );
                      })
                    )}
                  </Select>
                </SelectWrapper>
              </FilterMenu>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Label>Zpráva</Label>
              <FormTextArea
                id="description"
                value={updateData.content}
                onChange={(e) => onChange(e)}
                style={{ fontFamily: 'Arial' }}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Label>Poznámka</Label>
              <Input
                id="note"
                value={updateData.note}
                onChange={(e) => onChange(e)}
                placeholder="Zadejte poznámku..."
              />
            </Col>
          </Row>

          <Row align="center" style={{ marginTop: '60px' }}>
            <Col xl={2}>
              <DeleteButton onClick={() => deleteItem(data)}>
                Smazat zprávu
              </DeleteButton>
            </Col>
            <Col offset={{ xl: 3 }} xl={2}>
              <Link to={routes.ADMIN_MESSAGE}>
                <FormButtonCancel>Zrušit</FormButtonCancel>
              </Link>
            </Col>
            <Col xl={2}>
              <FormButtonCancel onClick={() => saveData(true)}>
                Archivovat
              </FormButtonCancel>
            </Col>
            <Col xl={3}>
              <FormButtonSave onClick={() => saveData(false)}>
                Uložit
              </FormButtonSave>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
export default DetailPage;
