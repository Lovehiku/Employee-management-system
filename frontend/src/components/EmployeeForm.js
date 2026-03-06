import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeForm({ onEmployeeAdded }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    department: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.position || !form.salary || !form.department) {
      setMessage("All fields are required.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setMessage("Invalid email format.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error adding employee");

      setMessage("Employee added successfully!");
      setForm({ name: "", email: "", position: "", salary: "", department: "" });
      onEmployeeAdded(); // Refresh table
      navigate("/list");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add Employee</h2>
        <p className="card-subtitle">Create a new employee record</p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label className="form-label">Name</label>
          <input
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Email</label>
          <input
            name="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Position</label>
          <input
            name="position"
            placeholder="e.g. Software Engineer"
            value={form.position}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Salary</label>
          <input
            name="salary"
            type="number"
            placeholder="e.g. 50000"
            value={form.salary}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Department</label>
          <input
            name="department"
            placeholder="e.g. Human Resources"
            value={form.department}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="primary-button"
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`form-message ${
            message.includes("successfully") ? "form-message-success" : "form-message-error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default EmployeeForm;