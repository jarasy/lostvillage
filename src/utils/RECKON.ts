//发送数据到服务器
class RECKON {

    /**
     * 计算闪避
     */
    public static GetMZ(lv1:number, lv2:number,sd1:number,sd2:number,rank1:number,rank2:number):number {
      return (1/(1+(sd2-sd1)/120))*(1/(1+(lv2-lv1)/120))-0.05;
    }

     /**
     * 计算会心
     */
    public static GetHX(lv1:number, lv2:number,hx:number):number {
      return (1/(1-(lv1-lv2)/80))*(0.004*hx)+0.1;
    }

    /**
     * 计算攻击
     */
    public static GetGJ(lv1:number, lv2:number,fy:number):number {
      return (1/(1-(lv1-lv2)/150))*(1/(1+((fy)/160)));
    }
    
}