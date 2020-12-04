import React, { useState, useEffect } from 'react';
import {
  Label,
  Input,
  FormButtonSave,
  FormButtonCancel,
} from '../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { DeleteButton } from '../../../components/Buttons';
import { deleteAdminById } from '../../../api/admins/delete-admin-by-id';
import { SubHeader, Header } from '../../../components/Admin';
import { saveIdentity } from '../../../api/identity/save-new-identity';
import cookie from 'react-cookies';
import { loadAdminById } from '../../../api/admins/get-admin-by-id';
import { changePassword } from '../../../api/admins/change-password';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const OrganizationDetailPage = ({ data, token }) => {
  const [updateData, setUpdatedData] = useState(data ? data : {});
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [notSamePassword, setNotSamePassword] = useState(false);
  const [passwordChanging, setPasswordChanging] = useState({
    originPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  });
  const [dataChanged, setDataChanged] = useState(false);

  const [isEditingCurrentPassword, setIsEditingCurrentPassword] = useState(
    true,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _user = await loadAdminById({ id: token.id }).catch(() => {
        alert('Fetch user failed');
      });
      console.log('Normal fetch');
      setUpdatedData(_user);
    };
    fetchData();
  }, []);

  const onChange = ({ target }) => {
    setUpdatedData({
      ...updateData,
      [target.id]: target.value,
    });
  };

  const checkCurrentPassword = () => {
    if (passwordChanging.originPassword != '')
      setIsEditingCurrentPassword(false);
  };

  const redirect = () => {
    window.location.href = '/admin/settings';
  };
  const deleteAccount = async (item) => {
    if (password != '') {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>
                <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
              </h1>
              <p>Opravdu chcete smazat svůj účet?</p>
              <div className="line"></div>
              <button
                className="yes"
                onClick={async () => {
                  await deleteAdminById({ id: updateData.id }).then(
                    (result) => {
                      result === 200
                        ? sessionStorage.removeItem('token')
                        : alert('Failed deleting');
                      result === 200
                        ? cookie.remove('token', { path: '/' })
                        : alert('Failed deleting');
                      result === 200 ? redirect() : alert('Failed deleting');
                      onClose();
                    },
                  );
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
    }
  };

  const saveData = () => {
    saveIdentity(updateData).then((result) =>
      result === 200 ? setDataChanged(true) : alert('Data nejsou uložena'),
    );
  };

  const saveNewPassword = () => {
    passwordChanging.newPassword === passwordChanging.newPasswordAgain
      ? changePassword({
          oldPassword: passwordChanging.originPassword,
          newPassword: passwordChanging.newPassword,
        }).then((status) => {
          if (status != 200)
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <div className="custom-ui">
                    <h1>
                      <i className="fas fa-exclamation-triangle"></i>Heslo
                      nebylo změněno!
                    </h1>
                    <p>Zkontrolujte správnost zadaných hesel</p>
                    <div className="line"></div>
                    <button className="yes" onClick={onClose}>
                      Ok
                    </button>
                  </div>
                );
              },
            });
          setPasswordChanging({
            originPassword: '',
            newPassword: '',
            newPasswordAgain: '',
          });
          setIsEditingCurrentPassword(true);
          setIsChangingPassword(false);
        })
      : setNotSamePassword(true);
  };

  return (
    <div>
      {!isDeleting && !isChangingPassword && (
        <>
          {dataChanged && (
            <Row justify="center">
              <div style={{ color: 'green' }}>Data uložena</div>
            </Row>
          )}
          <Row>
            <Col xl={6}>
              <Label>Jméno</Label>
              <Input
                id="name"
                value={updateData.name}
                onChange={(e) => onChange(e)}
              />
            </Col>
            <Col xl={6}>
              <Label>Email</Label>
              <Input
                id="email"
                value={updateData.email}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Label>Telefon</Label>
              <Input
                id="phoneNumber"
                value={updateData.phoneNumber}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Row>
          <Row align={'center'} style={{ marginTop: '60px' }}>
            <Col xl={2}>
              <DeleteButton
                onClick={() => setIsChangingPassword(true)}
                style={{ color: '#2B2829' }}
              >
                Chci si změnit heslo
              </DeleteButton>
            </Col>
            <Col style={{ textAlign: 'right' }} offset={{ xl: 7 }} xl={3}>
              <FormButtonSave onClick={() => saveData()}>
                Uložit změny
              </FormButtonSave>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col xl={2}>
              <DeleteButton onClick={() => setIsDeleting(true)}>
                Chci si zrušit účet
              </DeleteButton>
            </Col>
          </Row>
          {token.role == 'SysAdmin' && (
            <Row style={{ marginTop: '20px' }}>
              <Col xl={2}>
                <a href={'/api/Logger'} download>
                  <DeleteButton>Stáhnout log soubor</DeleteButton>
                </a>
              </Col>
            </Row>
          )}
        </>
      )}
      {isDeleting && !isChangingPassword && (
        <>
          <SubHeader>Zrušit Účet</SubHeader>
          <Header>Tak snad jindy!</Header>
          <Row justify={'center'}>
            <Col xl={6}>
              <Label>Potvrďte heslem</Label>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Col>
          </Row>
          <Row
            justify={'center'}
            align={'center'}
            style={{ marginTop: '37px' }}
          >
            <Col xl={4}>Tato akce je nevratná! Smažem Vaše data.</Col>
            <Col xl={2}>
              <FormButtonSave onClick={() => deleteAccount(data)}>
                Zrušit účet
              </FormButtonSave>
            </Col>
          </Row>
        </>
      )}

      {!isDeleting && isChangingPassword && (
        <>
          <SubHeader>Heslo</SubHeader>
          <Header>Změna hesla</Header>
          <Row justify={'center'}>
            <Col xl={6}>
              {isEditingCurrentPassword && (
                <>
                  <Label>Aktuální heslo</Label>
                  <Input
                    type="password"
                    onChange={(e) =>
                      setPasswordChanging({
                        ...passwordChanging,
                        originPassword: e.target.value,
                      })
                    }
                    value={passwordChanging.originPassword}
                  />
                </>
              )}
              {!isEditingCurrentPassword && (
                <>
                  <Label>Nové heslo</Label>
                  <Input
                    type="password"
                    onChange={(e) =>
                      setPasswordChanging({
                        ...passwordChanging,
                        newPassword: e.target.value,
                      })
                    }
                    value={passwordChanging.newPassword}
                  />
                  <Label>Nové heslo znovu</Label>
                  <Input
                    type="password"
                    onChange={(e) =>
                      setPasswordChanging({
                        ...passwordChanging,
                        newPasswordAgain: e.target.value,
                      })
                    }
                    value={passwordChanging.newPasswordAgain}
                  />
                </>
              )}
            </Col>
          </Row>
          {isEditingCurrentPassword && (
            <Row justify="center" align="center" style={{ marginTop: '37px' }}>
              <Col offset={{ xl: 4 }} xl={2}>
                <FormButtonCancel onClick={() => checkCurrentPassword()}>
                  Pokračovat
                </FormButtonCancel>
              </Col>
            </Row>
          )}
          {!isEditingCurrentPassword && (
            <Row
              justify={'center'}
              align="center"
              style={{ marginTop: '37px' }}
            >
              <Col xl={4}>
                <span
                  style={{
                    color: 'red',
                    visibility: notSamePassword ? 'visible' : 'hidden',
                  }}
                >
                  Hesla nejsou stejná
                </span>
              </Col>
              <Col xl={2}>
                <FormButtonCancel onClick={() => saveNewPassword()}>
                  Potvrdit
                </FormButtonCancel>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
};
export default OrganizationDetailPage;
