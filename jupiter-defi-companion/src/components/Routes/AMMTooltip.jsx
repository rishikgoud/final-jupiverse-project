import React from 'react';
import AMMTooltip from './AMMTooltip';

const ExampleComponent = () => {
  return (
    <div className="relative">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Hover me
      </button>
      <AMMTooltip content="This is an Automated Market Maker (AMM) tooltip!" position="top" />
    </div>
  );
};

export default ExampleComponent;
    