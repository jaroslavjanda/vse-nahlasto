import React, { useState } from 'react';
import { FilterMenu } from './../../../../components/Admin';
import {
  FilterInput,
  SelectWrapper,
  Select,
  FilterInputWrapper,
  FilterLabel,
} from './../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { NewItemButton, ButtonWrap } from '../../../../components/Buttons';
import * as routes from './../../../../routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { parseToken } from '../../../../api/token/parseToken';

const TableMenu = ({ overviews, sentParams, fetchDataWithParams }) => {
  const [token, setToken] = useState(parseToken());
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    organizationName: sentParams ? sentParams.organizationName : '',
  });

  const [time, setTime] = useState({
    typing: false,
    typingTimeout: 0,
  });

  const isStopTyping = (data) => {
    if (time.typingTimeout) {
      clearTimeout(time.typingTimeout);
    }

    setTime({
      ...time,
      typing: false,
      typingTimeout: setTimeout(() => fetchDataWithParams(data), 1000),
    });
  };

  const onChange = ({ target }) => {
    const data = {
      ...inputs,
      [target.id]: target.value,
    };
    setInputs(data);
    isStopTyping(data);
  };

  return (
    <FilterMenu>
      <Row>
        <Col xl={3}>
          <FilterLabel>Jméno</FilterLabel>
          <FilterInputWrapper>
            <FilterInput
              id="name"
              placeholder="Hledej jméno..."
              value={inputs.name}
              onChange={(e) => onChange(e)}
            />
          </FilterInputWrapper>
        </Col>
        <Col xl={3}>
          <FilterLabel>Email</FilterLabel>
          <FilterInputWrapper>
            <FilterInput
              id="email"
              placeholder="Hledej email..."
              value={inputs.email}
              onChange={(e) => onChange(e)}
            />
          </FilterInputWrapper>
        </Col>
        <Col xl={3}>
          {token.role == 'SysAdmin' && <FilterLabel>Organizace</FilterLabel>}
          {token.role == 'SysAdmin' && (
            <SelectWrapper>
              <Select
                id="organizationName"
                value={inputs.organizationName}
                onChange={(e) => onChange(e)}
              >
                <option value="">Všechny organizace</option>
                {!overviews.organizationOverview ? (
                  <option>No data</option>
                ) : (
                  overviews.organizationOverview.map((category) => {
                    if (
                      sentParams !== undefined &&
                      category.name === sentParams.organizationName
                    ) {
                      return (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    }
                  })
                )}
              </Select>
            </SelectWrapper>
          )}
        </Col>
        <Col xl={3}>
          <ButtonWrap>
            <Link to={`${routes.ADMIN_ADMINS}/new`}>
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
