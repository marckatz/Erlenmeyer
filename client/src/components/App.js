import { MenuProvider } from '../context/menu';
import { UserProvider } from '../context/user';

import RouteWrapper from './RouteWrapper';

function App() {
  return (
    <UserProvider>
      <MenuProvider>
        <RouteWrapper />
      </MenuProvider>
    </UserProvider> 
  );
}

export default App;
