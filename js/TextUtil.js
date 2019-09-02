var TextUtil = new Object();
/**
 *  作用：限制textarea的字符数
 *  在Keypress事件中调用，如果达到最大字符数，则阻止字符的插入*/
TextUtil.isNotMax = function (oTextArea) {
    return oTextArea.value.length != oTextArea.getAttribute('maxlength');
}


/**
 * 作用：阻止无效字符
 * 步骤：
 * 1. 兼容IE和DOM获得event事件：EventUtil.formatEvent
 * 2. 获得定义的无效字符串
 * 3. 获得当前插入的字符串
 * 4. 判断字符是否是无效的字符串
 * 5. 返回逻辑值*/
TextUtil.blockChars = function (oTextbox, oEvent) {
    var oEvent = EventUtil.formatEvent(oEvent);
    var sInvalidChars = oTextbox.getAttribute('invalidchars');
    var sChar = String.fromCharCode(oEvent.charCode);
    var bIsValidChars = sInvalidChars.indexOf(sChar) == -1;
    return bIsValidChars||oEvent.ctrlKey;

}
/**
 * 作用：允许有效字符*/
TextUtil.allowChars = function (oTextbox, oEvent) {
    var oEvent = EventUtil.formatEvent(oEvent);
    var sValidChars = oTextbox.getAttribute('validchars');
    var sChar = String.fromCharCode(oEvent.charCode);
    var bIsValidChars = sValidChars.indexOf(sChar) > -1;
    return bIsValidChars||oEvent.ctrlKey;

}
/**
 * 作用：不要忘记粘贴
 * 1. 禁止粘贴
 * 2. 失去焦点验证：即在用户未输入正确的值之前，不让用户移动到另外的字段中
 * 加载阻止和允许有效字符的函数里面
 * */
/**
 * 作用：禁止粘贴+阻止无效字符*/
TextUtil.blockChars = function (oTextbox, oEvent, bBlockPaste) {
    var oEvent = EventUtil.formatEvent(oEvent);
    var sInvalidChars = oTextbox.getAttribute('invalidchars');
    var sChar = String.fromCharCode(oEvent.charCode);
    var bIsValidChars = sInvalidChars.indexOf(sChar) == -1;
    if (bBlockPaste){
        return  bBlockPaste && !(oEvent.ctrlKey && sChar == 'v')
    } else {
        return bIsValidChars||oEvent.ctrlKey;
    }

}
/**
 * 作用：禁止粘贴+允许有效字符*/
TextUtil.allowChars = function (oTextbox, oEvent, bBlockPaste) {
    var oEvent = EventUtil.formatEvent(oEvent);
    var sValidChars = oTextbox.getAttribute('validchars');
    var sChar = String.fromCharCode(oEvent.charCode);
    var bIsValidChars = sValidChars.indexOf(sChar) > -1;
    if (bBlockPaste){
        return  bBlockPaste && !(oEvent.ctrlKey && sChar == 'v')
    } else {
        return bIsValidChars||oEvent.ctrlKey;
    }
}
/**
 * 失去焦点验证+阻止无效字符
 * 步骤：
 * 1. 获取无效字符
 * 2. 获取每一个无效字符
 * 3. 遍历，检测每一个无效字符是否出现在文本框中
 * 4. 是：警告；焦点切回文本框；选中；因为只要有一个无效字符就不进行检测了*/
TextUtil.blockChars = function (oTextbox) {
    var sInvalidChars = oTextbox.getAttribute('invalidchars');
    var arrInvalidChars = sInvalidChars.split('');
    for (let i=0; i<arrInvalidChars.length;i++){
        if(oTextbox.value.indexOf(arrInvalidChars[i])>-1){
            alert("'Character' + arrInvalidChars[i] + 'not allowed'");
            oTextbox.focus();
            oTextbox.select();
            return;
        }
    }
}
/**
 * 失去焦点验证+组织无效字符*/
TextUtil.blockChars = function (oTextbox) {
    var sValidChars = oTextbox.getAttribute('validchars');
    var arrValidChars = sValidChars.split('');
    for (let i=0; i<arrValidChars.length;i++){
        if(oTextbox.value.indexOf(arrValidChars[i])==-1){
            alert('Character'+ arrValidChars[i] + 'not allowed');
            oTextbox.focus();
            oTextbox.select();
            return;
        }
    }
}
/**
 * 作用：使用上下键操作数字文本
 */
TextUtil.numericScrool = function (oTextbox, oEvent) {
    var oEvent = EventUtil.formatEvent(oEvent);
    var iValue = oTextbox.value.length == 0? 0 :parseInt(oTextbox.value);
    var iMax = oTextbox.getAttribute('max');
    var iMin = oTextbox.getAttribute('min');
    if (oEvent.keyCode == 38){
        if(iMax == null || iValue<parseInt(iMax)){
            oTextbox.value = (iValue+1);
        }
    } else if(oEvent.keyCode == 40){
        if (iMin==null ||iValue > parseInt(iMin)){
            oTextbox.value = (iValue-1);
        }
    }
}
/**
 * 作用：搜索字符串数组并返回以特定字符开头的所有值
 * 步骤：
 * 1. 创建用于存储所有匹配的值的数组
 * 2. 确保插入进行匹配的字符串非空
 * 3. 遍历，添加到数组中去*/
TextUtil.autosuggestMatch = function (sText, arrValues) {
    var arrResult = new Object();
    if (sText != ''){
        for (let i =0; i< arrValues.length; i++){
            if(arrValues[i].indexOf(sText) == 0){
                arrResult.push(arrValues[i]);
            }
        }
    }
    return arrResult;
}

/**
 * 作用：列表框中的匹配与显示
 * 步骤：
 * 1. 获取所要显示候选列表框的ID
 * 2. 清空列表框
 * 3. 获得匹配文本框中的字符串的值
 * 4. 添加到列表框中*/
TextUtil.autosugget = function (oTextbox, arrValues, sListboxId) {
    var oListbox = document.getElementById(sListboxId);
    ListUtil.clear(oListbox);
    var arrMatches = TextUtil.autosuggestMatch(oTextbox, arrValues);
    for(let i=0;i<arrMatches.length;i++){
        ListUtil.add(oListbox, arrMatches[i]);
    }
}

