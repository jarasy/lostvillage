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
    Sk_DATA.GET_ROLE_URL = Sk_DATA.BASEURL + "/user/getRole";
    //新增角色URL
    Sk_DATA.ADD_ROLE_URL = Sk_DATA.BASEURL + "/user/addRole";
    //获取角色属性URL
    Sk_DATA.GET_ROLEPROPERTY_URL = Sk_DATA.BASEURL + "/user/getRoleProperty";
    //类型获取背包物品URL
    Sk_DATA.GET_GOODSBYTYPE_URL = Sk_DATA.BASEURL + "/backpake/selectGoodsByType";
    //ID获取物品URL
    Sk_DATA.GET_GOODSBYID_URL = Sk_DATA.BASEURL + "/backpake/selectGoodsById";
    //type获取装备物品URL roleId type
    Sk_DATA.GET_ZBGOODS_URL = Sk_DATA.BASEURL + "/backpake/selectZbByType";
    //装备物品URL id type wz roleId
    Sk_DATA.TO_ZB_URL = Sk_DATA.BASEURL + "/backpake/zbGoods";
    //取下物品URL id
    Sk_DATA.TO_QX_URL = Sk_DATA.BASEURL + "/backpake/outZbGoods";
    //丢弃全部物品URL id
    Sk_DATA.TO_DQALL_URL = Sk_DATA.BASEURL + "/backpake/dqGoodsForAll";
    //丢弃物品(数量)URL id count
    Sk_DATA.TO_DQCOUNT_URL = Sk_DATA.BASEURL + "/backpake/dqGoodsForCount";
    //获取玩家 URL openId
    Sk_DATA.GET_PLAYS_URL = Sk_DATA.BASEURL + "/fighting/getPlayers";
    //获取奖励 URL id
    Sk_DATA.GET_AWARDS_URL = Sk_DATA.BASEURL + "/fighting/getAwards";
    //ID获取物品URL
    Sk_DATA.GET_MONSTERS_URL = Sk_DATA.BASEURL + "/fighting/getMonsters";
})(Sk_DATA || (Sk_DATA = {}));
