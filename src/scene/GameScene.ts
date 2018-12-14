

class GameScene extends Scene {
	public btn_bb: eui.Button;
	public g_01: eui.Group;

	public constructor() {
		super();
		this.skinName = "resource/scene/GameScene.exml";
		
	}
	protected onComplete() {
		
	

		this.btn_bb.touchEnabled = true;
		this.btn_bb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowView, this);
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



	private toShowView() {
		let bs:BackpackScene =new BackpackScene();
		SceneManager.Instance.pushScene(bs);
	}

	private toShowView1(event:egret.TouchEvent) {
		///获得当前按钮
        var btn:eui.Button = <eui.Button>event.target;
		this.removeChild(this.g_01);
	}
}