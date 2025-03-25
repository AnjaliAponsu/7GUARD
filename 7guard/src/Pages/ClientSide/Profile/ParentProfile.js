import React from 'react';
import { Link } from 'react-router-dom';

const ParentProfile = () => {
  return (
    <div>
      <Link to={'/chdr/:CHDR_id'}>CHDR</Link>
    </div>
  );
}

export default ParentProfile;
