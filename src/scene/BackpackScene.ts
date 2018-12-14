

class BackpackScene extends Scene {
	public btn_back:eui.Button;
	public list: eui.List;

	public constructor() {
		super();
		this.skinName = "resource/scene/BackpackScene.exml";
		this.bindData([{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"},{label:"爱施德",num:"x2"}]);

	}

	protected onComplete() {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBack, this);
	}

	private toBack() {	
		SceneManager.Instance.popScene();
	}

	/** 进行数据绑定 */
	public bindData(data: Array<any>): void {
		let arrCollection: eui.ArrayCollection = new eui.ArrayCollection(data);
		this.list.dataProvider = arrCollection;
		
	}

	
}