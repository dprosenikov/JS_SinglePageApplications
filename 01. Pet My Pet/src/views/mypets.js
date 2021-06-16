import {html} from '../../node_modules/lit-html/lit-html.js';

import { getMyPets } from '../api/data.js';
import { petTemplate } from './common/pets.js';

const profileTemplate = (pets) => html`
<section id="my-pets-page" class="my-pets">
<h1>My Pets</h1>

${(pets === undefined || pets.length == 0) ? html`<!-- Display paragraph: If the user doesn't have his own pets  -->
<p class="no-pets">No pets in database!</p>` : html`<!-- Display ul: with list-items for every user's pet (if any) -->
<ul class="my-pets-list"> ${pets.map(petTemplate)} </ul>`}

</section>
`;


export async function profilePage(ctx) {
    const pets = await getMyPets(ctx.user._id);
    ctx.render(profileTemplate(pets));
}