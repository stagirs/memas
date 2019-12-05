import React from 'react';
import LeftPanel from './LeftPanel'
import MiddlePanel from './MiddlePanel'
import RightPanel from './RightPanel'

function Main() {
  return (
    <div className="Main">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
    </div>
  );
}

export default Main;
