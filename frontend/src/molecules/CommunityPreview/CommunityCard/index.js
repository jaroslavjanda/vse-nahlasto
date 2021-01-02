import React from 'react';
import { route } from '../../../Routes';
import { imgPath } from '../../../utils/imgPath';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PreviewType } from './../index';

export const CommunityCard = ({ community, previewType }) => {
  const resolveType = () => {
    switch (previewType) {
      case PreviewType.Owner:
        return <Button variant="primary">Spravovat</Button>;
      case PreviewType.Member:
        return <Button variant="primary">Otevřít</Button>;
      case PreviewType.Basic:
        <Button variant="primary">Připojit se</Button>;
    }
  };
  return (
    <Link to={`${route.communityDetailRaw()}/${community.community_id}`}>
      <h4 className="header-card">{community.name}</h4>
      <figure className="article">
        <img src={imgPath('tickets', community.image)} />
        <figcaption>
          <h3>{community.name}</h3>
          <p>{community.description}</p>
          {resolveType()}
        </figcaption>
      </figure>
    </Link>
  );
};
