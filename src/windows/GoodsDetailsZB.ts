

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

	public constructor(id:number) {
		super();
		this.skinName = "resource/windows/GoodsDetailsZB.exml";

        var data=JSON.parse("{\"id\":"+id+"}");	
		Sk_PostJSON.SendTo(data,this.onLoadLab,"",Sk_DATA.GET_GOODSBYID_URL,this);	 
        
	}
	protected onComplete() {
		this.btn_zb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowView, this);
		this.btn_dq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowView, this);
		this.btn_qx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toClose, this);
	}

	private onLoadLab(result,self){
        var property:String[] =String(result.data.parameter).split("_");
        self.lab_hp.text=property[1]+"";
		self.lab_mp.text=property[2]+"";
        self.lab_gj.text=property[3]+"";
        self.lab_fy.text=property[4]+"";
        self.lab_sd.text=property[5]+"";
        self.lab_hx.text=property[6]+"";

        self.lab_name.text=result.data.name;
	}




	private toShowView() {
		let bs:BackpackScene =new BackpackScene();
		SceneManager.Instance.pushScene(bs);
	}
    private toClose() {
		SceneManager.Instance.popScene();
	}

}