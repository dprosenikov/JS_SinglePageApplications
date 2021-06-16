import { html } from '../../node_modules/lit-html/lit-html.js';

import { search } from '../api/data.js';
import { articleTemplate } from './common/article.js';

const searchTemplate = (results, onSearch, searchText) => html`
<section id="search-page" class="content">
<h1>Search</h1>
<form @submit=${onSearch} id="search-form">
    <p class="field search">
        <input type="text" placeholder="Search by article title" name="search" .value=${searchText || ''}>
    </p>
    <p class="field submit">
        <input class="btn submit" type="submit" value="Search ${results.lenght}">
    </p>
</form>
<div class="search-container">

${(results === undefined || results.length == 0) ? html`<h3 class="no-articles">No matching articles</h3>` : results.map(articleTemplate)}


</div>
</section>
`;

export async function searchPage(ctx) {
    const searchText = ctx.querystring.split('=')[1];
    const results = searchText ? await search(searchText) : []
    console.log(results)
    ctx.render(searchTemplate(results, onSearch, searchText));

    function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('search');
        ctx.page.redirect('/search?query=' + query)
    }
}