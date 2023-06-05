const wrap = document.querySelector('.department .wrap');

// fetchDepart();

// async function fetchDepart() {
// 	const result = await fetch('/DB/department.json');
// 	const data = await result.json();
// 	console.log(data);
// }

let tags = '';

fetch('/DB/department.json')
	.then((res) => {
		console.log(res);
		return res.json(); //res.json도 promise 객체를 반환함
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
		console.log(tags);
		wrap.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});
