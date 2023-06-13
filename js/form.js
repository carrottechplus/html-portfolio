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
	// if (!isTxt('userid', 5)) e.preventDefault();
	// if (!isPwd('pwd1', 'pwd2', 4)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	// if (!isCheck('gender')) e.preventDefault();
	// if (!isCheck('hobby')) e.preventDefault();
	// if (!isSelect('edu')) e.preventDefault();
});

// 텍스트 항목 입력 받아 인증
function isTxt(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const txt = input.value.trim();

	if (txt.length < len) {
		// alert(`입력한 텍스트 항목을 ${len}글자 이상 입력하세요.`);
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `텍스트를 ${len}글자 이상 입력하세요.`;
		input.closest('td').append(errMsg);

		return false;
	} else {
		resetErr(input);
		return true;
	}
}

// pwd 항목 입력 받아 인증
// 5글자 이상이면 입력, 2개의 비밀번호가 동일
function isPwd(pwd1, pwd2, len) {
	const num = /[0-9]/; // 0부터 9까지 다
	const eng = /[a-zA-Z]/; // 대소문자 합쳐서 a~z까지ㄴㅁ아허ㅏㅁㄴ어ㅏ먼ㅇㅎ;ㅣㅏㅓㅁ
	const spc = /[!@#$%^&*()_+]/;

	const pwdEl1 = form.querySelector(`[name=${pwd1}]`);
	const pwd1_val = form.querySelector(`[name=${pwd1}]`).value;
	const pwd2_val = form.querySelector(`[name=${pwd2}]`).value;

	// num.test(pwd1_val) : pwd1_val에서 정규표현식으로 분류한 값이 포함되어 있으면 true 반환, 그렇지 않으면 false반환

	if (pwd1_val !== pwd2_val || pwd1_val.length < len || !num.test(pwd1_val) || !eng.test(pwd1_val) || !spc.test(pwd1_val)) {
		// alert(`비밀번호 항목 2개를 동일하게 입력하고 ${len}글자 이상 입력하세요`);
		resetErr(pwdEl1);
		const errMsg = document.createElement('p');
		errMsg.innerText = `비밀번호 ${len}글자 이상, 특수문자, 영문, 숫자를 모두 포함하여 입력하시오`;
		pwdEl1.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(pwdEl1);
		return true;
	}
}

// email 항목 입력 받아 인증
// 6글자 이상이면 입력, @포함, 문자 사이에 @가 있어야 하고 @ 뒤에 .이 있어야 함
function isEmail(name, len) {
	const email = form.querySelector(`[name=${name}]`);
	const email_val = email.value;

	//if (email_value.indexOf('@') < 0 || email_value.length < len || !email_val2.test(email_value)) {

	// 순서1 - 이메일 주소에 @ 있는지 판단
	if (/@/.test(email_val)) {
		console.log('test');
		const [forwardTxt, backwardTxt] = email_val.split('@');

		// 순서3 - @가 있다는 전제하에 @앞뒤로 문자값이 있는지 확인해서 없으면 에러 반환
		if (!forwardTxt || !backwardTxt) {
			console.log('test2');
			resetErr(email);
			const errMsg = document.createElement('p');
			errMsg.innerText = `@ 앞쪽이나 뒷쪽에 문자값이 없습니다.`;
			email.closest('td').append(errMsg);
			return false;

			// 순서4 - 뒤쪽문자에 .이 없으면 에러 반환
		} else {
			// 정규표현식 안쪽에 예약어로 인지되는 문자앞에 역슬래쉬를 붙여서 예약어에서 제외시켜서 문자로 연산
			if (!/\./.test(backwardTxt)) {
				console.log('test3');
				resetErr(email);
				const errMsg = document.createElement('p');
				errMsg.innerText = `@ 뒤쪽에 서비스명이 올바른지 확인하세요.`;
				email.closest('td').append(errMsg);
				return false;
			} else {
				resetErr(email);
				return true;
			}
		}
		// 순서2 - @없으면 에러문구 출력하고 false 반환
	} else {
		resetErr(email);
		const errMsg = document.createElement('p');
		errMsg.innerText = `@포함하여 입력하고 ${len}글자 이상 입력하시오`;
		email.closest('td').append(errMsg);
		return false;
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
		// alert('해당 선택사항을 하나 이상 체크하시오');
		resetErr(inputs);
		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 항목을 하나 이상 체크하시오.`;
		inputs[0].closest('td').append(errMsg);

		return false;
	} else {
		resetErr(inputs);
		return true;
	}
}

// select 항목 입력 받아 인증
function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;

	if (value === '') {
		// alert('해당 요소 중 하나를 선택하시오');
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 요소 중 하나를 선택하시오.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

// 에러 메세지 제거 함수
function resetErr(inputs) {
	// 파라미터로 들어오는 요소의 형태 확인해야함 배열인지 뭔지

	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	// 배열인 경우에만 length가 존재

	const errMsg = el.closest('td').querySelector('p');
	if (errMsg) {
		el.closest('td').querySelector('p').remove();
	}
}
