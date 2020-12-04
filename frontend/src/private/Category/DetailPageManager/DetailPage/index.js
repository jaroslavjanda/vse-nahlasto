import React, { useState } from 'react';
import {
  Label,
  Input,
  FormButtonCancel,
  FormButtonSave,
} from '../../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { DeleteButton } from '../../../../../components/Buttons';
import {
  Header,
  SubHeader,
  PanelWithItems,
} from '../../../../../components/Admin';
import { Link } from 'react-router-dom';
import * as routes from './../../../../../routes';
import { deleteCategoryById } from '../../../../../api/category/delete-category-by-id';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons';
import { saveCategory } from '../../../../../api/category/save-category';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const CategoryPage = ({ data }) => {
  const [updateData, setUpdatedData] = useState(
    data
      ? data
      : {
          name: '',
          description: '',
        },
  );
  const [categoryName, setCategoryName] = useState(data ? data.name : '');

  const onChange = ({ target }) => {
    setUpdatedData({
      ...updateData,
      [target.id]: target.value,
    });
  };

  const redirect = () => {
    window.location.href = '/admin/category';
  };
  const deleteItem = async (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>
              <i className="fas fa-exclamation-triangle"></i>Potvrďte smazání!
            </h1>
            <p>Opravdu chcete smazat kategorii?</p>
            <div className="line"></div>
            <button
              className="yes"
              onClick={async () => {
                await deleteCategoryById({ id: item.id }).then((result) => {
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
    saveCategory(updateData).then(() => redirect());
  };
  return (
    <div>
      <SubHeader>Kategorie</SubHeader>
      <Header>{!data ? 'Vytvořit kategorii' : categoryName}</Header>
      {data && (
        <PanelWithItems>
          <Link
            to={{
              pathname: `${routes.ADMIN_SERVICE}`,
              selectBox: {
                category: updateData.id,
                organization: '',
                name: '',
                solver: '',
              },
            }}
          >
            <FontAwesomeIcon icon={faFileAlt} /> Služby kategorie
          </Link>
        </PanelWithItems>
      )}
      <form onSubmit={(e) => saveData(e)}>
        <Row>
          <Col xl={6}>
            <Label>Název kategorie</Label>
            <Input
              id="name"
              placeholder="Zadejte název..."
              value={updateData.name}
              onChange={(e) => onChange(e)}
            />
          </Col>
        </Row>
        <Row align="end">
          <Col xl={12}>
            <Label>
              Popis kategorie
              <span style={{ color: '#AAAAAA' }}> | Max. 90 znaků</span>
            </Label>

            <Input
              id="description"
              placeholder="Zadejte popis..."
              value={updateData.description}
              onChange={(e) => onChange(e)}
            />
          </Col>
        </Row>

        <Row align="center" style={{ marginTop: '60px' }}>
          <Col xl={2}>
            {data && (
              <DeleteButton onClick={() => deleteItem(data)}>
                Smazat kategorii
              </DeleteButton>
            )}
          </Col>
          <Col offset={{ xl: 5 }} xl={2}>
            <Link to={routes.ADMIN_CATEGORY}>
              <FormButtonCancel>Zrušit</FormButtonCancel>
            </Link>
          </Col>
          <Col xl={3}>
            <FormButtonSave type="submit">Uložit</FormButtonSave>
          </Col>
        </Row>
      </form>
    </div>
  );
};
export default CategoryPage;
