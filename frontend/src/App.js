import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import "./App.css";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshTable = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <Router>
      <div className="app-root">
        <div className="app-shell">
          <header className="app-header">
            <div className="app-title-wrapper">
              <h1 className="app-title">Employee Management</h1>
            </div>
            <div className="app-header-actions">
              <input
                className="app-search"
                placeholder="Search employee..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="app-header-avatar" />
            </div>
          </header>

          <div className="app-layout">
            <aside className="app-sidebar">
              <div className="sidebar-section">
                <p className="sidebar-section-label">Main</p>
                <nav className="sidebar-nav">
                  <Link to="/list" className="sidebar-link">
                    Employee List
                  </Link>
                  <Link to="/add" className="sidebar-link">
                    Add Employee
                  </Link>
                </nav>
              </div>
            </aside>

            <main className="app-content">
              <Routes>
                <Route
                  path="/add"
                  element={<EmployeeForm onEmployeeAdded={refreshTable} />}
                />
                <Route
                  path="/list"
                  element={
                    <EmployeeTable
                      refreshTrigger={refreshTrigger}
                      searchTerm={searchTerm}
                    />
                  }
                />
                <Route
                  path="/"
                  element={
                    <EmployeeTable
                      refreshTrigger={refreshTrigger}
                      searchTerm={searchTerm}
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;