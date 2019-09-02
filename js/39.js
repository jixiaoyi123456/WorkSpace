//获取表单的引用
var oForm = document.getElementById('form1');
//或者
var oForm_or = document.forms[0];

//访问表单字段
//var oFirstField = oForm.txtComment;
var oFirstField = oForm.elements['txtName'];
var oFirstField_or  = oForm.elements[0];
//表单字段的共性
// var oSecondFiled = oForm.txtPassword;
// oSecondFiled.disabled = true;
// oFirstField.focus();
// alert(oFirstField.form == oForm);

//聚焦于第一个字段
/*
* 1. 先判断有没有form
* 2. 再判断第一个表单字段是不是hidden
* */
//提交表单
/**
 * 1. input中submit按钮提交
 * 2. form表单中的submit函数提交
 */
/**
 * 在表单提交前，按下提交按钮后，会触发submit事件，并执行
 * onsubmit()处理函数。使用onsubmit(）事件处理函数，可以停止表单的提交
 */
//仅提交一次
// function submitOnce() {
//     this.disabled = true;
//     this.form.submit();
// }
//重置表单
/**
 * 1.input中reset按钮重置
 * 2.form表单中的reset函数重置*/