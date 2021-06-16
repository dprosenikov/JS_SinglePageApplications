import {html} from '../../node_modules/lit-html/lit-html.js';

import { getRecentArticles } from '../api/data.js';
import { recentTemplate } from './common/recent.js';

const homeTemplate = (recents) => html`
<section id="home-page" class="content">
<h1>Recent Articles</h1>

${recents.map(recentTemplate)}

</section>
`;

export async function homePage(ctx) {
    const recents = await getRecentArticles();
    ctx.render(homeTemplate(recents));
}