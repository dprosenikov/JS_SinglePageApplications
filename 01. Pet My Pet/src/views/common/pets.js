import { html } from '../../../node_modules/lit-html/lit-html.js';

export const petTemplate =  (pets) => html `
<li class="otherPet">
<h3>Name: ${pets.name}</h3>
<p>Type: ${pets.type}</p>
<p class="img"><img src="${pets.imageUrl}"></p>
<a class="button" href="/details/${pets._id}">Details</a>
</li>
`;