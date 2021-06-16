import {html} from '../../node_modules/lit-html/lit-html.js';

import { getAllPets } from '../api/data.js';
import { petTemplate } from './common/pets.js';

const homeTemplate = (pets) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${(pets === undefined || pets.length == 0) ? html`<p class="no-pets">No pets in database!</p>` : html`<ul class="other-pets-list"> ${pets.map(petTemplate)} </ul>`}


</section>
`;


export async function homePage(ctx) {
    const pets = await getAllPets();
    ctx.render(homeTemplate(pets));
}