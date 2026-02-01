import { useState } from 'react';

const ErrorProneComponent: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('This is a test error!');
  }

  return (
    <div style={{ padding: '16px', margin: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <p>Error Testing Component</p>
      <button onClick={() => setShouldThrow(true)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Click to Trigger Test Error
      </button>
    </div>
  );
};

export default ErrorProneComponent;
