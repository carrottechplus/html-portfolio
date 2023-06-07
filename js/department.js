const wrap = document.querySelector('.department .wrap');

// fetchDepart();

// async function fetchDepart() {
// 	const result = await fetch('/DB/department.json');
// 	const data = await result.json();
// 	console.log(data);
// }

/* fetch('data url')
	.then((data) => data.json)
	.then((json) => {
		//해당 url의 데이터 출력
		//데이터가 성공적으로 받아졌을 때 실행할 구문
		console.log(json);
	})
	.catch((err) => {
		//데이터가 응답에 실패했을떄 실행할 구문
		console.log(err);
	});
 */
let tags = '';

fetch('/DB/department.json')
	.then((res) => {
		console.log(res);
		return res.json(); //res.json도 promise 객체를 반환함
		//return 쓰는 이유
	})
	.then((data) => {
		const memberData = data.members;
		memberData.map((data, idx) => {
			tags += `
        <article>
        <div class='pic'>
        <img src='img/${data.pic}'>
        </div>
          <h2>${data.name}</h2>
          <p>${data.position}</p>
        </article>
      `;
		});
		// console.log(tags);
		wrap.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});
