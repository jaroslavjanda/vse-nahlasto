import React, { useState, useEffect } from 'react';
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
const OrganizationFilerMenu = ({ onSearchChange }) => {
  const [inputs, setInputs] = useState({
    organizationName: '',
  });

  const onChange = ({ target }) => {
    const data = {
      [target.id]: target.value,
    };
    setInputs(data);
    onSearchChange(target.value);
  };
  return (
    <FilterMenu>
      <Row>
        <Col xl={3}>
          <FilterLabel>Název organizace</FilterLabel>
          <FilterInputWrapper>
            <FilterInput
              id="organizationName"
              placeholder="Hledej název..."
              value={inputs.organizationName}
              onChange={(e) => onChange(e)}
            />
          </FilterInputWrapper>
        </Col>
        <Col xl={3} offset={{ xl: 6 }}>
          <ButtonWrap>
            <Link to={`${routes.ADMIN_ORGANIZATION}/new`}>
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

export default OrganizationFilerMenu;
