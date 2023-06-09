const wrap = document.querySelector('.gallery .wrap');
const num = 500;
const api_key = '6c70577e2661042cd0ab587b17f6c944';
const myID = '198484213@N03';

const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList';
const method_user = 'flickr.people.getPhotos';
const interest_url = `${baseURL}${method_interest}`;
const user_url = `${baseURL}${method_user}&user_id=${myID}`;

// 검색량 많은 순 사진 불러옴

const loading = document.querySelector('.gallery .loading');

// fetching > dom 생성 > 정렬

fetch(user_url)
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
            <img src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
          </a>
          <p>${item.title === '' ? 'Have a good day !' : item.title}</p>
        </div>
      </li>
      `;
		});

		wrap.innerHTML = tags;
		// isoLayout 처음 적용시 이미지 카드가 겹치는 원인
		// isoDom은 생성되었지만 해당 돔에 수반되는 소스 이미지가 아직 렌더링 되지 않은 상태에서 isoLayout 구문이 호출되었기 때문
		// 해결 방법 - 동적으로 만들어진 모든 imgDom을 반복돌면서 onload 이벤트를 연결해서 모든 소스 이미지까지 렌더링 완료된 시점에 isoLayout을 호출

		const imgs = wrap.querySelectorAll('img');

		let count = 0;

		for (const el of imgs) {
			el.onload = () => {
				count++; // 이미지의 소스이미지가 렌더링 완료될때마다 증가
				// console.log(count);

				// 소스이미지의 렌더링완료된 숫자와 imgDom의 객체의 수가 동일할 때,, 모든 이미지돔에 해당하는 소스이미지가 렌더링 완료된 순간, 이때 isoLayout g호출

				count === imgs.length && isoLayout();
				// if(count === imgs.length) isoLayout();
				// count === imgs.length ? isoLayout() : null;
			};
		}
	});

function isoLayout() {
	new Isotope(wrap, {
		// 이미지 렌더링이 되기 전에 작동하면 height 값 오류 (함수에 담기 전)
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}
