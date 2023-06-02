const btnShow = document.querySelector('header h1');
const btnDelete = document.querySelectorAll('header #gnb li')[0];
const pop = document.querySelector('#pop');
const ck = pop.querySelector('#ck');
const btnClose = pop.querySelector('.close');

// 브라우저 로딩시 쿠키 유무에 따라 팝업 show/hide
const cookieData = document.cookie;
// if (cookieData.indexOf('today=done') < 0) {
// 	//쿠키가 없을 때
// 	pop.style.display = 'block';
// } else {
// 	//쿠키가 있을 때
// 	pop.style.display = 'none';
// }
cookieData.indexOf('today=done') < 0 ? (pop.style.display = 'block') : (pop.style.display = 'none');

// setCookie('today', 'done', 1);

// 쿠키 확인 이벤트
btnShow.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(document.cookie);
});

// 쿠키 삭제 이벤트
btnDelete.addEventListener('click', (e) => {
	e.preventDefault();
	setCookie('today', 'done', 0);
	alert('쿠키삭제 완료');
});

// 팝업 닫기 이벤트
btnClose.addEventListener('click', (e) => {
	e.preventDefault();

	// 체크박스에 체크가 되어있으면 쿠키 생성, 그렇지 않으면 해당 구문 무시
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
