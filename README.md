		declare function escape(s:string): string;
		
		var code="1397560874f841f0af420175d699e33f";
		var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
		for(var i=1;i<code.length;i++){  
			c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
		}  
        console.log(escape(c));
		
		
	
Game.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
if (e.target instanceof eui.Button) {
		audio.QQAudio.ins.click.play(0, 1);//播放音乐
}
}, Game.stage);
