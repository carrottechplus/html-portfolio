const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const num = 50;
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btnSearch');

const myId = '198484213@N03';
const api_key = '6c70577e2661042cd0ab587b17f6c944';
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

const method_interest = 'flickr.interestingness.getList';
const method_user = 'flickr.people.getPhotos';
const method_search = 'flickr.photos.search';

const url_interest = `${baseURL}${method_interest}`;
const url_user = `${baseURL}${method_user}&user_id=${myId}`;
const url_search = `${baseURL}${method_search}&tags=dog`;

fetchData(url_interest);

btnSearch.addEventListener('click', (e) => {
	e.preventDefault();
	const value = input.value.trim();
	input.value = '';
	if (value === '') {
		return alert('검색어를 입력해 주세요.');
	}
	loading.classList.remove('off');
	wrap.classList.remove('on');
	const url_search = `${baseURL}${method_search}&tags=${value}`;
	fetchData(url_search);
});

async function fetchData(url) {
	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	console.log(items);

	createList(items);
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
      <li class='item'>
        <div class=''>
          <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'>
            <img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
          </a>
          <p>${item.title === '' ? 'Have a good day !' : item.title}</p>
					<article class='profile'>	
						<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />				
						<span>${item.owner}</span>
					</article>
        </div>
      </li>
      `;
	});

	wrap.innerHTML = tags;

	setLoading();
}

function setLoading() {
	const imgs = wrap.querySelectorAll('img');
	let count = 0;

	for (const el of imgs) {
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
		el.onload = () => {
			count++;
			count === imgs.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}
