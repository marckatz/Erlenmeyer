import logo from '../logo.svg';
import '../App.css';
import { UserContext } from '../context/user';
import { useEffect, useState } from 'react';
import SchemaFrame from './SchemaFrame';

function App() {
  const [userId, setUserId] = useState(1)
  const [schemaId, setSchemaId] = useState(1)

  return (
    <UserContext.Provider value={userId}>
      <div>
        <SchemaFrame schemaId={schemaId}/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
