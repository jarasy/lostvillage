var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//发送数据到服务器
var Sk_PostJSON = (function () {
    function Sk_PostJSON() {
    }
    //使用方法： 连接 数据 返回方法 返回的场景
    Sk_PostJSON.SendTo = function (_BYTES, _FunBack, _Target, _url, self) {
        //将JSON编码
        var BYTES = JSON.stringify(_BYTES);
        BYTES = BYTES;
        console.log(BYTES);
        var FunBack = _FunBack;
        var Target = _Target;
        var _req = new egret.HttpRequest();
        _req.addEventListener(egret.Event.COMPLETE, onPostComplete, this);
        _req.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostIOError, this);
        _req.addEventListener(egret.ProgressEvent.PROGRESS, onPostProgress, this);
        var TimerConut = 0;
        CanSend();
        function _Reconnection() {
            TimerConut++;
            //设置最多重连5次 可以修改
            if (TimerConut < 5) {
                CanSend();
            }
            else {
                //   Sk_DATA.GameTips.ShowTips("错误", "多次连接失败,请检查网络!")
            }
        }
        function onPostComplete(event) {
            var request = event.currentTarget;
            var Datas = JSON.parse(request.response);
            //    console.log(Datas)
            if (Datas) {
                return FunBack(Datas, self);
            }
            ;
        }
        function onPostIOError(event) {
            //      Sk_DATA.GameTips.ShowTips("错误", event)
            //再次重新请求重连
            _Reconnection();
        }
        function onPostProgress(event) {
            //console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }
        function Reload() {
            TimerConut = 0;
            _Reconnection();
        }
        function CanSend() {
            _req.responseType = egret.HttpResponseType.TEXT;
            _req.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            _req.open(_url + "?random=" + egret.getTimer() * 999999, egret.HttpMethod.POST);
            _req.send(BYTES);
        }
    };
    return Sk_PostJSON;
}());
__reflect(Sk_PostJSON.prototype, "Sk_PostJSON");
