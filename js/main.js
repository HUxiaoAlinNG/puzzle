var whitePhoto=8; // 空白图的位置
var randomPosition=[];
var step=0;

//定义allotBlock函数：
//1.进行整图随机打乱分配；
//2.定义空白图为移动交换因子
//2.为arr[i]定义初始化data-index参数并设置对应图形位置
function allotBlock(){
    step=0;
    $(".step").html(step);
    var arr=[1,2,3,4,5,6,7,8,0];
	for(var j,k,i=arr.length;i;j=parseInt(Math.random()*i),k=arr[--i],arr[i]=arr[j],arr[j]=k);  //对整图进行随机分配（打乱）
    randomPosition=arr;
    for (var i in arr){
        if(arr[i]==0){   //定义空白图为交换必须因子  
            whitePhoto=parseInt(i);
        }  
        $("#main>div").eq(arr[i]).attr('data-index',i).css({  //定义初始化data-index参数并设置对应图形位置
            left : 100 * (i%3),
            top : 100 * (Math.floor(i/3))
        })
    }
}

//定义changePhoto函数：
//1.更换图片；
//2.执行randomBlock函数；
function changePhoto(){
    var randomPhoto=Math.round(Math.random()*5+1);
    $('.answer,.block').css('background-image','url(img/photo'+ randomPhoto +'.jpg)'); //更换图片，0-6号图片
    allotBlock();
}

//定义movePosition函数：
//1.定义图形成功数组；
//2.进行data-index参数移入并判断
function movePosition(p1,p2){
    var addArr = [];
    var successArr = ['8','0','1','2','3','4','5','6','7'];  //定义最终成功图形时数组（即为data-index数组）

    whitePhoto = p2;
    step ++;
    $(".step").html(step);
    $("#main>div").each(function(){
        addArr.push($(this).attr('data-index'));
    });

    if(addArr.toString() == successArr.toString()){
        $("#success").show();
    }
}

//定义“按W（上）按钮后”函数：
//空白图与目标图形自定义参数data-index进行数字交换，并进行图形位置交换；
function up(){
    if (whitePhoto<6) { //若空白图在前两行，可执行up函数
        var targetPhoto=parseInt(whitePhoto)+3;
        $("#main>div[data-index='"+ targetPhoto +"']").animate({
            top : '-=100px'   //目标图形向上移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto-3)
        });

        $("#main>div[data-index='"+whitePhoto+"']").animate({
            top : '+=100px'   //空白图向下移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto);
            movePosition(whitePhoto,targetPhoto);  //执行updatePosition函数
        });

    }
}

//定义“按S(下)按钮后”函数：
//空白图与目标图形自定义参数data-index进行数字交换，并进行图形位置交换；
function down(){
    if (whitePhoto>2){ //若空格在后两行，可执行down函数
        var targetPhoto=parseInt(whitePhoto)-3;
        $("#main>div[data-index='"+targetPhoto+"']").animate({
            top : '+=100px'   //目标图形向下移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto+3)
        });

        $("#main>div[data-index='"+whitePhoto+"']").animate({
            top : '-=100px'   //空白图图形向上移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto);
            movePosition(whitePhoto,targetPhoto);  //执行updatePosition函数

        });
    }
}

//定义“按A(左)按钮后”函数：
//空白图与目标图形自定义参数data-index进行数字交换，并进行图形位置交换；
function left(){
    if(whitePhoto%3<2){  //若空格在前两列，可执行left函数
        var targetPhoto=parseInt(whitePhoto)+1 ;
        $("#main>div[data-index='"+targetPhoto+"']").animate({
            left : '-=100px'  //目标图形向左移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto-1)
        });

        $("#main>div[data-index='"+whitePhoto+"']").animate({
            left : '+=100px'  //空白图图形向右移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto);
            movePosition(whitePhoto,targetPhoto);  //执行updatePosition函数
        });

    }
}

//定义“按D(右)按钮后”函数：
//空白图与目标图形自定义参数data-index进行数字交换，并进行图形位置交换；
function right(){
    if(whitePhoto%3>0){  //若空格在后两列，可执行right函数
        var targetPhoto=parseInt(whitePhoto)-1 ;
        $("#main>div[data-index='"+targetPhoto+"']").animate({
            left : '+=100px'  //目标图形向右移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto+1)
        });

        $("#main>div[data-index='"+whitePhoto+"']").animate({
            left : '-=100px'  //空白图图形向左移动100px
        },100,function(){
            $(this).attr('data-index',targetPhoto);
            movePosition(whitePhoto,targetPhoto);  //执行updatePosition函数
        });
    }
}

//进行keyCode锁定
$(function(){
    changePhoto();
}).on('keypress',function(e){
    if(!$("#main>div").is(":animated")) {
        switch (e.keyCode) {
            case 119: //上
                up();
                break;
            case 115: //下
                down();
                break;
            case 97: //左
                left()
                break;
            case 100: //右
                right();
                break;
            default:
                return;
        }
    }
}).on('click','.reset',function(){  //“reset”按钮后执行randomBlock函数
    allotBlock();
    $("#success").hide();
}).on('click','#showNum',function(){
    $("#main>div>span").toggle();   //“showNum”按钮后显示或隐藏数字
}).on('click','#showAnswer',function(){
    $(".answer").toggle();  //“showAnswer”按钮后显示或隐藏全图答案
}).on('click','#change',function(){  
    changePhoto();  //“change”按钮后更换图片
});

