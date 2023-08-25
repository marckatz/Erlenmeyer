import { UserProvider } from '../context/user';

import RouteWrapper from './RouteWrapper';

function App() {
  return (
    <UserProvider>
      <RouteWrapper />
    </UserProvider>
  );
}

export default App;
