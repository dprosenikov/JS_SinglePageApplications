import * as api from './api.js'

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//App specific requests

//get all ads
export async function getAllArticles() {
  return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');	
}

//get recent ads
export async function getRecentArticles() {
  return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');	
}

//create ad
export async function createArticles(listing) {
  return await api.post(host + '/data/wiki', listing);	
}

//get ad by ID
export async function getArticlesgById(id) {
  return await api.get(host + '/data/wiki/' + id);	
}

//update ad
export async function updateArticles(id,listing) {
  return await api.put(host + '/data/wiki/' + id, listing);	
}

//delete ad by ID
export async function deleteArticlesById(id) {
  return await api.del(host + '/data/wiki/' + id);	
}

//search
export async function search(query) {
  return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);	
}