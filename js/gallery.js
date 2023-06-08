const wrap = document.querySelector('.gallery .wrap');
const api_key = '6c70577e2661042cd0ab587b17f6c944';
const method_interest = 'flickr.interestingness.getList';
const num = 20;
const baseUrl = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${num}`;
// 검색량 많은 순 사진 불러옴

fetch(baseUrl)
	.then((res) => res.json())
	.then((json) => {
		console.log(json.photos.photo);
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

		new Isotope(wrap, {
			// options
			itemSelector: '.item',
			transitionDuration: '0.5s',
		});
	});
