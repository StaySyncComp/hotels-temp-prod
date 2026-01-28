import { ApiQueryParams } from "@/types/ui/data-table-types";

export const buildQueryParams = (params: ApiQueryParams): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "object") {
        searchParams.append(key, JSON.stringify(value));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams;
};

export const handleApiError = (error: any): any => {
  console.error("API Error:", error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      status: error.response.status,
      data: error.response.data,
      error: error.response.data?.message || "An error occurred",
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: 500,
      data: null,
      error: "No response from server",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      status: 500,
      data: null,
      error: error.message,
    };
  }
};
