//发送数据到服务器
class UTILS {

    /**
     * 获取随机数[min,max]
     */
    public static GetRandomIntInclusive(min:number, max:number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
}