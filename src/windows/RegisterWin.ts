class RegisterWin extends Scene{
	public btn_ok:eui.Button;
    public ipt_name:eui.TextInput;

	public constructor() {
		super();
		this.skinName = "resource/windows/RegisterWin.exml";
	}
	protected onComplete() {
		this.btn_ok.touchEnabled = true;
		this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapclose, this);
	}
	private onTapclose() {
		SceneManager.Instance.popScene();
        console.log(this.ipt_name.text);
        
        let s1:GameScene =  new GameScene();
		//切换到首页
		SceneManager.Instance.changeScene(s1);
	}
}