const baseurl = "http://localhost:3000";
export const fetchData = async (endpoint, options = {}) => {
  const url = `${baseurl}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return result;
};

export const SendData = async (endpoint, data, config = {}) => {
  const url = `${baseurl}${endpoint}`;

  const fetchOptions = {
    method: "POST",
    credentials: "include",
    ...config,
  };

  // Check if data is an instance of FormData
  if (data instanceof FormData) {
    fetchOptions.body = data;
  } else {
    fetchOptions.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
    fetchOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error :", error.message);
  }
};
