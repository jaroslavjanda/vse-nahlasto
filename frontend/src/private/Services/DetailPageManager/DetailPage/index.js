import React, { useState, useEffect } from 'react';
import {
  Label,
  Input,
  FormSelect,
  FormSelectWrapper,
  FormButtonCancel,
  FormButtonSave,
  FormTextArea,
} from '../../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { DeleteButton } from '../../../../../components/Buttons';
import { Header, SubHeader } from '../../../../../components/Admin';
import { Link } from 'react-router-dom';
import * as routes from './../../../../../routes';
import { deleteServiceById } from '../../../../../api/services/delete-service-by-id';
import { loadRegionOverview } from '../../../../../api/overviews/get-region-overview';
import { loadCategoryOverview } from '../../../../../api/overviews/get-category-overview';
import { loadOrganizationOverview } from '../../../../../api/overviews/get-organization-overview';
import { saveService } from '../../../../../api/services/save-service';
import Loader from '../../../../../components/Loader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DetailPage = ({ data, location }) => {
  const [overviews, setOverviews] = useState({
    categoryOverview: null,
    organizationOverview: null,
    regionOverview: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [updateData, setUpdatedData] = useState(
    data
      ? data
      : {
          category: '',
          name: '',
          organizationName: '',
          fullOrganizationName: '',
          region: '',
          description: '',
          targetGroup: '',
        },
  );

  useEffect(() => {
    const fetchOverviews = async () => {
      const _category = await loadCategoryOverview().catch(() => {
        alert('Failed load category overview');
      });
      const _organization = await loadOrganizationOverview().catch(() => {
        alert('Failed load category overview');
      });
      const _region = await loadRegionOverview().catch(() => {
        alert('Fetch services failed');
      });
      setOverviews({
        ...overviews,
        categoryOverview: _category,
        organizationOverview: _organization,
        regionOverview: _region,
      });
    };
    fetchOverviews().then(() => setIsLoading(false));
  }, []);

  const onChange = ({ target }) => {
    setUpdatedData({
      ...updateData,
      [target.id]: target.value,
    });
  };
  const redirect = () => {
    window.location.href = '/admin/service';
  };
  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat službu?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                await deleteServiceById({ id: item.id }).then((result) => {
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

  const saveData = (e) => {
    e.preventDefault();
    saveService(updateData).then(() => redirect());
  };
  const { categoryOverview, organizationOverview, regionOverview } = overviews;
  return (
    <div>
      {!isLoading && (
        <div>
          <SubHeader>Služba</SubHeader>
          <Header>{!data ? 'Nová služba' : updateData.name}</Header>
          <form onSubmit={(e) => saveData(e)}>
            <Row>
              <Col xl={6}>
                <Label>Název služby</Label>
                <Input
                  required
                  id="name"
                  placeholder="Zadejte název..."
                  value={updateData.name}
                  onChange={(e) => onChange(e)}
                />
              </Col>
              <Col xl={6}>
                <Label>Kategorie služby</Label>
                <FormSelectWrapper>
                  <FormSelect
                    id="category"
                    onChange={(e) => onChange(e)}
                    required
                    value={updateData.category}
                  >
                    <option value="">Vyber kategorii...</option>
                    {categoryOverview.map((reg) => (
                      <option key={reg.id} value={reg.id}>
                        {reg.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormSelectWrapper>
              </Col>
            </Row>
            <Row>
              <Col xl={6}>
                <Label>Organizace</Label>
                <FormSelectWrapper>
                  <FormSelect
                    id="organizationName"
                    onChange={(e) => onChange(e)}
                    required
                    value={updateData.organizationName}
                  >
                    <option value="">Vyber organizaci...</option>
                    {organizationOverview.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormSelectWrapper>
              </Col>
              <Col xl={6}>
                <Label>Regionální působnost</Label>
                <FormSelectWrapper>
                  <FormSelect
                    id="region"
                    onChange={(e) => onChange(e)}
                    required
                    value={updateData.region}
                  >
                    <option value="">Vyber region</option>
                    {regionOverview.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormSelectWrapper>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Label>Úplný název organizace</Label>
                <Input
                  id="fullOrganizationName"
                  value={updateData.fullOrganizationName}
                  placeholder="Zadejte úplný název..."
                  onChange={(e) => onChange(e)}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Label>Popis služby</Label>
                <FormTextArea
                  style={{ fontFamily: 'Arial' }}
                  id="description"
                  value={updateData.description}
                  onChange={(e) => onChange(e)}
                  placeholder="Zadejte popis..."
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Label>Cílová skupina služby</Label>
                <Input
                  id="targetGroup"
                  value={updateData.targetGroup}
                  onChange={(e) => onChange(e)}
                  placeholder="Zadejte cílovou skupinu..."
                  required
                />
              </Col>
            </Row>

            <Row align="center" style={{ marginTop: '60px' }}>
              <Col xl={2}>
                {updateData.id && (
                  <DeleteButton onClick={() => deleteItem(data)}>
                    Smazat službu
                  </DeleteButton>
                )}
              </Col>
              <Col offset={{ xl: 5 }} xl={2}>
                <Link to={routes.ADMIN_SERVICE}>
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
      {isLoading && <Loader />}
    </div>
  );
};
export default DetailPage;
