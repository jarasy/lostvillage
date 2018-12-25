module lv
{
  /**
   * 地图
   */
  export class Map extends egret.DisplayObjectContainer
  {
    private p:MapView;
    private map : any[] = [];
    private mapsize: number = 8; //必须奇数
    private playTurn : boolean = true;
    private block : number = 0.01;
    public tap : number = 0;

    public px:number=UTILS.GetRandomIntInclusive(0,this.mapsize-1);
    public py:number=UTILS.GetRandomIntInclusive(0,this.mapsize-1);

  	public constructor(parent:MapView) {
          super();
          this.p=parent;
          this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    protected onComplete() {
      this.init();
    }
    
    private onAddToStage(event:egret.Event){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    /**初始化*/
    public init(){
      while(this.numChildren){
        this.removeChildAt(0);
      }
      this.map = [];
      this.createMap();
      this.tap = 0;
    }

  private toFighting(){
    let p=<MapView>this.parent;
    p.getMonsters();
	}

    /**创建地图**/
   	private createMap(){
      var node : lv.Node;

      //var txt:egret.TextField;
   		for(var i :number = 0 ; i < this.mapsize ; i++){
        this.map[i] = [];
        for(var j :number = 0 ; j < this.mapsize; j++){
   			  node = new lv.Node(i , j);
   			  node.x = i * 64;
   			  node.y = j * 64;
          this.map[i][j] = node;
          node.touchEnabled = true;//开启触碰
          node.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNodeClick,this);
   			  this.addChild(node);
          console.log(this.px+"-"+this.py);
          if(i == this.px && j == this.py){
            node.doFillPot();
          }
        }
   		}
   	}

    public lock():void{
      this.playTurn = false;
    }

    public unlock():void{
      this.playTurn = true;
    }

    public getNode(arr:number[]){
      return this.map[arr[0]][arr[1]];
    }

    /**node被点击**/
    private onNodeClick(evt:egret.TouchEvent):void{
      var node:lv.Node = evt.target;
      var n:lv.Node;
      var pos=node.getPos();
      console.log(Math.abs(pos[0]-this.px)+"---"+Math.abs(pos[1]-this.py));
      if(pos[0]-this.px==0&&pos[1]-this.py==0){
        this.toFighting();
      }else if(pos[0]-this.px>0&&pos[1]-this.py==0){
        this.goRight();
      }else if(pos[0]-this.px<0&&pos[1]-this.py==0){
        this.goLeft();
      }else if(pos[0]-this.px==0&&pos[1]-this.py>0){
        this.goUp();
      }else if(pos[0]-this.px==0&&pos[1]-this.py<0){
        this.goDown();
      }else if(Math.abs(pos[0]-this.px)>Math.abs(pos[1]-this.py)){
        if(pos[0]>this.px){
          this.goRight();
        }else{
          this.goLeft();
        }
      }else if(Math.abs(pos[0]-this.px)<Math.abs(pos[1]-this.py)){
        if(pos[1]>this.py){
          this.goUp();
        }else{
          this.goDown();
        }
      }else if(Math.abs(pos[0]-this.px)==Math.abs(pos[1]-this.py)){
        if(Math.random()>0.5){
          console.log(pos[0]+"-"+this.px);
            if(pos[0]>this.px){
              this.goRight();
            }else{
              this.goLeft();
            }
          }else{
            console.log(pos[1]+"-"+this.py);
            if(pos[1]>this.py){
              this.goUp();
            }else{
              this.goDown();
            }
          }
      }
      //node.touchEnabled = false;
      //node.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onNodeClick,this);
      //this.showRound(node);
      //this.dispatchEventWith("nodeClick");
    }
    private goLeft():void{
        let n:lv.Node;
        n=this.map[this.px-1][this.py];
        console.log(n);
        n.doIn();
        n=this.map[this.px][this.py];
        this.px-=1;
        n.doGoed();
    }
    private goRight():void{
        let n:lv.Node;
        n=this.map[this.px+1][this.py];
        console.log(n);
        n.doIn();
        n=this.map[this.px][this.py];
        this.px+=1;
        n.doGoed();
    }
    private goUp():void{
        let n:lv.Node;
        n=this.map[this.px][this.py+1];
        console.log(n);
        n.doIn();
        n=this.map[this.px][this.py];
        this.py+=1;
        n.doGoed();
    }
    private goDown():void{
        let n:lv.Node;
        n=this.map[this.px][this.py-1];
        console.log(n);
        n.doIn();
        n=this.map[this.px][this.py];
        this.py-=1;
        n.doGoed();
    }

    public getRandomIntInclusive(min:number, max:number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
  }
}