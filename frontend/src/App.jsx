
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API = 'http://localhost:1000/api/markets'

const emptyForm = {
  marketName: '',
  location: '',
  stallCount: 1,
  marketDay: '',
  attended: false,
}

function App() {
  const [markets, setMarkets] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [searchId, setSearchId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadMarkets() {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(API)
      setMarkets(response.data)
    } catch {
      setError('Cannot connect to the backend. Check that Spring Boot is running on port 1000.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMarkets()
  }, [])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm({
      ...form,
      [name]: type === 'checkbox'
        ? checked
        : name === 'stallCount'
          ? value
          : value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    const payload = {
      ...form,
      stallCount: Number(form.stallCount),
    }

    try {
      if (editingId !== null) {
        await axios.put(`${API}/${editingId}`, payload)
        setMessage('Market updated successfully.')
      } else {
        await axios.post(API, payload)
        setMessage('Market added successfully.')
      }

      setForm(emptyForm)
      setEditingId(null)
      await loadMarkets()
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Unable to save market. Check the required fields and backend.'
      )
    }
  }

  function handleEdit(market) {
    setForm({
      marketName: market.marketName ?? '',
      location: market.location ?? '',
      stallCount: market.stallCount ?? 1,
      marketDay: market.marketDay ?? '',
      attended: market.attended ?? false,
    })
    setEditingId(market.id)
    setMessage('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!window.confirm(`Delete market ID ${id}?`)) return

    setMessage('')
    setError('')
    try {
      await axios.delete(`${API}/${id}`)
      setMessage('Market deleted successfully.')
      await loadMarkets()
    } catch (err) {
      setError(
        err.response?.data?.error || 'Unable to delete this market.'
      )
    }
  }

  async function findMarket(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!searchId || Number(searchId) < 1) {
      setError('Enter a valid market ID.')
      return
    }

    try {
      const response = await axios.get(`${API}/${searchId}`)
      setMarkets([response.data])
      setMessage(`Showing market ID ${searchId}.`)
    } catch (err) {
      setError(err.response?.data?.error || 'Market not found.')
    }
  }

  return (
    <div className="market-page">
      <nav className="navbar navbar-dark bg-success shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">
            🌾 FarmersMarket
          </span>
          <span className="text-white">Market Management System</span>
        </div>
      </nav>

      <main className="container py-4">
        <div className="p-4 mb-4 rounded-4 hero-banner">
          <h1 className="fw-bold">FarmersMarket Dashboard</h1>
          <p className="mb-0">
            Manage market details in one place.
          </p>
        </div>

        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h2 className="h5 mb-0">
              {editingId !== null ? 'Update Market' : 'Add New Market'}
            </h2>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Market Name *</label>
                  <input
                    className="form-control"
                    name="marketName"
                    value={form.marketName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="e.g. Vijayawada Farmers Market"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Location *</label>
                  <input
                    className="form-control"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    placeholder="e.g. Vijayawada"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Number of Stalls *</label>
                  <input
                    className="form-control"
                    type="number"
                    name="stallCount"
                    value={form.stallCount}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Market Day *</label>
                  <select
                    className="form-select"
                    name="marketDay"
                    value={form.marketDay}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a day</option>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                      'Friday', 'Saturday', 'Sunday'].map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="attended"
                      name="attended"
                      checked={form.attended}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="attended">
                      Market attended
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 d-flex gap-2">
                <button className="btn btn-success" type="submit">
                  {editingId !== null ? 'Update Market' : 'Add Market'}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    setForm(emptyForm)
                    setEditingId(null)
                    setError('')
                    setMessage('')
                  }}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="h5">Find Market by ID</h2>
            <form className="d-flex gap-2" onSubmit={findMarket}>
              <input
                className="form-control"
                type="number"
                min="1"
                placeholder="Enter market ID"
                value={searchId}
                onChange={event => setSearchId(event.target.value)}
                required
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={loadMarkets}
              >
                Show All
              </button>
            </form>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h2 className="h5 mb-0">Market Records</h2>
            <button
              className="btn btn-sm btn-success"
              onClick={loadMarkets}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Market Name</th>
                  <th>Location</th>
                  <th>Stalls</th>
                  <th>Market Day</th>
                  <th>Attended</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading && markets.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No market records found.
                    </td>
                  </tr>
                )}

                {markets.map(market => (
                  <tr key={market.id}>
                    <td>{market.id}</td>
                    <td>{market.marketName}</td>
                    <td>{market.location}</td>
                    <td>{market.stallCount}</td>
                    <td>{market.marketDay}</td>
                    <td>
                      <span className={`badge ${market.attended ? 'text-bg-success' : 'text-bg-secondary'}`}>
                        {market.attended ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(market)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(market.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="text-center text-muted py-4">
        FarmersMarket · Full-Stack Application
      </footer>
    </div>
  )
}

export default App
