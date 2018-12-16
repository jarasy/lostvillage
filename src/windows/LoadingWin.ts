class LoadingWin extends Scene{
	public img_loading:eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/windows/LoadingWin.exml";
	}
	protected onComplete() {
		// 监听帧事件,每帧都让loading图片转动
        this.addEventListener(egret.Event.ENTER_FRAME, this.updata, this);
	}

	private updata() {
        // 旋转
        this.img_loading.rotation += 5;
    }

}