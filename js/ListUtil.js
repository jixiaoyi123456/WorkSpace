var ListUtil = new Object();
/**
 * 作用：获取所有选中选项索引的方式
 * 步骤：
 * 1. 遍历
 * 2. 判断是否被选中*/
ListUtil.getSelectedIndex = function (oListbox) {
    var arrIndexs = new Array();
    for (let i =0; i< oListbox.options.length; i++){
        if(oListbox.options[i].selected){
            arrIndexs.push(i);
        }
    }
    return arrIndexs;
}
/**
 * 作用：添加选项
 * 步骤：
 * 1. 创建option
 * 2. 创建option.name
 * 3. 创建option.text
 * 4. 添加到select*/
ListUtil.add = function (oListbox, sName ,sValue) {
    var oOption = document.createElement('option');
    oOption.appendChild(document.createTextNode(sName));
    if(arguments.length == 3){
        oOption.setAttribute('vaule', sValue);
    }
    oListbox.appendChild(oOption);
}
/**
 * 作用：删除选项
 * */
ListUtil.remove = function (oListbox,iIndex) {
 oListbox.remove(iIndex);
}
/**
 * 作用：移动列表框
 * 步骤：
 * 1. 利用appendChild()实现*/
ListUtil.move = function (oListFrom, oListTo, iIndex) {
    var oOption = oListFrom.options[iIndex];
    if (oOption != null){
        oListTo.appendChild(oOption);
    }
}
/**
 * 作用：重新排序选项
 * 步骤：
 * 1. 获得要移动的列表框的索引
 * 2. 利用insertBefore()进行插入*/
ListUtil.shiftUp = function (oListbox, iIndex) {
    if(iIndex > 0){
        var oOption = oListbox.options[iIndex];
        var oPreOption = oListbox.options[iIndex-1];
        oListbox.insertBefore(oOption, oPreOption);
    }
}
ListUtil.shiftDown = function (oListbox, iIndex) {
    if (iIndex < oListbox.options.length) {
        var oOption = oListbox.options[iIndex];
        var oNextOption = oListbox.options[iIndex+1];
        oListbox.insertBefore(oNextOption, oOption);
    }
}

