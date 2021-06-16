import { html } from '../../../node_modules/lit-html/lit-html.js';

export const recentTemplate =  (recent) => html `


<section class="recent js">
    <h2>${recent.category}</h2>
    <article>
        <h3>${recent.title}</h3>
        <p>${recent.content}</p>
        <a href="/details/${recent._id}" class="btn details-btn">Details</a>
    </article>
</section>

`;