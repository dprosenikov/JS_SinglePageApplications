import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';


import { logout as apiLogout} from './api/data.js';
import {getUserData} from './utility.js';
import { loginPage, registerPage } from './views/auth.js';
import { profilePage } from './views/mypets.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import {homePage} from './views/home.js';


const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', logout);

setUserNav();


page('/Dashboard', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/my-pets', decorateContext, profilePage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);

page.start();


function decorateContext(ctx, next) {
  	ctx.render = (content) => render(content, main);
  	ctx.setUserNav = setUserNav;
  	ctx.user = getUserData();
  	
  	next();
}

function setUserNav() {
	const user = getUserData();
	if (user) {
		document.getElementById('user').style.display = '';
		document.getElementById('guest').style.display = 'none';
		document.getElementById('user-welcome').textContent = `Welcome, ${user.email}`;
	} else {
		document.getElementById('user').style.display = 'none';
		document.getElementById('guest').style.display = '';
		document.getElementById('user-welcome').textContent = ``;
	}
}

function logout() {
	apiLogout();
	setUserNav();
	page.redirect('/Dashboard');
}
