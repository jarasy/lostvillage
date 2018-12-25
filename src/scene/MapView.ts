

class MapView extends Scene {
    public btn_back:eui.Button;
    public map:lv.Map;

	public tempHpPlayer:number =0;
	public tempMpPlayer:number =0;

	public tempHpFs:number =0;
	public tempMpFs:number =0;

	public tempHpPet:number =0;
	public tempMpPet:number =0;


	public constructor() {
		super();
		this.skinName = "resource/scene/MapView.exml";
		
		var data=JSON.parse("{\"openId\":\""+egret.localStorage.getItem("openId")+"\"}");	
		Sk_PostJSON.SendTo(data,this.getPlays,"",Sk_DATA.GET_PLAYS_URL,this);	 
		

	}


	protected onComplete() {
        //背景
		this.map = new lv.Map(this);
		this.map.init();
		this.map.x = 80;
		this.map.y = 300;

		this.addChild(this.map);
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
	}
	private getPlays(result,self) {	
		egret.localStorage.setItem("players",result.data);
	}

	public getMonsters(){
		var data=JSON.parse("{\"openId\":\""+egret.localStorage.getItem("openId")+"\",\"mapId\":\"1\"}");	
		Sk_PostJSON.SendTo(data,this.toFighting,"",Sk_DATA.GET_MONSTERS_URL,this);	
	}

	public toFighting(result,self){
		//console.log(result.data);
		egret.localStorage.setItem("monsterData",result.data);
		let fs:FightingScene=new FightingScene();
		SceneManager.Instance.pushScene(fs);
	}

	private toBack() {	
		let s1:GameScene =  new GameScene();
		SceneManager.Instance.changeScene(s1);
	}

	
}