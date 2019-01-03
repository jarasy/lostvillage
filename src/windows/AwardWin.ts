class AwardWin extends Scene{
	public btn_win:eui.Button;
	public lab_lvUp:eui.Label;
	public lab_award:eui.Label;

	public p:FightingScene;
	public data:any;
	

	public constructor(p:FightingScene,data:any) {
		super();
		this.p=p;
		this.data=data;
		this.skinName = "resource/windows/AwardWin.exml";
	}
	protected onComplete() {
		this.btn_win.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ok, this);
		if(this.data.lvUp==true){
			this.lab_lvUp.text="升级!";
		}
		console.log(this.data);
		console.log(this.data.goods.length);
		console.log(this.data.goods);
		var awards="";
		for(let i=0;i<this.data.goods.length;i++){
			console.log(this.data.goods[i].name);
			awards+=this.data.goods[i].name+" x"+this.data.goods[i].count;
			console.log(awards);
		}
		this.lab_award.text=awards;
	}

    private ok() {
       this.p.toBack();
    }

}