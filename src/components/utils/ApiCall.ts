import axios from "axios";

export const PostQuery = async (route:any, data:any) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  try {
    return await axios.post(route, formData, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    // Handle errors
    throw error; // Optionally, re-throw the error to propagate it further
  }
};

export const PostQueryWithAPI = async (route: any, data: any, customHeaders: any = {}) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  try {
    return await axios.post(route, formData, {
      withCredentials: true,
      headers: {
        // Add your custom headers here
        ...customHeaders,
      },
    });
  } catch (error) {
    console.error(error);
    // Handle errors
    throw error; // Optionally, re-throw the error to propagate it further
  }
};

export const PutQueryWithAPI = async (route:any, data:any, customHeaders = {}) => {
  // Convert the data object to x-www-form-urlencoded format
  const formData = new URLSearchParams();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  try {
    return await axios.put(route, formData.toString(), {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set the content type
        // Add your custom headers here
        ...customHeaders,
      },
    });
  } catch (error) {
    console.error(error);
    // Handle errors
    throw error; // Optionally, re-throw the error to propagate it further
  }
};

export const DeleteQuery = async (route: any) => {
  try {
    return axios.delete(route, {
      withCredentials: true,
    });
  } catch (e) {
    console.log(e, "errrrororor");
  }
};

export const FetchQuery = async (route: any) => {
  try {
    return axios.get(route, {
      withCredentials: true,
    });
  } catch (e) {
    console.log(e, "errrrororor");
  }[]
};

export const FetchQueryWithApi = async (route:any, customHeaders = {}) => {
  try {
    return axios.get(route, {
      withCredentials: true,
      headers: {
        // Add your custom headers here
        ...customHeaders,
      },
    });
  } catch (e) {
    console.error(e, "error");
    // Handle errors
    throw e; // Optionally, re-throw the error to propagate it further
  }
};

export const PatchQuery = async (route: any, data: any) => {
  try {
    return axios.patch(route, data, {
      withCredentials: true,
    });
  } catch (e) {
    console.log(e, "errrrororor");
  }
};
