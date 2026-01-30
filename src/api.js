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
    return data;
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
    return data.pro_users || [];
  } catch (error) {
    console.error('Failed to load pro users:', error);
    throw error;
  }
}

// Load pro user details
export async function loadProUserDetails(proId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/portal/pro-users/${proId}/details`);
    const data = await response.json();
    return data.avatars || [];
  } catch (error) {
    console.error('Failed to load pro user details:', error);
    throw error;
  }
}
