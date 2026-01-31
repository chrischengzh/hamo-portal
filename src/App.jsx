import React, { useState, useEffect } from 'react'
import { loadStats, loadProUsers, loadProUserDetails, formatDate } from './api'

// Icons
const LightbulbIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
  </svg>
)

const UserIcon = () => (
  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
)

const AvatarIcon = () => (
  <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
  </svg>
)

const UsersIcon = () => (
  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
)

// Header Component
function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <LightbulbIcon />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hamo Portal</h1>
            <p className="text-sm text-gray-500">Platform Overview</p>
          </div>
        </div>
      </div>
    </header>
  )
}

// Stats Card Component
function StatsCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    teal: 'text-teal-600 bg-teal-100',
    purple: 'text-purple-600 bg-purple-100'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-4xl font-bold ${colorClasses[color].split(' ')[0]} mt-2`}>
            {value !== null ? value : '-'}
          </p>
        </div>
        <div className={`w-14 h-14 ${colorClasses[color]} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

// Client Card Component
function ClientCard({ client }) {
  const isConnected = client.connected_at !== null && client.connected_at !== undefined;

  return (
    <div className={`rounded-lg p-3 border flex items-center space-x-3 ${
      isConnected
        ? 'bg-white border-gray-200'
        : 'bg-amber-50 border-amber-200'
    }`}>
      <img
        src={client.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=random`}
        alt={client.name}
        className="w-10 h-10 rounded-full bg-gray-200"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{client.name}</p>
        {isConnected ? (
          <>
            <p className="text-xs text-green-600">Connected: {formatDate(client.connected_at)}</p>
            <p className="text-xs text-gray-400">Last active: {formatDate(client.last_active || client.connected_at)}</p>
          </>
        ) : (
          <p className="text-xs text-amber-600">Pending invitation</p>
        )}
      </div>
      {isConnected ? (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap">
          Connected
        </span>
      ) : (
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-mono whitespace-nowrap" title="Invitation Code">
          {client.invitation_code || 'No code'}
        </span>
      )}
    </div>
  )
}

// Avatar Details Component
function AvatarDetails({ avatar }) {
  const clients = avatar.clients || [];
  // Use actual clients array length, not avatar.client_count from API
  const clientCount = clients.length;

  return (
    <div className="mb-6 last:mb-0">
      {/* Avatar Header */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{avatar.name}</h4>
          <p className="text-xs text-gray-500">
            {avatar.theory}{avatar.methodology ? ' • ' + avatar.methodology : ''}
          </p>
        </div>
        <span className="ml-auto text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
          {clientCount} clients
        </span>
      </div>

      {/* Clients Grid */}
      {clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-13">
          {clients.map((client, idx) => (
            <ClientCard key={idx} client={client} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm ml-13">No clients connected to this avatar</p>
      )}
    </div>
  )
}

// Pro User Card Component
function ProUserCard({ user }) {
  const [expanded, setExpanded] = useState(false)
  const [avatars, setAvatars] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    if (!expanded && !avatars) {
      setLoading(true)
      try {
        const data = await loadProUserDetails(user.id)
        setAvatars(data)
      } catch (error) {
        console.error('Failed to load details:', error)
      } finally {
        setLoading(false)
      }
    }
    setExpanded(!expanded)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Pro User Card Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar_url}
              alt={user.full_name}
              className="w-14 h-14 rounded-full bg-gray-200"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.full_name}</h3>
              <p className="text-sm text-gray-500">{user.profession || 'Therapist'}</p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span>{expanded ? 'Collapse' : 'Expand'}</span>
            <div style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDownIcon />
            </div>
          </button>
        </div>

        {/* Stats Row */}
        <div className="mt-4 flex items-center space-x-6 text-sm flex-wrap gap-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <CalendarIcon />
            <span>Registered: {formatDate(user.created_at)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <ClockIcon />
            <span>Last active: {formatDate(user.last_active)}</span>
          </div>
          <div className="flex items-center space-x-2 text-teal-600 font-medium">
            <AvatarIcon />
            <span>{user.avatar_count} Avatars</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-600 font-medium">
            <UsersIcon />
            <span>{user.total_clients} Clients</span>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <div className="border-t border-gray-100 bg-gray-50 p-6">
          {loading ? (
            <p className="text-gray-500 text-center py-4">Loading...</p>
          ) : avatars && avatars.length > 0 ? (
            avatars.map((avatar, idx) => <AvatarDetails key={idx} avatar={avatar} />)
          ) : avatars && avatars.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No avatars created yet</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [stats, setStats] = useState({
    total_pro_users: null,
    total_avatars: null,
    total_client_users: null
  })
  const [proUsers, setProUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [statsData, usersData] = await Promise.all([loadStats(), loadProUsers()])
        setStats(statsData)
        setProUsers(usersData)
      } catch (err) {
        setError('Failed to load data. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Section */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-6">
            <StatsCard
              title="Total Pro Users"
              value={stats.total_pro_users}
              icon={<UserIcon />}
              color="blue"
            />
            <StatsCard
              title="Total Pro Avatars"
              value={stats.total_avatars}
              icon={<AvatarIcon />}
              color="teal"
            />
            <StatsCard
              title="Total Client Users"
              value={stats.total_client_users}
              icon={<UsersIcon />}
              color="purple"
            />
          </div>
        </section>

        {/* Pro Users List Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pro Users</h2>
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                Loading...
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center text-red-500">
                {error}
              </div>
            ) : proUsers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                No Pro users registered yet
              </div>
            ) : (
              proUsers.map((user) => <ProUserCard key={user.id} user={user} />)
            )}
          </div>
        </section>
      </main>

      {/* Footer with Version */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>Hamo Portal V 1.3.6</p>
      </footer>
    </div>
  )
}

export default App
