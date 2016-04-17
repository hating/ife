//实在做不出来，代码参考贝儿多爸爸，学习一个
(function(){
    //
    var animationList=[];
    //
    var timer=null;
    var container=document.getElementsByClassName("view")[0];
    var preButton=document.getElementsByClassName("pre")[0];
    var inButton=document.getElementsByClassName("in")[0];
    var postButton=document.getElementsByClassName("post")[0];

    //常用操作集
    var Operation= {
      //注册按钮
       regEvent:function(node, event, func){
         //如果addEventListener可以使用，就使用addEventListener
                    if (node.addEventListener) {
                        node.addEventListener(event, func);
          //不然就使用attachEvent
                    } else if (node.attachEvent) {

                        node.attachEvent("on" + event, func);
                    } else {
          //再不成就使用on+event的属性绑定函数
                        node["on" + event] = func;
                    }
                },
          //给节点添加className
        addClass:function(node, className) {
                    node.className = className;
                },
          //给节点删除className
        removeClass:function(node) {
                    node.className = "";
                }
     };

//实现了前、中、后序遍历
    var TBT={
        preOrder:function(node){
            if(node!=null) {
                animationList.push(node);
                if (node.firstElementChild != null)
                    arguments.callee(node.firstElementChild);
                if (node.lastElementChild != null)
                    arguments.callee(node.lastElementChild);
            }
        },
        inOrder:function(node){
            if(node!=null) {
                if (node.firstElementChild != null)
                    arguments.callee(node.firstElementChild);
                animationList.push(node);
                if (node.lastElementChild != null)
                    arguments.callee(node.lastElementChild);
            }
        },
        postOrder:function(node){
            if(node!=null) {
                if (node.firstElementChild != null)
                    arguments.callee(node.firstElementChild);
                if (node.lastElementChild != null)
                    arguments.callee(node.lastElementChild);
                animationList.push(node);
            }
        },
        animate:function(){
            var i = 0;
            Operation.addClass(animationList[i],"active");
            /*
            对于动画的处理方法，可以参考这种做法，把要处理的Node全部Push或者shift到Array里
            然后再setInterval，在setInterval里面加一个计数器，当全部动画完成的时候，就clearInterval

            */
            timer = setInterval(function(){
                i++;
                if(i < animationList.length){
                    Operation.removeClass(animationList[i-1]);
                    Operation.addClass(animationList[i],"active");
                }else{
                    clearInterval(timer);
                    Operation.removeClass(animationList[i-1]);
                }
            },500)
        },
        //防止多个animation同时运行
        reset:function(){
            var divs=document.getElementsByTagName("div");
            [].forEach.call(divs,function(v){
               Operation.removeClass(v);
            });
        }
    };
//注册三个按钮
    Operation.regEvent(preButton,"click",function(){
        animationList=[];
        clearInterval(timer);
        TBT.reset();
        TBT.preOrder(container);
        TBT.animate();
    });
    Operation.regEvent(inButton,"click",function(){
        animationList=[];
        clearInterval(timer);
        TBT.reset();
        TBT.inOrder(container);
        TBT.animate();
    });
    Operation.regEvent(postButton,"click",function(){
        animationList=[];
        clearInterval(timer);
        TBT.reset();
        TBT.postOrder(container);
        TBT.animate();
    });


})()
