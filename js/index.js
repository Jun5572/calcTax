
let calc_button = document.getElementById('calc_button');
let input = document.getElementById('input');
let result = document.getElementById('display_result');
let taxRate = 0.08;

// エラーを吐いた時のメッセージとスタイルをセットする関数
//		element = ターゲットとなる要素
//		message = メッセージの種類
//		className = 付与するクラス名
//		prop = 操作したいcssのプロパティ
//		value = プロパティの値
function setMessageAndStyle( element, message, className, prop, value ){
	element.innerText = message;
	element.style[prop] = value;
	element.classList.add(className);
};

// クラス追加、削除
function addClass( element, className ){
	element.classList.add(className);
};
function removeClass( element, className ){
	element.classList.remove(className);
};

// 全角文字かどうかを判別(true / false をreturn)
function checkFullWidthForm( input ){
	return input.match(/^[^\x01-\x7E\xA1-\xDF]+$/);
};

// 数値が入力されたときは以下の処理が走る
function getPriceInTaxRate( input, taxRate ) {
	// フォームの入力値を10進数に変換
	let num = parseInt( input, 10 );
	return Math.floor( num + num * taxRate );
};

//Enterキーの押下イベント時に発火できるように関数化
function pushCalcButton() {
	if( checkFullWidthForm(input.value) ){ // 入力値が全角の場合trueとなりエラーを吐く
		setMessageAndStyle( result, MESSAGES.WARNING.FULLWIDTH, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		return result;
	};

	if( input.value === '' ){ // 入力値が空欄の場合trueとなりエラーを吐く
		setMessageAndStyle( result, MESSAGES.ERROR.NULL_FORM, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		return result;
	};

	if( isNaN(input.value)){ // 入力値が数値以外の場合trueとなりエラーを吐く
		setMessageAndStyle( result, MESSAGES.WARNING.WRONG_DATA, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		return result;
	};


	let resultCalc = getPriceInTaxRate( input.value, taxRate );

	removeClass( result, 'error_message' );
	removeClass( input, 'is_error' );
	result.innerHTML = `${input.value}円の税込価格は、${resultCalc}円です`;
};


// エラーを吐いた状態から入力フォームにフォーカスした場合、エラー表示部分のCSSをリセットする。
input.addEventListener('focus', function(){
	if ( input.classList =~ "is_error"){
		removeClass( input, 'is_error' );
		result.style.background = 'transparent';
		input.value = '';
		result.innerText = '';
	};
});


// 計算ボタンが押下されたときの処理。Enterキー押下でも発火するようにしたい
calc_button.addEventListener('click', pushCalcButton );
