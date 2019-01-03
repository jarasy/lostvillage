class TipControllerModule extends eui.Component {
	private exml_tipGroup: eui.Group;
	private exml_tipText: eui.Label;
	private exml_closeBtn: eui.Button;

	public constructor(tipText?: string, textColor: number = 0xffffff) {
		super();
		this.skinName = "TipControllerModuleSkin";
		if (tipText) {
			this.exml_tipText.text = tipText;
		}
		this.exml_tipText.textColor = textColor;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
	}

	private onRemoveFromStageHandler(e: egret.Event) {
		this.exml_closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseBtnHandler, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
	}

	private onAddToStageHandler(e: egret.Event) {
		this.exml_closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseBtnHandler, this);
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
	}

	createChildren() {
		super.createChildren();
		this.exml_tipGroup.x = egret.MainContext.instance.stage.stageWidth / 2;
		this.exml_tipGroup.y = egret.MainContext.instance.stage.stageHeight / 2;
		this.exml_tipGroup.scaleX = this.exml_tipGroup.scaleY = 0;
		egret.Tween.get(this.exml_tipGroup).to({ scaleX: 1, scaleY: 1 }, 300).call(() => {
			egret.Tween.removeTweens(this.exml_tipGroup);
		}, this);
	}

	private touchCloseBtnHandler() {
		this.parent.removeChild(this);
	}
}