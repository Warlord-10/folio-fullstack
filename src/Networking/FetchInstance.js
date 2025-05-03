
export const fetchClient = async (url, options = {}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Fetch request failed');
  }
  
  const data = await response.json();
  return data
};
