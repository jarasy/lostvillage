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
        var data = JSON.parse("{\"openId\":\"" + egret.localStorage.getItem("openId") + "\"}");
        //Sk_PostJSON.SendTo(data,this.onLoadTx,"",Sk_DATA.GET_USER_URL,this);
        var lw = new LoadingWin();
        SceneManager.Instance.pushScene(lw);
        Sk_PostJSON.SendTo(data, this.onGetRole, "", Sk_DATA.GET_ROLE_URL, this);
    };
    LoginScene.prototype.onGetRole = function (result, self) {
        if (0 == result.data) {
            self.toRegister();
        }
        else {
            var data = JSON.parse("{\"openId\":\"" + egret.localStorage.getItem("openId") + "\"}");
            Sk_PostJSON.SendTo(data, self.toLoadProperty, "", Sk_DATA.GET_ROLEPROPERTY_URL, this);
        }
    };
    LoginScene.prototype.toLoadProperty = function (result, self) {
        egret.localStorage.setItem("property", result.data);
        SceneManager.Instance.popScene();
        var s1 = new GameScene();
        //切换到首页
        SceneManager.Instance.changeScene(s1);
    };
    //弹出场景
    LoginScene.prototype.toRegister = function () {
        var tc = new RegisterWin();
        SceneManager.Instance.pushScene(tc);
    };
    return LoginScene;
}(Scene));
__reflect(LoginScene.prototype, "LoginScene");
