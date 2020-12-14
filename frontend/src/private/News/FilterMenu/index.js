import React, { useState } from 'react';
import { FilterMenu } from './../../../../components/Admin';
import {
  FilterInput,
  FilterInputWrapper,
  FilterLabel,
  DateWrapper,
} from './../../../../components/Inputs';
import { Row, Col } from 'react-grid-system';
import { NewItemButton, ButtonWrap } from '../../../../components/Buttons';
import * as routes from './../../../../routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './customDatePicker.css';
import './switch.css';
const TableMenu = ({ fetchDataWithParams }) => {
  const [inputs, setInputs] = useState({
    name: '',
    concept: null,
    created_at: '',
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

  const dateChange = (e) => {
    const data = {
      ...inputs,
      created_at: e,
    };
    setInputs(data);
    isStopTyping(data);
  };

  const toggleChange = ({ target }) => {
    if (
      (target.value == 'true' && inputs.concept == true) ||
      (target.value == 'false' && inputs.concept == false)
    ) {
      const data = {
        ...inputs,
        concept: null,
      };
      setInputs(data);
      isStopTyping(data);
    } else {
      const data = {
        ...inputs,
        concept:
          inputs.concept == null
            ? target.value == 'true'
              ? true
              : false
            : !inputs.concept,
      };
      setInputs(data);
      isStopTyping(data);
    }
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
          <FilterLabel>Název aktuality</FilterLabel>
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
          <FilterLabel>Datum uveřejnění</FilterLabel>
          <DateWrapper>
            <Datepicker
              showPopperArrow={false}
              selected={inputs.created_at}
              onChange={(date) => dateChange(date)}
            />
          </DateWrapper>
        </Col>
        <Col xl={3}>
          <FilterLabel>Stav</FilterLabel>
          <div style={{ minWidth: '250px' }}>
            <input
              id="toggle-on"
              className="toggle toggle-left"
              name="toggle"
              value={false}
              type="radio"
              checked={inputs.concept == null ? '' : !inputs.concept}
              onClick={(e) => toggleChange(e)}
            />
            <label htmlFor="toggle-on" className="btn">
              Uveřejněno
            </label>
            <input
              id="toggle-off"
              className="toggle toggle-right"
              name="toggle"
              value={true}
              type="radio"
              checked={inputs.concept == null ? '' : inputs.concept}
              onClick={(e) => toggleChange(e)}
            />
            <label htmlFor="toggle-off" className="btn">
              Koncept
            </label>
          </div>
        </Col>
        <Col xl={3}>
          <ButtonWrap>
            <Link to={`${routes.ADMIN_NEWS}/new`}>
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
