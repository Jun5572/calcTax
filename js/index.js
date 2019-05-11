
let calc_button = document.getElementById('calc_button');
let input = document.getElementById('input');
let result = document.getElementById('display_result');
let errors = document.getElementById('display_errors');
let category = document.querySelector('[data-js="category"]');
let payment_type = document.querySelector('[data-js="payment_type"]');
let result_info = document.querySelector('[data-js="result_info"]');
let selected_data = {};
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

// 消費税を算出する関数
function getTaxRate(item){
	if (item === "1"){
		return taxRate8;
	} else {
		return taxRate10;
	}
};

// キャッシュバック金額を算出
function getCashBack( price, taxRate, paymentType, cashBackRate ){
	if( taxRate === 0.1 && paymentType === "2"){
		let num = parseInt( price, 10);
		return num * cashBackRate;
	} else {
		return 0;
	}
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
		setMessageAndStyle( errors, MESSAGES.ERROR.E1, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		result_info.innerText = "";
		return errors;
	};

	if( input.value === '' ){ // 入力値が空欄の場合trueとなりエラーを吐く
		setMessageAndStyle( errors, MESSAGES.ERROR.E1, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		result_info.innerText = "";
		return errors;
	};

	if( isNaN(input.value)){ // 入力値が数値以外の場合trueとなりエラーを吐く
		setMessageAndStyle( errors, MESSAGES.ERROR.E1, 'error_message', 'background', 'crimson');
		addClass( input, 'is_error' );
		result_info.innerText = "";
		return errors;
	};

	if(! selected_data['category'] || selected_data['category'] === "0"){
		setMessageAndStyle( errors, MESSAGES.ERROR.E2, 'error_message', 'background', 'crimson');
		result_info.innerText = "";
		return errors;
	} else if(! selected_data['payment_type'] || selected_data['payment_type'] === "0"){
		setMessageAndStyle( errors, MESSAGES.ERROR.E2, 'error_message', 'background', 'crimson');
		result_info.innerText = "";
		return errors;
	}

	let taxRate = getTaxRate(selected_data.category);
	let cash_back = getCashBack(input.value, taxRate, selected_data.payment_type, cashBackRate);
	let resultCalc = getPriceInTaxRate( input.value, taxRate );

	removeClass( result, 'error_message' );
	removeClass( input, 'is_error' );
	selected_data['price'] = input.value;

	let result_item = '';
	result_item += `<p>${resultCalc}円</p>`;
	result_item += `<p>${taxRate * 100}%</p>`;
	result_item += `<p>${cash_back}円</p>`;

	result_info.innerHTML = result_item;
	result_item = '';
};




// エラーを吐いた状態から入力フォームにフォーカスした場合、エラー表示部分のCSSをリセットする。
input.addEventListener('focus', function(){
	if ( input.classList =~ "is_error"){
		removeClass( input, 'is_error' );
		errors.style.background = 'transparent';
		input.value = '';
		errors.innerText = '';
	};
});
category.addEventListener('focus', function(){
	if ( category.classList =~ "is_error"){
		removeClass( input, 'is_error' );
		errors.style.background = 'transparent';
		errors.innerText = '';
	};
});


// 決定ボタンが押下されたときの処理。Enterキー押下でも発火するようにしたい
calc_button.addEventListener('click', pushCalcButton );

category.addEventListener('change', function(){
	selected_data['category'] = category.value;
	errors.style.background = 'transparent';
	errors.innerText = '';
});

payment_type.addEventListener('change', function(){
	selected_data['payment_type'] = payment_type.value;
	errors.style.background = 'transparent';
	errors.innerText = '';

});