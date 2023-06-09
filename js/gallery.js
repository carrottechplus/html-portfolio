const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const num = 500;
const myId = '198484213@N03';
const api_key = '6c70577e2661042cd0ab587b17f6c944';
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList';
const method_user = 'flickr.people.getPhotos';
const interest_url = `${baseURL}${method_interest}`;
const user_url = `${baseURL}${method_user}&user_id=${myId}`;

fetchData(interest_url);

async function fetchData(url) {
	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	console.log(items);

	createList(items);
}

function createList(arr) {
	let tags = '';

	items.forEach((item) => {
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
			// 프로필이미지가 엑박이 뜨면 onerror 이벤트로 잡아서 디폴트 이미지로 대체
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
		// 이미지 렌더링이 되기 전에 작동하면 height 값 오류 (함수에 담기 전)
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}
