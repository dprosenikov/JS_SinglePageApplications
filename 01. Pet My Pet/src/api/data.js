import * as api from './api.js'

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//App specific requests


//create pet
export async function createPets(listing) {
  return await api.post(host + '/data/pets', listing);	
}

//get all pets
export async function getAllPets() {
  return await api.get(host + '/data/pets?sortBy=_createdOn%20desc');	
}


//get pet by ID
export async function getPetById(id) {
  return await api.get(host + '/data/pets/' + id);	
}


//update pet
export async function updatePets(id,listing) {
  return await api.put(host + '/data/pets/' + id, listing);	
}


//delete pet by ID
export async function deletePet(id) {
  return await api.del(host + '/data/pets/' + id);	
}


//get my pets
export async function getMyPets(userId) {
  return await api.get(host + `/data/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);	
}


//like a pet
export async function likePets(petId) {
  return await api.post(host + '/data/likes', petId);	
}


//get likes
export async function getLikes(petId) {
  return await api.get(host + `/data/likes?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);	
}


//whether user liked or not
export async function getLikesFromUser(petId,userId) {
  return await api.get(host + `/data/likes?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);	
}