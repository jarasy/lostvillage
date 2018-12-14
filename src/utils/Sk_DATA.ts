
//全局常用场景及交互数据
module Sk_DATA {
    //本地测试
    export var IsDeBUG = false;
    //服务器的链接配置数据
    export var ServerData: any;
    //服务器列表的数据
    export var GameServerList: any;
    //我的服务器信息
    export var RoleList: any;
    //当前选择的服务器
    export var UseTheServer: any;


    //默认SOCKET
    export var G_SOCKET: any;
    export var G_SOCKET_CONN: boolean;
    //其他

    export var nowWorldMapid:number;

    //场景控制

    //基础域名
    export var BASEURL="https://jarasy.25tk.cn/api";
    //export var BASEURL="http://127.0.0.1:9301";
    //检查注册用户URL
    export var CHECK_USER_URL =BASEURL+"/user/checkUser";
    //获取角色URL
    export var GET_USER_URL =BASEURL+"/user/getRole";
    //新增角色URL
    export var GET_USER_URL =BASEURL+"/user/addRole";

    //获取角色属性URL
    export var GET_USER_URL =BASEURL+"/user/getRoleProperty";



    //微信
    export var WeChatSKD: any;



}