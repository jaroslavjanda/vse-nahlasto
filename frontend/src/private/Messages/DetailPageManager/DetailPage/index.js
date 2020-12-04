import React, { useState, useEffect } from 'react';
import {
  Label,
  Input,
  FormSelect,
  FormSelectWrapper,
  FormButtonCancel,
  FormButtonSave,
  SelectWrapper,
  Select,
  FormTextArea,
} from '../../../../../components/Inputs';
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
import { loadCategoryOverview } from '../../../../../api/overviews/get-category-overview';
import { loadServices } from '../../../../../api/services/get-services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons';
import { submitForm } from '../../../../../api/services/send-form';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DetailPage = ({ data }) => {
  const [category, setCategory] = useState(null);
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateData, setUpdatedData] = useState(
    data
      ? data
      : {
          fName: '',
          lName: '',
          email: '',
          ico: '',
          phone: '',
          companyName: '',
          message: '',
          id: '',
          category: '',
        },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const _category = await loadCategoryOverview().catch(() => {
        alert('Fetch categories failed');
      });
      const _service = await loadServices({
        name: '',
        category: '',
        organization: '',
        solver: '',
      }).catch(() => {
        alert('Fetch services failed');
      });
      setCategory(_category);
      setService(_service);
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

  const saveData = (event) => {
    event.preventDefault();
    if (updateData.id != '') {
      submitForm({
        data: updateData,
      }).then(() => redirect());
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>
                <i className="fas fa-exclamation-triangle"></i>Varování!
              </h1>
              <p>Zvolte službu</p>
              <div className="line"></div>
              <button className="yes" onClick={onClose}>
                Ok
              </button>
            </div>
          );
        },
      });
    }
    return false;
  };

  return (
    <div>
      {!isLoading && (
        <div>
          <SubHeader>Zpráva</SubHeader>
          <Header>Nová zpráva</Header>
          {/**<div className="conf-button-wrapper">
            <input
              id="toggle-on"
              className="toggle toggle-left"
              name="Installation"
              value="true"
              type="radio"
              checked
            />
            <label htmlFor="toggle-on" className="btn">
              Aktivní
            </label>
            <input
              id="toggle-off"
              className="toggle toggle-right"
              name="Installation"
              value="false"
              type="radio"
            />
            <label htmlFor="toggle-off" className="btn">
              Archiv
            </label>
          </div>**/}
          <form onSubmit={(e) => saveData(e)}>
            <Row>
              <Col xl={6}>
                <Label>Jméno</Label>
                <Input
                  id="fName"
                  value={updateData.fName}
                  onChange={(e) => onChange(e)}
                  placeholder="Jan"
                  required
                />
              </Col>
              <Col xl={6}>
                <Label>Přijmení</Label>
                <Input
                  id="lName"
                  value={updateData.lName}
                  onChange={(e) => onChange(e)}
                  placeholder="Novák"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={updateData.email}
                  onChange={(e) => onChange(e)}
                  placeholder="jmeno@adresa.com"
                  required
                />
              </Col>
              <Col xl={6}>
                <Label>Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
                  placeholder="123 456 789"
                  onChange={(e) => onChange(e)}
                  value={updateData.phone}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <Label>IČO</Label>
                <Input
                  id="ico"
                  value={updateData.ico}
                  placeholder="nemáte-li IČO, pište 0"
                  onChange={(e) => onChange(e)}
                  required
                />
              </Col>
              <Col xl={6}>
                <Label>Firma</Label>
                <Input
                  id="companyName"
                  value={updateData.companyName}
                  placeholder="Alfabeta NEBO Jan Novák"
                  onChange={(e) => onChange(e)}
                  required
                />
              </Col>
            </Row>

            <Row>
              {/**<Col xl={6}>
              <Label>Kategorie</Label>
              <FormSelectWrapper>
                <FormSelect id="category" onChange={e => onChange(e)}>
                  <option selected>Vyber kategorii...</option>
                  {category.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </FormSelect>
              </FormSelectWrapper>
            </Col>**/}
              <Col xl={6}>
                <Label>Služba</Label>
                <FormSelectWrapper>
                  <FormSelect id="id" onChange={(e) => onChange(e)} required>
                    <option selected value="">
                      Vyber službu...
                    </option>
                    {service.map((ser) => (
                      <option key={ser.id} value={ser.id}>
                        {ser.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormSelectWrapper>
              </Col>
            </Row>

            <Row>
              <Col xl={12}>
                <Label>Text zprávy</Label>
                <FormTextArea
                  id="message"
                  value={updateData.message}
                  onChange={(e) => onChange(e)}
                  style={{ fontFamily: 'Arial' }}
                  required
                />
              </Col>
            </Row>

            <Row align="center" style={{ marginTop: '60px' }}>
              <Col offset={{ xl: 7 }} xl={2}>
                <Link to={routes.ADMIN_MESSAGE}>
                  <FormButtonCancel>Zrušit</FormButtonCancel>
                </Link>
              </Col>
              <Col xl={3}>
                <FormButtonSave>Uložit</FormButtonSave>
              </Col>
            </Row>
          </form>
        </div>
      )}
    </div>
  );
};
export default DetailPage;
