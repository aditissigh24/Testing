import './App.css';
import AddLeadForm from './leads/AddLeadForm';
import LeadsTable from './leads/LeadsTable';

function App() {
  return (
    <div className="App">
      <h3>Add New Lead</h3>
      <AddLeadForm />
      <LeadsTable />
    </div>
  );
}

export default App;
