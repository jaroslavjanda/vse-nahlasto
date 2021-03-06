import React from 'react';
import { route } from '../../../Routes';
import { imgPath } from '../../../utils/imgPath';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PreviewType } from './../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faLockOpen
} from '@fortawesome/free-solid-svg-icons';

export const CommunityCard = ({ community, previewType }) => {
  const resolveType = () => {
    switch (previewType) {
      case PreviewType.Owner:
        return <Button variant="primary">Spravovat</Button>;
      case PreviewType.Member:
        return <Button variant="primary">Otevřít</Button>;
      case PreviewType.Basic:
        return <Button variant="primary">Připojit se</Button>;
      default:
        break;
    }
  };
  return (
    <Link to={`${route.communityDetailRaw()}/${community.community_id}`}>
      <h4 className="header-card">
        <FontAwesomeIcon
          style={{ fontSize: '18px', width: '25px' }}
          icon={community.closed?faLock:faLockOpen}
        /> {" "}
        {community.name}
        </h4>
      <figure className="community-card">
        <img src={imgPath('communities', community.image)} alt="" />
        <figcaption>
          <h3>{community.name}</h3>
          <p>{community.description}</p>
          {resolveType()}
        </figcaption>
      </figure>
    </Link>
  );
};
