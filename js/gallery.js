const wrap = document.querySelector('.gallery .wrap');
const api_key = '6c70577e2661042cd0ab587b17f6c944';
const method_interest = 'flickr.interestingness.getList';
const num = 50;
const baseUrl = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${num}`;

fetch(baseUrl)
	.then((res) => res.json())
	.then((json) => {
		console.log(json.photos.photo);
		const items = json.photos.photo;

		let tags = '';

		items.forEach((item) => {
			tags += `
      <article>
        <div class='pic'>
          <img src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
        </div>
      </article>
      `;
		});

		wrap.innerHTML = tags;
	});
