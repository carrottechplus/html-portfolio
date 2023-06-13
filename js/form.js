/* 
1. submit 버튼에 폼 전송 이벤트 연결
2. 각 폼 항목마다의 인증함수 정의
3. 각 함수마다 인증여부에 따라 boolean 값 return
4. 전송 버튼 클릭 시 각 함수에서 하나라도 false값 리턴하면 기본전송기능 막음.
 */

console.log(document.querySelector('select[name=edu]'));

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 4)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
});

// 텍스트 항목 입력 받아 인증
function isTxt(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const txt = input.value.trim();

	if (txt.length < len) {
		alert(`입력한 텍스트 항목을 ${len}글자 이상 입력하세요.`);
		return false;
	} else {
		return true;
	}
}

// pwd 항목 입력 받아 인증
// 5글자 이상이면 입력, 2개의 비밀번호가 동일
function isPwd(pwd1, pwd2, len) {
	const pwd1_val = form.querySelector(`[name=${pwd1}]`).value;
	const pwd2_val = form.querySelector(`[name=${pwd2}]`).value;

	// if (pwd1 === pwd2 && pwd1.length > len) {
	// 	return true;
	// } else {
	// 	alert(`비밀번호 항목 2개를 동일하게 입력하고 ${len}글자 이상 입력하세요`);
	// 	return false;

	if (pwd1_val !== pwd2_val || pwd1_val.length < len) {
		alert(`비밀번호 항목 2개를 동일하게 입력하고 ${len}글자 이상 입력하세요`);
		return false;
	} else {
		return true;
	}
}

// email 항목 입력 받아 인증
// 6글자 이상이면 입력, @포함
function isEmail(name, len) {
	const email = form.querySelector(`[name=${name}]`).value;

	if (email.indexOf('@') < 0 || email.length < len) {
		alert('@포함');
		return false;
	} else {
		return true;
	}
}

// 체크박스 항목 입력 받아 인증
function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;

	// 현재 반복도는 체크폼요소에 하나라도 체크되어 있는게 있다면 지역변수 isChecked를 true
	for (const input of inputs) input.checked && (isChecked = true);
	// && 연산자 다음에 = 대입은 못나옴 괄호로 묶어주자
	if (!isChecked) {
		alert('해당 선택사항을 하나 이상 체크하시오');
		return false;
	} else {
		return true;
	}
}

// select 항목 입력 받아 인증
function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;

	if (value === '') {
		alert('해당 요소 중 하나를 선택하시오');
		return false;
	} else {
		return true;
	}
}
