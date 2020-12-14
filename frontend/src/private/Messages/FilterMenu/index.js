import React, { useState } from 'react';
import { FilterMenu } from './../../../../components/Admin';
import {
  FilterInput,
  SelectWrapper,
  Select,
  FilterInputWrapper,
  FilterLabel,
  DateWrapper,
} from './../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import {
  NewItemButton,
  ButtonWrap,
  CSVButton,
} from '../../../../components/Buttons';
import * as routes from './../../../../routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faDownload,
  faSearch,
} from '@fortawesome/pro-regular-svg-icons';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './customDatePicker.css';
import { parseToken } from '../../../../api/token/parseToken';
const TableMenu = ({ overviews, sentParams, fetchDataWithParams }) => {
  const [startDate, setStartDate] = useState('');
  const [csvFilterParams, setCsvFilterParams] = useState('');
  const [token, setToken] = useState(parseToken());
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    companyIdentifier: '',
    serviceName: '',
    solver: sentParams ? sentParams.solver : '',
    category: sentParams ? sentParams.category : '',
    organization: sentParams ? sentParams.organization : '',
    created_at: '',
    created_to: '',
    active: null,
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
      typingTimeout: setTimeout(() => {
        fetchDataWithParams(data);
      }, 1000),
    });
  };

  const dateChange = (e) => {
    const data = {
      ...inputs,
      created_at: e,
    };
    generateCsvParams(data);
    setInputs(data);
    isStopTyping(data);
  };
  const dateToChange = (e) => {
    const data = {
      ...inputs,
      created_to: e,
    };
    generateCsvParams(data);
    setInputs(data);
    isStopTyping(data);
  };
  const onChange = ({ target }) => {
    const data = {
      ...inputs,
      [target.id]: target.value,
    };
    generateCsvParams(data);
    setInputs(data);
    isStopTyping(data);
  };
  const generateCsvParams = (inputs) => {
    let filter = '?';
    if (inputs.active != null) filter += 'archived=' + !inputs.active;
    if (inputs.name != '') filter += '&name=' + inputs.name;
    if (inputs.email != '') filter += '&email=' + inputs.email;
    if (inputs.companyIdentifier != '')
      filter += '&ico=' + inputs.companyIdentifier;
    if (inputs.serviceName != '')
      filter += '&serviceName=' + inputs.serviceName;
    if (inputs.solver != '') filter += '&solver=' + inputs.solver;
    if (inputs.category != '') filter += '&category=' + inputs.category;
    if (inputs.organization != '')
      filter += '&organization=' + inputs.organization;
    if (inputs.created_at != '')
      filter += '&date=' + new Date(inputs.created_at).toISOString();
    if (inputs.created_to != '')
      filter += '&dateTo=' + new Date(inputs.created_to).toISOString();
    setCsvFilterParams(filter);
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
          <FilterLabel>IČO</FilterLabel>
          <FilterInputWrapper>
            <FilterInput
              id="companyIdentifier"
              placeholder="Hledej IČO..."
              value={inputs.companyIdentifier}
              onChange={(e) => onChange(e)}
            />
          </FilterInputWrapper>
        </Col>
        <Col xl={3}>
          <ButtonWrap>
            <Link to={`${routes.ADMIN_MESSAGE}/new`}>
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
      <Row style={{ marginTop: '24px' }}>
        <Col xl={3}>
          <FilterLabel>Název služby</FilterLabel>
          <FilterInputWrapper>
            <FilterInput
              id="serviceName"
              placeholder="Hledej službu..."
              value={inputs.serviceName}
              onChange={(e) => onChange(e)}
            />
          </FilterInputWrapper>
        </Col>
        <Col xl={3}>
          <FilterLabel>Kategorie</FilterLabel>
          <SelectWrapper>
            <Select
              id="category"
              value={inputs.category}
              onChange={(e) => onChange(e)}
            >
              <option value="">Všechny kategorie</option>
              {!overviews.categoryOverview ? (
                <option>No data</option>
              ) : (
                overviews.categoryOverview.map((category) => {
                  if (
                    sentParams !== undefined &&
                    category.name === sentParams.categoryName
                  ) {
                    return (
                      <option key={`${category.id}`} value={category.id}>
                        {category.name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={`${category.id}`} value={category.id}>
                        {category.name}
                      </option>
                    );
                  }
                })
              )}
            </Select>
          </SelectWrapper>
        </Col>
        {token.role == 'SysAdmin' && (
          <Col xl={3}>
            <FilterLabel>Organizace</FilterLabel>
            <SelectWrapper>
              <Select
                id="organization"
                value={inputs.categoryName}
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
                        <option key={`${category.id}`} value={category.id}>
                          {category.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={`${category.id}`} value={category.id}>
                          {category.name}
                        </option>
                      );
                    }
                  })
                )}
              </Select>
            </SelectWrapper>
          </Col>
        )}
        {token.role == 'OrgUser' && (
          <Col xl={3}>
            <FilterLabel>Období vzniku</FilterLabel>
            <DateWrapper>
              <Datepicker
                id="created_at"
                showPopperArrow={false}
                selected={inputs.created_at}
                onChange={(e) => dateChange(e)}
              />
            </DateWrapper>
          </Col>
        )}
        {token.role == 'OrgAdmin' && (
          <Col xl={3}>
            <FilterLabel>Řešitel</FilterLabel>
            <SelectWrapper>
              <Select
                id="solver"
                value={inputs.solver}
                onChange={(e) => onChange(e)}
              >
                <option value="">Všichni řešitelé</option>
                {!overviews.adminsOverview ? (
                  <option>No data</option>
                ) : (
                  overviews.adminsOverview.map((category) => {
                    if (
                      sentParams !== undefined &&
                      category.name === sentParams.categoryName
                    ) {
                      return (
                        <option key={`${category.id}`} value={category.id}>
                          {category.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={`${category.id}`} value={category.id}>
                          {category.name}
                        </option>
                      );
                    }
                  })
                )}
              </Select>
            </SelectWrapper>
          </Col>
        )}
        <Col xl={3}>
          <ButtonWrap>
            <Link
              to={'/api/Messages/csv/' + parseToken().id + csvFilterParams}
              target="_blank"
              download
            >
              <CSVButton>
                <FontAwesomeIcon
                  style={{ marginRight: '13px' }}
                  icon={faDownload}
                />
                Export do CSV
              </CSVButton>
            </Link>
          </ButtonWrap>
        </Col>
      </Row>
      <Row style={{ marginTop: '24px' }}>
        {token.role == 'SysAdmin' && (
          <Col xl={3}>
            <FilterLabel>Řešitel</FilterLabel>
            <SelectWrapper>
              <Select
                id="solver"
                value={inputs.solver}
                onChange={(e) => onChange(e)}
              >
                <option value="">Všichni řešitelé</option>
                {!overviews.adminsOverview ? (
                  <option>No data</option>
                ) : (
                  overviews.adminsOverview.map((category) => {
                    if (
                      sentParams !== undefined &&
                      category.name === sentParams.categoryName
                    ) {
                      return (
                        <option key={`${category.id}`} value={category.id}>
                          {category.name}
                        </option>
                      );
                    } else {
                      return (
                        <option key={`${category.id}`} value={category.id}>
                          {category.name}
                        </option>
                      );
                    }
                  })
                )}
              </Select>
            </SelectWrapper>
          </Col>
        )}
        {token.role != 'OrgUser' && (
          <Col xl={3}>
            <FilterLabel>Období vzniku - od</FilterLabel>
            <DateWrapper>
              <Datepicker
                id="created_at"
                showPopperArrow={false}
                selected={inputs.created_at}
                onChange={(e) => dateChange(e)}
              />
            </DateWrapper>
          </Col>
        )}
        {token.role != 'OrgUser' && (
          <Col xl={3}>
            <FilterLabel>Období vzniku - do</FilterLabel>
            <DateWrapper>
              <Datepicker
                id="created_to"
                showPopperArrow={false}
                selected={inputs.created_to}
                onChange={(e) => dateToChange(e)}
              />
            </DateWrapper>
          </Col>
        )}
        <Col xl={3}>
          <FilterLabel>Stav</FilterLabel>
          <div style={{ minWidth: '250px' }}>
            <input
              id="toggle-on"
              className="toggle toggle-left"
              name="toggle"
              value="false"
              type="radio"
              checked={inputs.active == null ? '' : inputs.active}
              onClick={({ target }) => {
                if (target.value == 'false' && inputs.active == true) {
                  let data = {
                    ...inputs,
                    active: null,
                  };

                  setInputs(data);

                  isStopTyping(data);
                } else {
                  let data = {
                    ...inputs,
                    active: true,
                  };

                  setInputs(data);

                  isStopTyping(data);
                }
              }}
            />
            <label htmlFor="toggle-on" className="btn">
              Aktivní
            </label>
            <input
              id="toggle-off"
              className="toggle toggle-right"
              name="toggle"
              value="true"
              type="radio"
              checked={inputs.active == null ? '' : !inputs.active}
              onClick={({ target }) => {
                if (target.value == 'true' && inputs.active == false) {
                  let data = {
                    ...inputs,
                    active: null,
                  };

                  setInputs(data);

                  isStopTyping(data);
                } else {
                  let data = {
                    ...inputs,
                    active: false,
                  };

                  setInputs(data);

                  isStopTyping(data);
                }
              }}
            />
            <label htmlFor="toggle-off" className="btn">
              Archiv
            </label>
          </div>
        </Col>
      </Row>
    </FilterMenu>
  );
};

export default TableMenu;
