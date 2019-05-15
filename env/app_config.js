const MESSAGES = {
		SUCCESS :{
			CALC_SUCCESS : "正常に計算できました！"
		},
		WARNING :{
			ZENKAKU : "半角数字で入力してください！",
			WRONG_DATA : "数値を入力してください！",
		},
		ERROR :{
			NULL_FORM : "何か値を入力してください！",
			E1 : "税抜金額は半角数字のみで入力してください。",
			E2 : "購入品・支払い方法が選択されていません。"
		}
};
const tax_8per = 0.08;
const tax_10per = 0.1;
const cash_back_rate = 0.02;