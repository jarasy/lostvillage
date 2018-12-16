class RegisterWin extends Scene{
	public btn_ok:eui.Button;
    public ipt_name:eui.TextInput;

    public rb_nan:eui.RadioButton;
    public rb_nv:eui.RadioButton;
    public rb_dao:eui.RadioButton;
    public rb_jian:eui.RadioButton;
    public rb_qiang:eui.RadioButton;

    public genderGroup: eui.RadioButtonGroup;
    public professionGroup: eui.RadioButtonGroup;

    private gender:Number=1;
    private profession:Number=1;

	public constructor() {
		super();
		this.skinName = "resource/windows/RegisterWin.exml";
	}
	protected onComplete() {
		this.btn_ok.touchEnabled = true;
		this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToAddRole, this);

        this.genderGroup = new eui.RadioButtonGroup();
        this.rb_nan.group=this.genderGroup;
        this.rb_nv.group=this.genderGroup;
        this.rb_nan.selected = true;//默认选项
        
        this.professionGroup = new eui.RadioButtonGroup();
        this.rb_dao.group=this.professionGroup;
        this.rb_jian.group=this.professionGroup;
        this.rb_qiang.group=this.professionGroup;
        this.rb_dao.selected = true;//默认选项

        this.genderGroup.addEventListener(eui.UIEvent.CHANGE, this.genderGroupChangeHandler, this);
        this.professionGroup.addEventListener(eui.UIEvent.CHANGE, this.professionGroupChangeHandler, this);

	}

    private genderGroupChangeHandler(evt:eui.UIEvent):void {
        var radioGroup: eui.RadioButtonGroup = evt.target;
        this.gender=radioGroup.selectedValue;
    }
    private professionGroupChangeHandler(evt:eui.UIEvent):void {
        var radioGroup: eui.RadioButtonGroup = evt.target;
        this.profession=radioGroup.selectedValue;
    }
    
	private onToAddRole() {
		SceneManager.Instance.popScene();
        //console.log(this.gender+"=="+this.profession);
        let lw:LoadingWin = new LoadingWin();
		SceneManager.Instance.pushScene(lw);
        var data=JSON.parse("{\"openid\":\""+egret.localStorage.getItem("openid")+"\","+"\"name\":\""+this.ipt_name.text+"\","+"\"gender\":\""+this.gender+"\","+"\"profession\":\""+this.profession+"\"}");
        Sk_PostJSON.SendTo(data,this.onToGameScene,"",Sk_DATA.ADD_ROLE_URL,this);
        
	}

    private onToGameScene(result,self) {
        if(0==result.code){
            egret.localStorage.setItem("property",result.data);
            let s1:GameScene =  new GameScene();
            //切换到首页
            SceneManager.Instance.changeScene(s1);
        }
	}
}