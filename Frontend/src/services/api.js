const API_BASE = 'http://localhost:3000/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || data.error || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

export const getExperiences = async () => {
  const response = await fetch(`${API_BASE}/experiences`);
  return handleResponse(response);
};

export const getExperienceById = async (id) => {
  const response = await fetch(`${API_BASE}/experiences/${id}`);
  return handleResponse(response);
};

export const createExperience = async (experienceData) => {
  const response = await fetch(`${API_BASE}/experiences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(experienceData),
  });
  return handleResponse(response);
};

export const updateExperience = async (id, experienceData) => {
  const response = await fetch(`${API_BASE}/experiences/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(experienceData),
  });
  return handleResponse(response);
};

export const deleteExperience = async (id) => {
  const response = await fetch(`${API_BASE}/experiences/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const getLocations = async () => {
  const response = await fetch(`${API_BASE}/locations`);
  return handleResponse(response);
};

export const getHosts = async () => {
  const response = await fetch(`${API_BASE}/hosts`);
  return handleResponse(response);
};
