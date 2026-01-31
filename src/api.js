const API_BASE_URL = 'https://api.hamo.ai';

// Format date
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Load platform stats
export async function loadStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/portal/stats`);
    const data = await response.json();
    // Map API field names to component field names
    return {
      total_pro_users: data.total_pros,
      total_avatars: data.total_avatars,
      total_client_users: data.total_clients
    };
  } catch (error) {
    console.error('Failed to load stats:', error);
    throw error;
  }
}

// Load pro users
export async function loadProUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/portal/pro-users`);
    const data = await response.json();
    // API returns array directly, not wrapped in object
    const users = Array.isArray(data) ? data : data.pro_users || [];
    // Map API field names to component field names
    return users.map(user => ({
      ...user,
      avatar_url: user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=random`,
      last_active: user.last_active || user.created_at,
      total_clients: user.client_count
    }));
  } catch (error) {
    console.error('Failed to load pro users:', error);
    throw error;
  }
}

// Load pro user details
// API now returns clients as AIMindResponse format with:
// - connected_at: null (pending) or datetime (connected)
// - invitation_code: shown when not connected
// - user_id: null (pending) or string (connected)
export async function loadProUserDetails(proId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/portal/pro-users/${proId}/details`);
    const data = await response.json();

    const avatars = data.avatars || [];
    const clients = data.clients || [];

    // Map clients to their avatars
    // Each client (AI Mind) now includes connected_at and invitation_code
    return avatars.map(avatar => ({
      ...avatar,
      clients: clients.filter(client => client.avatar_id === avatar.id)
    }));
  } catch (error) {
    console.error('Failed to load pro user details:', error);
    throw error;
  }
}
