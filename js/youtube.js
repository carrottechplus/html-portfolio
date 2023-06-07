const wrap = document.querySelector('.youtube .wrap');
fetchData();

wrap.addEventListener('click', (e) => {
	console.dir(e.target);
	if (e.target.nodeName !== 'IMG') return;
	console.log(e.target.getAttribute('alt'));
});

// 분리해보기
// 데이터 fetching함수
async function fetchData() {
	const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
	const list = 'PLQZTVbf9_qAnD8qhXt02stKVXVQd-v-pf';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const data = await fetch(url);
	const json = await data.json();
	console.log(json.items);

	createList(json.items);

	// fetch(url)
	// 	.then((data) => data.json())
	// 	.then((json) => {});
}

// 동적으로 목록을 만드는 함수

function createList(arr) {
	let tags = '';
	arr.forEach((item) => {
		let title = item.snippet.title;
		let desc = item.snippet.description;
		let date = item.snippet.publishedAt;
		tags += `
			<article>
				<h2>${title.length > 50 ? title.substr(0, 50) + '...' : title}</h2>
				<div class='txt'>
					<p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
					<span>${date.split('T')[0].split('-').join('/')}</span>
				</div>
				<div class='pic'>
					<img src=${item.snippet.thumbnails.standard.url} alt=${item.snippet.resourceId.videoId}>
				</div>
			</article>
			`;
	});

	wrap.innerHTML = tags;
}

// 이벤트가 동작되는 함수
