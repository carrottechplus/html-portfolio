const wrap = document.querySelector('.youtube .wrap');
console.log(0);
fetchData();
console.log(2);
document.body.addEventListener('click', (e) => {
	// console.dir(e.target);
	if (e.target.className == 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className == 'close') removePop();
});

//데이터 fetching함수
// fetch 함슈는 promise를 내장하고 있음

async function fetchData() {
	const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
	// 나의 youtube playlist url (공개로 설정되어야 함)
	const list = 'PLQZTVbf9_qAnD8qhXt02stKVXVQd-v-pf';
	// 한페이지에 몇개 데이터를 가져올지 (maxResults)
	const num = 10;
	// youtube data api 사용법에 따라 작성
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const data = await fetch(url);
	const json = await data.json();

	createList(json.items);
}

//동적으로 목록 생성함수
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
            <span>${date.split('T')[0].split('-').join('.')}</span>
          </div>  
          <div class='pic'>
            <img class='thumb' src=${item.snippet.thumbnails.standard.url} alt=${item.snippet.resourceId.videoId} />
          </div>          
        </article>
      `;
	});

	wrap.innerHTML = tags;
}

//동적으로 팝업 생성함수
function createPop(id) {
	const tags = `	
			<div class='con'>
				<iframe src='https://www.youtube.com/embed/${id}' ></iframe>
			</div>
			<span class='close'>close</span>
	`;
	const pop = document.createElement('aside');
	pop.className = 'pop';
	pop.innerHTML = tags;
	document.body.append(pop);
	setTimeout(() => document.querySelector('.pop').classList.add('on'), 0);
	// append 와 아래 class on이 동시에 됨
	// 얘 하나만으로 promise 만들수는 없기 때문에
	// 강제로 동기화시켜야할 애한테 setTimeout delay 0초로 지정해서 코드를 패키징
	// >> 얘는 강제로 web api에 보냈다가 다시 마지막순번 콜스택으로 보내주기 때문에.

	document.body.style.overflow = 'hidden';
}

function removePop() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => document.querySelector('.pop').remove(), 1000);
	document.body.style.overflow = 'auto';
}
