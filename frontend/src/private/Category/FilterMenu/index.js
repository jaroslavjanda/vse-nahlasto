import React, { useState } from 'react';
import { FilterMenu } from './../../../../components/Admin';
import {
  FilterInput,
  FilterInputWrapper,
  FilterLabel,
} from './../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { NewItemButton, ButtonWrap } from '../../../../components/Buttons';
import * as routes from './../../../../routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

const TableMenu = ({ onSearchChange }) => {
  const [inputs, setInputs] = useState({
    name: '',
  });

  const onChange = ({ target }) => {
    console.log(target);
    const data = {
      ...inputs,
      [target.id]: target.value,
    };
    setInputs(data);
    onSearchChange(target.value);
  };

  return (
    <FilterMenu>
      <Row>
        <Col xl={3}>
          <FilterLabel>Název kategorie</FilterLabel>
          <FilterInputWrapper>
            <FilterInput
              id="name"
              placeholder="Hledej název..."
              value={inputs.name}
              onChange={(e) => onChange(e)}
            />
          </FilterInputWrapper>
        </Col>
        <Col xl={3} offset={{ xl: 6 }}>
          <ButtonWrap>
            <Link to={`${routes.ADMIN_CATEGORY}/new`}>
              <NewItemButton>
                <FontAwesomeIcon
                  style={{ marginRight: '13px' }}
                  icon={faPlus}
                />
                Nová položka
              </NewItemButton>
            </Link>
          </ButtonWrap>
        </Col>
      </Row>
    </FilterMenu>
  );
};

export default TableMenu;
