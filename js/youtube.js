// 나의 구글 api key값
const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
// 나의 youtube playlist url (공개로 설정되어야 함)
const list = 'PLQZTVbf9_qAnD8qhXt02stKVXVQd-v-pf';
// 한페이지에 몇개 데이터를 가져올지 (maxResults)
const num = 10;
// youtube data api 사용법에 따라 작성
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

const wrap = document.querySelector('.youtube .wrap');

fetch(url)
	.then((data) => data.json())
	.then((json) => {
		// console.log(json);
		// console.log(json.items); // 배열
		let tags = '';

		json.items.forEach((item) => {
			//반복되는 객체 안 spippet
			tags += `
			<article>
				<h2>${item.snippet.title}</h2>
				<img src=${item.snippet.thumbnails.standard.url}>
				<p>${item.snippet.description}</p>
				<span>${item.snippet.publishedAt}</span>
			</article>
			`;
		});

		wrap.innerHTML = tags;
	});
