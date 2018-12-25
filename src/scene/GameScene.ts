

class GameScene extends Scene {
	public btn_bb: eui.Button;
	public btn_map: eui.Button;
	public dj: eui.Label;
	public hs: eui.Label;
	public mc: eui.Label;
	public property: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/scene/GameScene.exml";
	}
	protected onComplete() {
		//console.log(egret.localStorage.getItem("property"));
		var data=<any>egret.localStorage.getItem("property");
		egret.localStorage.setItem("roleId",data.id);
		this.dj.text=data.level;
		this.mc.text=data.name;
		this.hs.text=data.hs;
		this.property.text=data.hp+"_"+data.mp+"_"+data.gj+"_"+data.fy+"_"+data.sd+"_"+data.hx;
		this.btn_bb.touchEnabled = true;
		this.btn_bb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowBB, this);
		this.btn_map.touchEnabled = true;
		this.btn_map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowMap, this);
	}

	private onLoadTx(base64,self){
		var saveImage: HTMLImageElement = new Image;
		 saveImage.onload = () => {
          let texture:egret.Texture = new egret.Texture();
          let bitmapdata:egret.BitmapData = new egret.BitmapData(saveImage);
          texture.bitmapData = bitmapdata;
          let imgReview: egret.Bitmap = new egret.Bitmap(texture);
		  imgReview.height=90;
		  imgReview.width=90;
		  imgReview.x=15;
		  imgReview.y=15;
          self.addChild(imgReview);
      }
		saveImage.src = "data:image/png;base64,"+base64.data;
	}




	private toShowBB() {
		let bs:BackpackScene =new BackpackScene();
		SceneManager.Instance.changeScene(bs);
	}

	private toShowMap() {
		let mv:MapView =new MapView();
		SceneManager.Instance.changeScene(mv);
	}

}