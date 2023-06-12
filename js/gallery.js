const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btnSearch');
const btnInterest = document.querySelector('.gallery .btnInterest');
const btnMine = document.querySelector('.gallery .btnMine');
const api_key = '6c70577e2661042cd0ab587b17f6c944';
const num = 50;
const myId = '198484213@N03';

/*
keydown 키를 누를때
keyup 키를 뗄 떄, macOS에서 이벤트가 두번씩 발생
keypress 키를 눌렀다가 뗄 때, 한자같은 특수키 지원안됨
 */

fetchData(setURL('interest'));

btnSearch.addEventListener('click', () => getSearch());

// 검색창에 키보드 이벤트 연결
input.addEventListener('keypress', (e) => e.code === 'Enter' && getSearch());

// 사용자 아이디 클릭시 해당 갤러리 확인 이벤트
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'userid') {
		// const userId = e.target.innerText;
		// const url_user = `${baseURL}${method_user}&user_id=${userId}`;
		fetchData(setURL('user', e.target.innerText));
	}

	if (e.target.className === 'thumb') {
		createPop(e.target.getAttribute('alt'));
	}

	if (e.target.className === 'close') {
		removePop();
	}
});

btnInterest.addEventListener('click', () => fetchData(setURL('interest')));
btnMine.addEventListener('click', () => fetchData(setURL('user', myId)));

function getSearch() {
	const value = input.value.trim();
	input.value = '';
	if (value === '') {
		return alert('검색어를 입력해 주세요.');
	}

	// const url_search = `${baseURL}${method_search}&tags=${value}`;
	fetchData(setURL('search', value));
}

// 인수값에 따른 데이터 호출 URL 반환 함수
function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	// const url_interest = `${baseURL}${method_interest}`;
	// const url_user = `${baseURL}${method_user}&user_id=${myId}`;
	// const url_search = `${baseURL}${method_search}&tags=${value}`;

	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_user}&user_id=${opt}`;
}

async function fetchData(url) {
	loading.classList.remove('off');
	wrap.classList.remove('on');
	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;

	if (items.length === 0) {
		loading.classList.add('off');
		wrap.classList.add('on');
		return alert('해당 검색어의 결과 이미지가 없습니다.');
	}

	createList(items);
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
      <li class='item'>
        <div class=''>
            <img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg' />
          <p>${item.title === '' ? 'Have a good day !' : item.title}</p>
					<article class='profile'>	
						<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />
						<span class='userid'>${item.owner}</span>
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

function createPop(url) {
	const aside = document.createElement('aside');
	aside.className = 'pop';
	const tags = `
		<div class='con'>
			<img class='' src='${url}'>
		</div>
		<span class='close'>close</span>
	`;
	aside.innerHTML = tags;
	document.body.append(aside);

	setTimeout(() => document.querySelector('aside').classList.add('on'), 0);
}

function removePop() {
	const pop = document.querySelector('.pop');
	pop.classList.remove('on');
	setTimeout(() => {
		pop.remove();
	}, 500);
}
