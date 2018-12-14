class LoginScene extends Scene {
	//public btn_tc: eui.Label;//弹出层按钮
	public btn_login: eui.Button;//切换场景


	public constructor() {
		super();
		this.skinName = "resource/scene/LoginScene.exml";
	}
	protected onComplete() {
		//this.btn_tc.touchEnabled = true;
		//this.btn_login.touchEnabled = true;
		//this.btn_tc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaptc, this);
		platform.login();
		this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
		
	}

	private onLogin(){
		var data=JSON.parse("{\"openid\":\""+egret.localStorage.getItem("openid")+"\"}");
		//Sk_PostJSON.SendTo(data,this.onLoadTx,"",Sk_DATA.GET_USER_URL,this);
		Sk_PostJSON.SendTo(data,this.onGetUser,"",Sk_DATA.GET_USER_URL,this);


	}

	private onGetUser(result,self) {
		///if(null==result.data){
			self.toRegister();
		//}
	}

	
	//弹出场景
	private toRegister(){
		let tc:RegisterWin = new RegisterWin();
		SceneManager.Instance.pushScene(tc);
	}

}