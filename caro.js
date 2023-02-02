const size=30;
const column=10;
const row=10;

function Game(){
    this.caro=[];
    this.cellGame=function(){
        var game= document.getElementById("game");
        for(var i=0;i<column;i++){
            var caro2=[];
            this.caro.push(caro2);
            for(var j=0;j<row;j++){
                caro2.push(0);
                var top=i*size;
                var left=j*size;
                var cell='<div id="cell-'+i+'-'+j+'" onclick="playCell('+i+','+j+')" style="position: absolute; left:'+left+'px; top:'+top+'px; border:1px solid blue;width:'+size+'px;height:'+size+'px; font-size:'+size+'px; color:red; text-align:center; "></div>'
                game.innerHTML+=cell;   
                var index = document.getElementById("cell-"+i+"-"+j);
                index.innerHTML="";
            }
        }
    }
    this.caroCell=function(x,y, color){   
        var index = document.getElementById("cell-"+x+"-"+y);
        if(this.caro[x][y]>=0){
            if(color===-1){
                index.innerHTML="X";
                this.caro[x][y]=-1;
            }
            if(color===1){
                index.innerHTML="O";
                this.caro[x][y]=-7;
            }
        }
        this.checkX(x,y);
    }
    this.checkX=function(x,y){
        for(let t=x-1;t<=x+1;t++){
            for(let l=y-1;l<=y+1;l++){
                if( t<column && t>=0 && y<row && y>=0){
                    if(this.caro[t][l]===0){
                        this.caro[t][l]=1;
                    }
                }          
            }
        }      
        let i=0;
        let j=0;
        while(x+i+1<row && this.caro[x][y]===this.caro[x+i+1][y]){
            if(this.caro[x-1][y]>=0){
                this.caro[x-1][y]=i+2;
            }
            if(this.caro[x+i+2][y]>=0){
                this.caro[x+i+2][y]=i+2;
            }
            i++;
            this.endX(i);
        }      
        while(x-j-1>=0 && this.caro[x][y]===this.caro[x-j-1][y]){
            if(this.caro[x+1][y]>=0){
                this.caro[x+1][y]=j+2;
            }
            if(this.caro[x-j-2][y]>=0){
                this.caro[x-j-2][y]=j+2;
            }
            j++;
            this.endX(j);
        }
        this.endX(i+j);
        let a=0;
        let b=0;
        while(y+a+1<column && this.caro[x][y]===this.caro[x][y+a+1]){
            if(this.caro[x][y-1]>=0){
                this.caro[x][y-1]=a+2;
            }
            if(this.caro[x][y+i+2]>=0){
                this.caro[x][y+i+2]=a+2;
            }
            a++;
            this.endX(a);
        }      
        while(y-b-1>=0 && this.caro[x][y]===this.caro[x][y-b-1]){
            if(this.caro[x][y+1]>=0){
                this.caro[x][y+1]=b+2;
            }
            if(this.caro[x][y-b-2]>=0){
                this.caro[x][y-b-2]=b+2;
            }
            b++;
            this.endX(b);
        }
        this.endX(a+b);
        let c=0;
        let d=0;
        while(x+c+1<row && y+c+1<column && this.caro[x][y]===this.caro[x+c+1][y+c+1]){
            if(this.caro[x-1][y-1]>=0){
                this.caro[x-1][y-1]=c+2;
            }
            if(this.caro[x+c+2][y+c+2]>=0){
                this.caro[x+c+2][y+c+2]=c+2;
            }
            c++;
            this.endX(c);
        }     
        while(x-d-1>=0 && y-d-1>=0 &&  this.caro[x][y]===this.caro[x-d-1][y-d-1]){
            if(this.caro[x+1][y+1]>=0){
                this.caro[x+1][y+1]=d+2;
            }
            if(this.caro[x-d-2][y-d-2]>=0){
                this.caro[x-d-2][y-d-2]=d+2;
            }
            d++;
            this.endX(d);
        }
        this.endX(c+d);
        let m=0;
        let n=0;
        while(x-m-1>=0 && y+m+1<column && this.caro[x][y]===this.caro[x-m-1][y+m+1]){
            if(this.caro[x+1][y-1]>=0){
                this.caro[x+1][y-1]=m+2;
            }
            if(this.caro[x-m-2][y+m+2]>=0){
                this.caro[x-m-2][y+m+2]=m+2;
            }
            m++;
            this.endX(m);
        }     
        while(x+m+1<row && y-n-1>=0 &&  this.caro[x][y]===this.caro[x+n+1][y-n-1]){
            if(this.caro[x-1][y+1]>=0){
                this.caro[x-1][y+1]=n+2;
            }
            if(this.caro[x+m+2][y-m-2]>=0){
                this.caro[x+m+2][y-m-2]=n+2;
            }
            n++;
            this.endX(n);
        }  
        this.endX(m+n);
    }
    this.endX=function(index){
        if(index>=4){
            alert("win");
            start();
        }
    }
    this.playComputer=function(x,y){      
        let caro1=[{x:0,y:0}];
        let caro2=[{x:0,y:0}];
        let caro3=[{x:0,y:0}];
        let caro4=[{x:0,y:0}];
        for(let i=0; i<row;i++){
            for(let j=0; j<column;j++){
                if(this.caro[i][j]===1){ 
                    caro1.push({x: i, y:j});  
                }    
                if(this.caro[i][j]===2){ 
                    caro2.push({x: i, y:j});  
                } 
                if(this.caro[i][j]===3){ 
                    caro3.push({x: i, y:j});  
                }
                if(this.caro[i][j]===4){ 
                    caro4.push({x: i, y:j});  
                }            
            }         
        } 
        if(caro4.length>1){
            let c4=Math.floor((Math.random()*(caro4.length-1)))+1;
            this.caroCell(caro4[c4].x, caro4[c4].y, 1);           
        }else{
            if(caro3.length>1){
                let c3=Math.floor((Math.random()*(caro3.length-1)+1));
                this.caroCell(caro3[c3].x, caro3[c3].y, 1);
                
            }else{
                if(caro2.length>1){
                    let c2=Math.floor((Math.random()*(caro2.length-1)))+1;
                    this.caroCell(caro2[c2].x, caro2[c2].y, 1);
                }else{
                    if(caro1.length>1){
                        let c1=Math.floor((Math.random()*(caro1.length-1)))+1;
                        this.caroCell(caro1[c1].x, caro1[c1].y, 1);
                    }
                }
            }  
        } 
        console.log(this.caro);
    }
}

var count=0;
function playCell(x, y){
    count++;
    game1.caroCell(x,y,-1);
    game1.playComputer(x,y);
}

var game1;
function start(){
    game1=new Game();
    game1.cellGame();
}
start();