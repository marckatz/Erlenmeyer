import logo from '../logo.svg';
import '../App.css';
import TableCard from './TableCard';

function App() {
  const tableId = 1
  return (
    <div>
      <TableCard tableId={tableId} />
    </div>
  );
}

export default App;
