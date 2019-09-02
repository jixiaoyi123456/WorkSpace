
// JavaScript Document
var EventUtil={
    //添加事件
    addHandler:function(element,type,handler){
        if(element.addEventListener){//DOM2级
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){//IE
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;//DOM0级
        }
    },//此处的","千万别忘记，EventUtil是对象。
    //删除事件
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){//DOM2级
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){//IE
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;//DOM0级
        }
    },
    //返回event对象的引用
    getEvent:function(event){
        return event?event:window.event;
    },
    //返回事件的目标
    getTarget:function(event){
        return event.target ||  event.srcElement;
    },
    //取消事件的默认行为
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    //阻止事件流
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },
    //取得字符编码
    getCharCode:function(event){
        if(typeof event.charCode=="number"){
            return event.charCode;
        }else{
            return event.keyCode;//IE8及之前的版本和Opera
        }
    },
    //获取剪切板中的值
    getClipboardText:function(event){
        var clipboardData=(event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    //设置剪切板中的值
    setClipboardText:function(event,value){
        if(event.clipboardData){
            return event.clipboardData.setData("text/plain",value);
        }else if(window.clipboardData){
            window.clipboardData.setData("text",value);
        }
    },
    /*
    格式化事件，因为IE和其他浏览器下获取事件的方式不同并且事件的属性也不尽相同，通过此方法提供一个一致的事件
    */
   formatEvent:function (oEvent) {
        //isIE和isWin引用到一个js文件，判断浏览器和操作系统类型
        if (isIE && isWin) {
            oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
            //IE只支持冒泡，不支持捕获
            oEvent.eventPhase = 2;
            oEvent.isChar = (oEvent.charCode > 0);
            oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
            oEvent.pageY = oEvent.clientY + document.body.scrollTop;
            //阻止事件的默认行为
            oEvent.preventDefault = function () {
                this.returnValue = false;
            };

            //将toElement,fromElement转化为标准的relatedTarget
            if (oEvent.type == "mouseout") {
                oEvent.relatedTarget = oEvent.toElement;
            } else if (oEvent.type == "mouseover") {
                oEvent.relatedTarget = oEvent.fromElement;
            }
            //取消冒泡
            oEvent.stopPropagation = function () {
                this.cancelBubble = true;
            };

            oEvent.target = oEvent.srcElement;
            //添加事件发生时间属性，IE没有
            oEvent.time = (new Date).getTime();
        }
        return oEvent;
    }
}

