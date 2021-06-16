import { html } from '../../node_modules/lit-html/lit-html.js';

import { deletePet, getPetById, getLikesFromUser, likePets, getLikes } from '../api/data.js';

const detailsTemplate = (pet, isOwn, onDelete, isLogged, isLiked, onLike, totalLikes) => html`
<section id="details-page" class="details">
<div class="pet-information">
    <h3>Name: ${pet.name}</h3>
    <p class="type">Type: ${pet.type}</p>
    <p class="img"><img src="${pet.imageUrl}"></p>
    <div class="actions">

    ${isOwn ?
    html`<!-- Edit/Delete buttons ( Only for creator of this pet )  -->
    <a class="button" href="/edit/${pet._id}">Edit</a>
    <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>` :
    ''}

    ${!isOwn && isLogged && !isLiked ?
        html `<!-- Like button ( Only for logged-in users, which is not creators of the current pet ) -->
        <a class="button" @click=${onLike} href="javascript:void(0)">Like</a>` :
        ''}

    <!-- Bonus -->
 
    <!-- ( for Guests and Users )  -->
    <div class="likes">
        <img class="hearts" src="/images/heart.png">
        <span id="total-likes">Likes: ${totalLikes}</span>
    </div>
    <!-- Bonus -->


    </div>
</div>
<div class="pet-description">
    <h3>Description:</h3>
    <p>${pet.description}</p>
</div>
</section>
`;

export async function detailsPage(ctx) {
    const petId = ctx.params.id;
    const pet = await getPetById(petId);
    const isOwn = ctx.user && pet._ownerId == ctx.user._id;
    const isLogged = ctx.user
    const isLiked = ctx.user ? await getLikesFromUser(petId, ctx.user._id) : 0;
    const totalLikes = await getLikes(petId);

    ctx.render(detailsTemplate(pet, isOwn, onDelete, isLogged, isLiked, onLike, totalLikes));

    async function onDelete() {
        const confirmed = confirm('Sure?');
        if (confirmed) {
            await deletePet(petId);
            ctx.page.redirect('/Dashboard')
        }
    }

    async function onLike() {
        await likePets({petId});
        ctx.page.redirect('/details/' + petId);
    }
   
}