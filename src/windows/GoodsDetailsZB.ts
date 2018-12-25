

class GoodsDetailsZB extends Scene {
	public btn_zb: eui.Button;
    public btn_dq: eui.Button;
    public btn_qx: eui.Button;

	public lab_hp: eui.Label;
	public lab_mp: eui.Label;
    public lab_gj: eui.Label;
    public lab_fy: eui.Label;
    public lab_sd: eui.Label;
    public lab_hx: eui.Label;

    public lab_name: eui.Label;
	public property: eui.Label;

	public id: Number;
	public wz: Number;
	public type: Number;

	public constructor(gid:number,bid:number,type:number) {
		super();
		this.skinName = "resource/windows/GoodsDetailsZB.exml";
		this.id=bid;
		this.type=type;

        var data=JSON.parse("{\"id\":"+gid+"}");	
		Sk_PostJSON.SendTo(data,this.onLoadLab,"",Sk_DATA.GET_GOODSBYID_URL,this);	 
        
	}
	protected onComplete() {
		if(this.type==1){
			this.btn_zb.label="卸下";
			this.btn_zb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toQx, this);
		}else{
			this.btn_zb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toZb, this);
		}
		
		this.btn_dq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toDq, this);
		this.btn_qx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toClose, this);
	}

	private onLoadLab(result,self){
        var property:String[] =String(result.data.parameter).split("_");
		self.wz=property[0];
        self.lab_hp.text=property[1]+"";
		self.lab_mp.text=property[2]+"";
        self.lab_gj.text=property[3]+"";
        self.lab_fy.text=property[4]+"";
        self.lab_sd.text=property[5]+"";
        self.lab_hx.text=property[6]+"";

        self.lab_name.text=result.data.name;
	}




	private toZb() {
		let data=JSON.parse("{\"id\":\""+this.id+"\",\"wz\":\""+this.wz+"\",\"roleId\":\""+egret.localStorage.getItem("roleId")+"\",\"type\":\""+2+"\"}");	
		Sk_PostJSON.SendTo(data,this.over,"",Sk_DATA.TO_ZB_URL,this);
	}
	private toDq() {
		let data=JSON.parse("{\"id\":\""+this.id+"\"}");	
		Sk_PostJSON.SendTo(data,this.over,"",Sk_DATA.TO_DQALL_URL,this);
	}
	private toQx() {
		let data=JSON.parse("{\"id\":\""+this.id+"\"}");	
		Sk_PostJSON.SendTo(data,this.over,"",Sk_DATA.TO_QX_URL,this);
	}
    private toClose() {
		SceneManager.Instance.popScene();
	}

	private over(result,self) {
		var data=JSON.parse("{\"openId\":\""+egret.localStorage.getItem("openId")+"\"}");	
		Sk_PostJSON.SendTo(data,self.toLoadProperty,"",Sk_DATA.GET_ROLEPROPERTY_URL,this);	 

	}

	private toLoadProperty(result,self) {
		egret.localStorage.setItem("property",result.data);	
		SceneManager.Instance.popScene();
		let bs:BackpackScene =new BackpackScene();
		SceneManager.Instance.changeScene(bs);
	}

}