import {getUserData, setUserData, clearUserData} from "../utility.js"


export const settings = {
	host: ''
};

async function request(url, options) {
  
  try {
    //send request with appropr method, headers and body(if any)
    const response = await fetch(url, options);
    
    //handle errors
    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    //return result
    try {
      //parse respnse() if needed
      const data = await response.json();
      return data;
    } catch (err) {
      return response;
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}


//function that creates headers based on app state and body
function createOptions(method = 'get', body) {
  const options = {
    method,
    headers: {}
  };

  const user = getUserData();
  if (user) {
    options.headers['X-Authorization'] = user.accessToken;
  }
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return options;
}

//decorator for all REST
export async function get(url) {
  return await request(url, createOptions());
}

export async function post(url, data) {
  return await request(url, createOptions('post', data));
}

export async function put(url, data) {
  return await request(url, createOptions('put', data));
}

export async function del(url) {
  return await request(url, createOptions('delete'));
}

//auth funcs(login/register/logout)
export async function login(email, password) {
  	const result = await post(settings.host + '/users/login', {email, password});
  	setUserData(result);
  	return result;
}

export async function register(email, password) {
  	const result = await post(settings.host + '/users/register', {email, password});
  	setUserData(result);
  	return result;
}

export function logout() {
  	const result = get(settings.host + '/users/logout');
  	clearUserData();
  	return result;
}