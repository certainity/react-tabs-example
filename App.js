// App.js
import React from 'react';
import Tabs from './Tabs';

const App = () => {
  const tabs = [
    { title: 'Tab 1', content: <div>Content for Tab 1</div> },
    { title: 'Tab 2', content: <div>Content for Tab 2</div> },
    { title: 'Tab 3', content: <div>Content for Tab 3</div> },
  ];

  return (
    <div className="App">
      <h1>React Tabs Example</h1>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default App;
