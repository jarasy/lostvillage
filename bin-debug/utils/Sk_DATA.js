//全局常用场景及交互数据
var Sk_DATA;
(function (Sk_DATA) {
    //本地测试
    Sk_DATA.IsDeBUG = false;
    //场景控制
    //基础域名
    Sk_DATA.BASEURL = "https://jarasy.25tk.cn/api";
    //export var BASEURL="http://127.0.0.1:9301";
    //检查注册用户URL
    Sk_DATA.CHECK_USER_URL = Sk_DATA.BASEURL + "/user/checkUser";
    //获取角色URL
    Sk_DATA.GET_USER_URL = Sk_DATA.BASEURL + "/user/getUser";
})(Sk_DATA || (Sk_DATA = {}));
