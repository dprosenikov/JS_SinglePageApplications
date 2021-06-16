import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteArticlesById, getArticlesgById } from '../api/data.js';

const detailsTemplate = (article, isOwn, onDelete) => html`
<section id="details-page" class="content details">
<h1>${article.title}</h1>

<div class="details-content">
    <strong>Published in category ${article.category}</strong>
    <p>${article.content}</p>

    ${isOwn ? html`<div class="buttons">
    <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
    <a href="/edit/${article._id}" class="btn edit">Edit</a>
    <a href="/" class="btn edit">Back</a>
</div>` : html`<div class="buttons">
<a href="/" class="btn edit">Back</a>
</div>`}

</div>
</section>
`;

export async function detailsPage(ctx) {
    const articleId = ctx.params.id;
    const article = await getArticlesgById(articleId);
    const isOwn = ctx.user && article._ownerId == ctx.user._id;
    ctx.render(detailsTemplate(article, isOwn, onDelete));

    async function onDelete() {
        const confirmed = confirm('Sure?');
        if (confirmed) {
            await deleteArticlesById(articleId);
            ctx.page.redirect('/')
        }
    }
}