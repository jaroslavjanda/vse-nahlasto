/// <reference path="../index.js" />
import React, { useState, useEffect } from 'react';
import {
  Label,
  Input,
  FormSelect,
  FormSelectWrapper,
  FormButtonCancel,
  FormButtonSave,
} from '../../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { DeleteButton } from '../../../../../components/Buttons';
import {
  Header,
  NextPanelItem,
  PanelItem,
  PanelWithItems,
  SubHeader,
} from '../../../../../components/Admin';
import { Link } from 'react-router-dom';
import * as routes from './../../../../../routes';
import { deleteAdminById } from '../../../../../api/admins/delete-admin-by-id';
import { loadRegionOverview } from '../../../../../api/overviews/get-region-overview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faUser,
  faBuilding,
} from '@fortawesome/pro-regular-svg-icons';
import { saveAdmin } from '../../../../../api/admins/save-admin';
import { loadOrganizationOverview } from '../../../../../api/overviews/get-organization-overview';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { parseToken } from '../../../../../api/token/parseToken';

const DetailPage = ({ data }) => {
  const [token, setToken] = useState(parseToken());
  const [isLoading, setIsLoading] = useState(true);
  const [overviews, setOverviews] = useState({
    organizationOverview: null,
    roleOverview: null,
  });
  const [updateData, setUpdatedData] = useState(
    data
      ? { ...data, password: '' }
      : {
          name: '',
          email: '',
          role: '',
          phoneNumber: '',
          organization: '',
          password: '',
        },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _org = await loadOrganizationOverview().catch(() => {
        console.log('Fetch organization failed');
      });
      setOverviews({
        ...overviews,
        organizationOverview: _org,
        roleOverview: [
          { id: 'SysAdmin', name: 'Administrátor' },
          { id: 'OrgAdmin', name: 'Administrátor organizace' },
          { id: 'OrgUser', name: 'Uživatel' },
        ],
      });
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
    window.location.href = '/admin/admins';
  };
  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat uživatele?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                await deleteAdminById({ id: item.id }).then((result) => {
                  result === 200 ? redirect() : console.log('Failed deleting');
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

  const saveData = (e) => {
    e.preventDefault();
    if (updateData.password.length >= 6 || updateData.password.length == 0) {
      saveAdmin(updateData).then((status) => {
        if (status == 200) redirect();
        else if (status == 422) {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="custom-ui">
                  <h1>
                    <i className="fas fa-exclamation-triangle"></i>Varování!
                  </h1>
                  <p>Uživatel s touto emailovou adresou již existuje</p>
                  <div className="line"></div>
                  <button className="yes" onClick={onClose}>
                    Ok
                  </button>
                </div>
              );
            },
          });
        } else redirect();
      });
    } else
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>
                <i className="fas fa-exclamation-triangle"></i>Varování!
              </h1>
              <p>Zadané heslo je příliš krátké (alespoň 6 znaků)</p>
              <div className="line"></div>
              <button className="yes" onClick={onClose}>
                Ok
              </button>
            </div>
          );
        },
      });
  };
  return (
    <div>
      {!isLoading && (
        <div>
          <SubHeader>Správce</SubHeader>
          <Header>{!data ? 'Vytvořit správce' : `${updateData.name}`}</Header>
          {data && (
            <PanelWithItems>
              <PanelItem>
                <Link
                  to={{
                    pathname: `${routes.ADMIN_SERVICE}`,
                    selectBox: {
                      name: '',
                      category: '',
                      solver: '',
                      organization: updateData.organizationName,
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faBuilding} /> Služby organizace
                </Link>
              </PanelItem>
              <NextPanelItem>
                <Link
                  to={{
                    pathname: `${routes.ADMIN_MESSAGE}`,
                    selectBox: {
                      name: '',
                      email: '',
                      companyIdentifier: '',
                      serviceName: '',
                      solver: updateData.id,
                      category: '',
                      organization: '',
                      created_at: '',
                      active: null,
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faFileAlt} /> Zprávy správce
                </Link>
              </NextPanelItem>
            </PanelWithItems>
          )}
          <form onSubmit={(e) => saveData(e)}>
            <Row>
              <Col xl={6}>
                <Label>Jméno</Label>
                <Input
                  id="name"
                  value={updateData.name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Col>
              <Col xl={6}>
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={updateData.email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <Label>
                  Telefon{' '}
                  <span style={{ color: '#AAAAAA' }}> | DOBROVOLNÉ</span>
                </Label>
                <Input
                  id="phoneNumber"
                  value={updateData.phoneNumber}
                  onChange={(e) => onChange(e)}
                />
              </Col>
              <Col xl={6}>
                <Label>Organizace</Label>
                <FormSelectWrapper>
                  <FormSelect
                    id="organizationName"
                    onChange={(e) => onChange(e)}
                    required
                    disabled={updateData.role == 'SysAdmin' ? true : false}
                    value={updateData.organizationName}
                  >
                    <option selected value="">
                      Vyber organizaci...
                    </option>
                    {overviews.organizationOverview.map((reg) => {
                      if (updateData.role != 'SysAdmin') {
                        if (reg.name != '-')
                          return (
                            <option key={reg.id} value={reg.id}>
                              {reg.name}
                            </option>
                          );
                      } else {
                        if (reg.name == '-')
                          return (
                            <option key={reg.id} value={reg.id} selected={true}>
                              {reg.name}
                            </option>
                          );
                      }
                    })}
                  </FormSelect>
                </FormSelectWrapper>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <Label>Role</Label>
                <FormSelectWrapper>
                  <FormSelect
                    id="role"
                    onChange={(e) => onChange(e)}
                    required
                    value={updateData.role}
                  >
                    <option selected value="">
                      Vyber roli...
                    </option>
                    {overviews.roleOverview.map((reg) => {
                      if (token.role != 'SysAdmin' && reg.id == 'SysAdmin')
                        return '';
                      else
                        return (
                          <option key={reg.id} value={reg.id}>
                            {reg.name}
                          </option>
                        );
                    })}
                  </FormSelect>
                </FormSelectWrapper>
              </Col>
              <Col xl={6}>
                <Label>{data ? 'Přepsat heslo' : 'Heslo'}</Label>
                <Input
                  id="password"
                  type="password"
                  value={updateData.password}
                  placeholder={
                    data ? 'Vložte nové heslo...' : 'Vložte heslo...'
                  }
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Row>

            <Row align="center" style={{ marginTop: '60px' }}>
              <Col xl={2}>
                {updateData.id && (
                  <DeleteButton onClick={() => deleteItem(data)}>
                    Smazat správce
                  </DeleteButton>
                )}
              </Col>
              <Col offset={{ xl: 5 }} xl={2}>
                <Link to={routes.ADMIN_ADMINS}>
                  <FormButtonCancel>Zrušit</FormButtonCancel>
                </Link>
              </Col>
              <Col xl={3}>
                <FormButtonSave type="submit">Uložit</FormButtonSave>
              </Col>
            </Row>
          </form>
        </div>
      )}
    </div>
  );
};
export default DetailPage;
