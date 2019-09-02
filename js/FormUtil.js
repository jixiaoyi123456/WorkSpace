//
var FormUtil = new Object();
// 该方法在body的onload中调用
//聚焦于第一个字段
/*
* 1. 先判断有没有form
* 2. 再判断第一个表单字段是不是hidden
* */

FormUtil.focusOnFirst = function () {
    if(document.forms.length > 0){
        for(let i =0; i<document.forms[0].elements.length; i++){
            var oField = document.forms[0].elements[i];
            oField.focus();
            return;
        }
    }
}
/**
 * 作用：让文本框自动选择文本
 * 步骤：
 * 1. 获得text 和 textarea 的实例
 * 2. 迭代所有input标签来找到text| password字段
 * 3. 为onfocu选择事件添加select（）
 * 4. 迭代所有textarea
 * 5. 同3*/
FormUtil.setTextboxes = function () {
    var coloInputs = document.getElementsByTagName('input');
    var colTextAreas = document.getElementsByTagName('textarea');
    for (var i=0; i<coloInputs.length;i++){
        if(coloInputs[i].type == 'text'|| coloInputs.type == 'password'){
            coloInputs[i].onfocus = function () {
                this.select();
            }
        }
    }
    for (var i=0; i<colTextAreas.length;i++){
        colTextAreas[i].onfocus = function () {
            this.select();
        }
    }
}
/**
 * 作用：自动切换到下一个文本框
 * 步骤：
 * 1. 输入的参数：要检查的文本框
 * 2. 通过该文本框的form属性来获得对该表单的引用
 * 3. 检测该文本框是否为最后一个文本框
 * 4. 不是：检测输入的内容是否已经达到了该文本框最大的数量限制
 * 5. 没有达到，退出函数
 * 6. 达到了： 判断遇到的下一个文本框的属性是不是隐藏的
 * 7. 是：跳过这一个隐藏的。直到发现不是隐藏的，为其设置焦点
 * 8. 然后退出该方法
 * 该方法：在onkeyup事件处理函数时调用*/
FormUtil.tabForward = function (oTextbox) {
    var oForm = oTextbox.form;
    if (oForm.elements[oForm.length-1] != oTextbox && oTextbox.value.length == oTextbox.getAttribute('maxlength')){
        for(let i=0;i<oForm.elements.length;i++){
            if(oForm.elements[i] == oTextbox){
             for (var j=i+1; j<oForm.elements.length;j++){
                 if (oForm.elements[j].type != 'hidden'){
                     oForm.elements[j].focus();
                     return;
                 }
             }
             return;
            }
        }
    }
}
