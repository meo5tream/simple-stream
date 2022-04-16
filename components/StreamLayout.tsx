import React from 'react';

type Props = {};

export const StreamLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-row">
      <div className="" style={{ width: '75%' }}>
        {children}
      </div>
      <div className="" style={{ width: '25%' }}>
        Chat of stream go here!
      </div>
    </div>
  );
};
