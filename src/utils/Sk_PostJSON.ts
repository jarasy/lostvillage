
//发送数据到服务器
class Sk_PostJSON {


    //使用方法： 连接 数据 返回方法 返回的场景
    public static SendTo(_BYTES, _FunBack: Function, _Target,_url,self) {
        //将JSON编码
        let BYTES = JSON.stringify(_BYTES);
        BYTES =BYTES
       console.log(BYTES)
        let FunBack = _FunBack;
        let Target = _Target;
        let _req = new egret.HttpRequest();
        _req.addEventListener(egret.Event.COMPLETE, onPostComplete, this);
        _req.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostIOError, this);
        _req.addEventListener(egret.ProgressEvent.PROGRESS, onPostProgress, this);
        let TimerConut = 0;
        CanSend();


        function _Reconnection() {
            TimerConut++;
            //设置最多重连5次 可以修改
            if (TimerConut < 5) {
                CanSend();
            } else {
             //   Sk_DATA.GameTips.ShowTips("错误", "多次连接失败,请检查网络!")

            }
        }

        function onPostComplete(event: egret.Event) {
            var request = <egret.HttpRequest>event.currentTarget;

            var Datas = JSON.parse(request.response);

       //    console.log(Datas)
            if (Datas) {
                return FunBack(Datas,self)
            };
        }

        function onPostIOError(event: egret.IOErrorEvent): void {
      //      Sk_DATA.GameTips.ShowTips("错误", event)
            //再次重新请求重连
            _Reconnection()
        }
        function onPostProgress(event: egret.ProgressEvent): void {
            //console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }

        function Reload() {
            TimerConut = 0;
            _Reconnection()
        }

        function CanSend() {
            _req.responseType = egret.HttpResponseType.TEXT;
            _req.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            _req.open( _url+ "?random=" + egret.getTimer() * 999999, egret.HttpMethod.POST);
            _req.send(BYTES);
        }
    }




}

