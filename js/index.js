
let calc_button = document.getElementById('calc_button');
let input = document.getElementById('input');
let result = document.getElementById('display_result');
let errors = document.getElementById('display_errors');
let category = document.querySelector('[data-js="category"]');
let payment_type = document.querySelector('[data-js="payment_type"]');
let result_info = document.querySelector('[data-js="result_info"]');
let selected_data = {};
// 少数点の入力をはじくためのパターン
let pattern = /^([1-9]\d*|0)$/;



// クラス追加、削除
function addClass( target_element, add_class_name ){
	target_element.classList.add(add_class_name);
};
function removeClass( target_element, remove_class_name ){
	target_element.classList.remove(remove_class_name);
};

// エラーを吐いた時のメッセージとスタイルをセットする関数
//		element = ターゲットとなる要素
//		message = メッセージの種類
//		className = 付与するクラス名
//		prop = 操作したいcssのプロパティ
//		value = プロパティの値
function setMessageAndStyle( element, message, class_name, prop, value ){
	element.innerText = message;
	element.style[prop] = value;
	element.classList.add(class_name);
	if( message !== MESSAGES.ERROR.E2 ){
		input.classList.add('is_error');
	}
};

// 消費税を算出する関数
function getTaxRate(item){
	if (item === "1"){
		return tax_8per;
	} else {
		return tax_10per;
	}
};

// キャッシュバック金額を算出
function getCashBack( price, tax_rate, payment_type, cash_back_rate ){
	if( tax_rate === 0.1 && payment_type === "2"){
		let num = parseInt( price, 10 );
		return num * cash_back_rate;
	} else {
		return 0;
	}
};


// 全角文字かどうかを判別(true / false をreturn)
function isZenkaku( input ){
	return input.match(/^[^\x01-\x7E\xA1-\xDF]+$/);
};

//小数値かどうかを判別(true / false)
function isFloat( input ){
	return pattern.test(input);
};

// 数値が入力されたときは以下の処理が走る
function getPriceInTaxRate( input, tax_rate ) {
	// フォームの入力値を10進数に変換
	let num = parseInt( input, 10 );
	return Math.floor( num + num * tax_rate );
};

// 決定ボタンが押された時の処理
function pushCalcButton() {

	if( isZenkaku(input.value) ){ // 入力値が全角の場合true
		setMessageAndStyle( errors, MESSAGES.ERROR.E1, 'error_message', 'background', 'crimson');
		return errors;
	};

	if( input.value === '' ){ // 入力値が空欄の場合true
		setMessageAndStyle( errors, MESSAGES.ERROR.E1, 'error_message', 'background', 'crimson');
		return errors;
	};

	if( isNaN(input.value)){ // 入力値が数値以外の場合true
		setMessageAndStyle( errors, MESSAGES.ERROR.E1, 'error_message', 'background', 'crimson');
		return errors;
	};

	if(! isFloat(input.value)){ // float型のチェック
		setMessageAndStyle( errors, MESSAGES.ERROR.E1, 'error_message', 'background', 'crimson');
		return errors;
	}

	// 購入品・支払い方法 いずれかが未選択の場合
	if( category.value === "0" || payment_type.value === "0" ){
		setMessageAndStyle( errors, MESSAGES.ERROR.E2, 'error_message', 'background', 'crimson');
		return errors;
	}

	let tax_rate = getTaxRate(selected_data.category);
	let cash_back = getCashBack(input.value, tax_rate, selected_data.payment_type, cash_back_rate);
	let result_calc = getPriceInTaxRate( input.value, tax_rate );

	removeClass( result, 'error_message' );
	removeClass( input, 'is_error' );
	selected_data['price'] = input.value;

	let result_item = '';
	result_item += `<p>${result_calc}円</p>`;
	result_item += `<p>${tax_rate * 100}%</p>`;
	result_item += `<p>${cash_back}円</p>`;

	result_info.innerHTML = result_item;
	result_item = '';
};

function resetView(){
	removeClass( input, 'is_error' );
	errors.style.background = 'transparent';
	errors.innerText = '';
}



// エラーを吐いた状態から入力フォームにフォーカスした場合、エラー表示部分のCSSをリセットする。
input.addEventListener('focus', function(){
	if ( input.classList =~ "is_error"){
		resetView();
		input.value = '';
	};
});

category.addEventListener('focus', function(){
	if ( category.classList =~ "is_error"){
		resetView();
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