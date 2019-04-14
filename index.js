const ERROR_NULL_FORM = "何か値を入力してください！";
const ERROR_WRONG_DATA = "数値を入力してください！";

let calc_button = document.getElementById('calc_button');
let input = document.getElementById('input');
let result = document.getElementById('display_result');
let taxRate = 0.08;



// エラーを吐いた状態から入力フォームにフォーカスした場合、エラー表示部分のCSSをリセットする。
input.addEventListener('focus', function(){
	if ( input.classList =~ "is_error"){
		input.classList.remove('is_error');
		result.style.background = 'transparent';
		result.innerText = '';
	};
});


// エラーを吐いた時のメッセージとスタイルをセット
function setMessageAndStyle( element, message, className, prop, value ){
	element.innerText = message;
	element.style[prop] = value;
	element.classList.add(className);
};

function addClass( element, className ){
	element.classList.add(className);
};
function removeClass( element, className ){
	element.classList.remove(className);
};


calc_button.addEventListener('click', function(){
// inputが空欄の場合エラーを吐く
	if( input.value === '' ){
		setMessageAndStyle( result, ERROR_NULL_FORM, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		return result;
	};

// inputが数値以外の場合エラーを吐く
	if ( isNaN(input.value)){
		setMessageAndStyle( result, ERROR_WRONG_DATA, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		return result;
	};

// 正しく数値が入力されたときは以下の処理が走る
	function getPriceInTaxRate(input, taxRate) {
		// フォームの入力値を10進数に変換
		let num = parseInt(input, 10);
		return Math.floor( num + num * taxRate );
	};

	let resultCalc = getPriceInTaxRate(input.value, taxRate);
	removeClass( result, 'error_message' );
	removeClass( input, 'is_error' );
	result.innerHTML = `${input.value}円の税込価格は、${resultCalc}円です`;
	input.value = '';
});
