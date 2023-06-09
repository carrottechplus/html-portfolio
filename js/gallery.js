const wrap = document.querySelector('.gallery .wrap');
const num = 500;
const api_key = '6c70577e2661042cd0ab587b17f6c944';
const myID = '198484213@N03';

const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList';
const method_user = 'flickr.people.getPhotos';
const url_interest = `${baseURL}${method_interest}`;
const url_user = `${baseURL}${method_user}&user_id=${myID}`;

const loading = document.querySelector('.gallery .loading');

fetch(url_user)
	.then((res) => res.json())
	.then((json) => {
		// console.log(json.photos.photo);
		const items = json.photos.photo;

		let tags = '';

		items.forEach((item) => {
			tags += `
      <li class='item'>
        <div class=''>
          <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'>
            <img class='pic' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
          </a>
          <p>${item.title === '' ? 'Have a good day !' : item.title}</p>
        </div>
      </li>
      `;
		});

		wrap.innerHTML = tags;

		const imgs = wrap.querySelectorAll('img');

		let count = 0;

		for (const el of imgs) {
			el.onload = () => {
				count++;

				count === imgs.length && isoLayout();
				// if(count === imgs.length) isoLayout();
				// count === imgs.length ? isoLayout() : null;
			};
		}
	});

document.body.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.className === 'pic') {
		const imgSrc = e.target.closest('a').getAttribute('href');
		console.log(imgSrc);
		createPop(imgSrc);
	}
	if (e.target.className === 'close') removePop();
});

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}

function createPop(imgSrc) {
	const tags = `
		<div class='con'>
			<img class='thumb' src='${imgSrc}'/>
		</div>
		<span class='close'>close</span>
	`;

	const aside = document.createElement('aside');
	aside.classList = 'pop';
	aside.innerHTML = tags;
	document.body.append(aside);
	setTimeout(() => document.querySelector('.pop').classList.add('on'), 0);
	document.body.style.overflow = 'hidden';
}

function removePop() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => document.querySelector('.pop').remove(), 1000);
	document.body.style.overflow = 'auto';
}
