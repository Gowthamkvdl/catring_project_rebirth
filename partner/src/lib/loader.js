import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/partner/post/" + id);
  return response.data;
};


export const listPageLoader = async ({ request }) => {
  // Default URL if none is provided
  const defaultUrl = "?location=&date=&maxWorkingDays=100&minSalary=0&limit=5";
  
  // Extract the query string from the request URL or use the default one
  const queryString = request.url.includes("?") 
    ? request.url.split("?")[1] 
    : defaultUrl.split("?")[1];

  const params = new URLSearchParams(queryString);

  // Extract parameters with fallback to defaults
  const location = params.get("location") || "";
  const date = params.get("date") || "";
  const maxWorkingDays = params.get("maxWorkingDays") || "100";
  const minSalary = params.get("minSalary") || "0";
  const limitStr = params.get("limit") || "5";
  const limit = parseInt(limitStr);

  // Rebuild the query string to pass to the API request
  const apiUrl = `/post/?location=${location}&date=${date}&maxWorkingDays=${maxWorkingDays}&minSalary=${minSalary}&limit=${limit}`;

  // Fetch the data from the API
  const postPromise = apiRequest.get(apiUrl);

  return defer({
    postResponse: postPromise,
  });
};
export const intrestedPageLoader = async ({ request }) => {
  // Default URL if none is provided
  const defaultUrl = "?location=&date=&maxWorkingDays=100&minSalary=0&limit=5";
  
  // Extract the query string from the request URL or use the default one
  const queryString = request.url.includes("?") 
    ? request.url.split("?")[1] 
    : defaultUrl.split("?")[1];

  const params = new URLSearchParams(queryString);

  // Extract parameters with fallback to defaults
  const location = params.get("location") || "";
  const date = params.get("date") || "";
  const maxWorkingDays = params.get("maxWorkingDays") || "100";
  const minSalary = params.get("minSalary") || "0";
  const limitStr = params.get("limit") || "5";
  const limit = parseInt(limitStr);

  // Rebuild the query string to pass to the API request
  const apiUrl = `/post/intrested/?location=${location}&date=${date}&maxWorkingDays=${maxWorkingDays}&minSalary=${minSalary}&limit=${limit}`;

  // Fetch the data from the API
  const postPromise = apiRequest.get(apiUrl);

  return defer({
    postResponse: postPromise,
  });
};

export const serversProfilesPageLoader = async () => {
  const serversPromise = apiRequest.get("user/servers/");
  return defer({
    response: serversPromise,
  });
} 



export const catersProfilesPageLoader = async () => {
  const caterPromise = apiRequest.get("user/caters/"); 
  return defer({
    response: caterPromise,
  });
}