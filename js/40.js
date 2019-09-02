//获取/更改文本框的值
function getValues() {
    var oTxt1 = document.getElementById('txt1');
    var oTxt2 = document.getElementById('txt2');
    //value获得文本框的值
    console.log('the value of text = ',oTxt1.value, '\n the value of textarea = ', oTxt2.value);
    //value属性是一个字符串，具有字符串的特性
    console.log('the length of text is',oTxt1.value.length,'\n the length of textarea is ', oTxt2.value.length);
    //value属性设置文本框的内容
    setTimeout(function () {
        oTxt1.value = 'first textbox';
        oTxt2.value = 'second textbox';
    }, 500)
}

//选择文本
function selectText() {
    var oTxt1 = document.getElementById('txt1');
   //先获取焦点
    oTxt1.focus();
    //再选中文本框的内容
    oTxt1.select();
}
/**
 * 文本框事件
 * blur:失去焦点时触发
 * focus:获得焦点时触发
 * change:当用户更改文本框内容并失去焦点后触发（利用value属性进行更改文本框内容时不会触发）
 * select:当一个或者多个字符串被选中，无论是手工选中还是select（）方法的选中
 *
 *
 * change事件和blur事件的区别：
 * 只要文本框失去焦点，就会触发blur事件
 * 而change事件，只有当文本框内容发生改变，然后失去焦点后才触发
 * 如果文本不变，但文本框失去焦点那么只会触发blur事件
 * 如果文本发生改变，并失去焦点，那么先触发change事件，再触发blur事件*/
//自动选择文本

