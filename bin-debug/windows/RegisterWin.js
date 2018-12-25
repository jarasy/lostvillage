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
var RegisterWin = (function (_super) {
    __extends(RegisterWin, _super);
    function RegisterWin() {
        var _this = _super.call(this) || this;
        _this.gender = 1;
        _this.profession = 1;
        _this.skinName = "resource/windows/RegisterWin.exml";
        return _this;
    }
    RegisterWin.prototype.onComplete = function () {
        this.btn_ok.touchEnabled = true;
        this.btn_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToAddRole, this);
        this.genderGroup = new eui.RadioButtonGroup();
        this.rb_nan.group = this.genderGroup;
        this.rb_nv.group = this.genderGroup;
        this.rb_nan.selected = true; //默认选项
        this.professionGroup = new eui.RadioButtonGroup();
        this.rb_dao.group = this.professionGroup;
        this.rb_jian.group = this.professionGroup;
        this.rb_qiang.group = this.professionGroup;
        this.rb_dao.selected = true; //默认选项
        this.genderGroup.addEventListener(eui.UIEvent.CHANGE, this.genderGroupChangeHandler, this);
        this.professionGroup.addEventListener(eui.UIEvent.CHANGE, this.professionGroupChangeHandler, this);
    };
    RegisterWin.prototype.genderGroupChangeHandler = function (evt) {
        var radioGroup = evt.target;
        this.gender = radioGroup.selectedValue;
    };
    RegisterWin.prototype.professionGroupChangeHandler = function (evt) {
        var radioGroup = evt.target;
        this.profession = radioGroup.selectedValue;
    };
    RegisterWin.prototype.onToAddRole = function () {
        SceneManager.Instance.popScene();
        //console.log(this.gender+"=="+this.profession);
        var lw = new LoadingWin();
        SceneManager.Instance.pushScene(lw);
        var data = JSON.parse("{\"openId\":\"" + egret.localStorage.getItem("openId") + "\"," + "\"name\":\"" + this.ipt_name.text + "\"," + "\"gender\":\"" + this.gender + "\"," + "\"profession\":\"" + this.profession + "\"}");
        Sk_PostJSON.SendTo(data, this.onToGameScene, "", Sk_DATA.ADD_ROLE_URL, this);
    };
    RegisterWin.prototype.onToGameScene = function (result, self) {
        if (0 == result.code) {
            egret.localStorage.setItem("property", result.data);
            var s1 = new GameScene();
            //切换到首页
            SceneManager.Instance.changeScene(s1);
        }
    };
    return RegisterWin;
}(Scene));
__reflect(RegisterWin.prototype, "RegisterWin");
