var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/scene/LoginScene.exml";
        return _this;
    }
    LoginScene.prototype.onComplete = function () {
        //this.btn_tc.touchEnabled = true;
        //this.btn_login.touchEnabled = true;
        //this.btn_tc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaptc, this);
        platform.login();
        this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
    };
    LoginScene.prototype.onLogin = function () {
        var data = JSON.parse("{\"openid\":\"" + egret.localStorage.getItem("openid") + "\"}");
        //Sk_PostJSON.SendTo(data,this.onLoadTx,"",Sk_DATA.GET_USER_URL,this);
        Sk_PostJSON.SendTo(data, this.onGetUser, "", Sk_DATA.GET_USER_URL, this);
    };
    LoginScene.prototype.onGetUser = function (result, self) {
        ///if(null==result.data){
        self.toRegister();
        //}
    };
    //弹出场景
    LoginScene.prototype.toRegister = function () {
        var tc = new RegisterWin();
        SceneManager.Instance.pushScene(tc);
    };
    return LoginScene;
}(Scene));
__reflect(LoginScene.prototype, "LoginScene");
