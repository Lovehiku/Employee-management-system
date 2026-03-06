import { useEffect, useState } from "react";

function EmployeeTable({ refreshTrigger, searchTerm = "" }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/employees");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error fetching employees");

      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error deleting employee");
      fetchEmployees(); // refresh
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshTrigger]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredEmployees = normalizedSearch
    ? employees.filter((emp) => {
        const target = `${emp.name ?? ""} ${emp.email ?? ""} ${emp.position ?? ""} ${emp.department ?? ""}`.toLowerCase();
        return target.includes(normalizedSearch);
      })
    : employees;

  if (loading) {
    return <p className="status-text">Loading employees...</p>;
  }

  if (error) {
    return <p className="status-text status-text-error">{error}</p>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Employee List</h2>
          <p className="card-subtitle">
            {normalizedSearch
              ? `Showing ${filteredEmployees.length} matching result${
                  filteredEmployees.length === 1 ? "" : "s"
                }`
              : ""}
          </p>
        </div>
        <span className="badge-pill">
          Total: <strong>{filteredEmployees.length}</strong>
        </span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Department</th>
              <th className="table-actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>${emp.salary}</td>
                <td>{emp.department}</td>
                <td className="table-actions-cell">
                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    className="danger-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;