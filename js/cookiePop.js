const btnShow = document.querySelector('header h1');
const btnDelete = document.querySelectorAll('header #gnb li')[0];
const pop = document.querySelector('#pop');
const ck = pop.querySelector('#ck');
const btnClose = pop.querySelector('.close');

const cookieData = document.cookie;
if (cookieData.indexOf('today=done') < 0) {
	//쿠키가 없을 때
	pop.style.display = 'block';
} else {
	//쿠키가 있을 때
	pop.style.display = 'none';
}

setCookie('today', 'done', 1);

btnShow.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(document.cookie);
});

btnDelete.addEventListener('click', (e) => {
	e.preventDefault();
	setCookie('today', 'done', 0);
	alert('쿠키삭제 완료');
});

// 팝업 닫기 이벤트
btnClose.addEventListener('click', (e) => {
	e.preventDefault();
	if (ck.checked) setCookie('today', 'done', 1);
	pop.style.display = 'none';
});

function setCookie(name, value, expires) {
	//expires : 쿠키를 얼마기간동안 안보이게 설정할건지 숫자값만 넣는게 아니라 시간값 구해서 하는 등.. 근데 0으로 설정하면 쿠키가 지워지는날이 오늘임

	let today = new Date();
	let duedate = today.getDate() + expires;
	today.setDate(duedate);
	const result = today.toGMTString();
	document.cookie = `${name}=${value}; path=/; expires=${result}`;
}
