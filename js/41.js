/**
 * 作用：单列表格的比较函数*/
function compareTRs(oTR1, oTR2) {
    var sValue1 = oTR1.cells[0].firstChild.nodeValue;
    var sValue2 = oTR2.cells[0].firstChild.nodeValue;
    return sValue1.localeCompare(sValue2);
}
/**
 * 作用：完成单列表格的排序
 * 步骤：
 * 1. 获得表格
 * 2. 获得表格的tbody
 * 3. 获得表格tbody的行
 * 4. 将得到的rows装换位数组
 * 5. 调用compareTRS()进行排序
 * 6. 创建文档碎片，附上排序之后的迅速
 * 7. 添加到表格的tbody中*/
function sortTable(sTableID) {
    var oTable = document.getElementById(sTableID);
    var oTBody = oTable.tBodies[0];
    var colDataRows = oTBody.rows;
    var aTRs = new Array();
    for (let i=0; i<colDataRows.length;i++){
        aTRs.push(colDataRows[i]);
    }
    aTRs.sort(compareTRs);
    var oFragment = document.createDocumentFragment();
    for (let i=0; i<aTRs.length; i++){
        oFragment.appendChild(aTRs[i]);
    }
    oTBody.appendChild(oFragment);
}
/**
 * 作用：多列表格的比较函数生成器
 * 步骤：
 * 1. 传入额外的参数：列的索引*/
function generateCompareTRs(iCol) {
    return function (oTR1, oTR2) {
        var sValue1 = oTR1.cell(iCol).firstChild.nodeValue;
        var sValue2 = oTR2.cell(iCol).firstChild.nodeValue;
        return sValue1.localeCompare(sValue2);
    }
}
/**
 * 作用：多列表格的排序函数*/
function sortTable(sTableID,iCol) {
    var oTable = document.getElementById(sTableID);
    var oTBody = oTable.tBodies[0];
    var colDataRows = oTBody.rows;
    var aTRs = new Array();
    for (let i=0; i<colDataRows.length;i++){
        aTRs.push(colDataRows[i],iCol);
    }
    aTRs.sort(compareTRs);
    var oFragment = document.createDocumentFragment();
    for (let i=0; i<aTRs.length; i++){
        oFragment.appendChild(aTRs[i]);
    }
    oTBody.appendChild(oFragment);
}
/**
 * 作用：多列表格的逆序排序函数
 * 原理：记录经过排序的那一列，用reverse（）函数即可实现逆序*/
function sortTable(sTableID, iCol) {
    var oTable = document.getElementById(sTableID);
    var oTBody = oTable.tBodies[0];
    var colDataRows = oTBody.rows;
    var aTRs = new Array();
    for(let i=0; i<colDataRows.length;i++){
        aTRs.push(colDataRows[i]);
    }
    if (oTBody.sortCol == iCol){
        aTRs.reverse();
    } else {
        aTRs.sort(generateCompareTRs(iCol));
    }
    var oFragment = document.createDocumentFragment();
    for (let i=0; i<aTRs.length; i++){
        oFragment.appendChild(aTRs[i]);
    }
    oTBody.appendChild(oFragment);
    //记录该ICol列已经经过排序
    oTBody.sortCol = iCol;

}
/**
 * 作用：对不同数据类型进行排序
 * 步骤：
 * 1. 创建转换函数
 * 2. 修改比较函数生成器
 * 3. 修改排序函数*/
function convert(sValue, sDataType) {
    switch (sDataType) {
        case 'int':
            return parseInt(sValue);
        case 'float':
            return parseFloat(sValue);
        case 'date':
            return new Date(Date.parse(sValue));
        default:
            return sValue.toString;
    }
}
function generateCompareTRs(iCol, sDataType) {
    return function compareTRs(oTR1, oTR2) {
        var vValue1, vValue2;
        if (oTR1.cell[iCol].getAttribute('value')){
            vValue1 = convert(oTR1.cell(iCol).getAttribute('value'));
            vValue2 = convert(oTR2.cell(iCol).getAttribute('value'));
        } else{
            vValue1 = convert(oTR1.cell(iCol).firstChild.nodeValue, sDataType);
            vValue2 = convert(oTR2.cell(iCol).firstChild.nodeValue,sDataType);
        }

        //因为不确定存储的是何种数据类型，而且对各种数据类型不好比较，所以使用大于和小于来进行判定
        if (vValue1 < vValue2){
            return -1;
        } else if(vValue1 > vValue2){
            return 1;
        }else {
            return 0;
        }
    }
}
function sortTable(sTableID, iCol, sDataType) {
    var oTable = document.getElementById(sTableID);
    var oTBody = oTable.tBodies;
    var colDataRows = oTBody.rows;
    var aRTs = new Array();
    for(let i=0; i<colDataRows.length; i++){
        aRTs.push(colDataRows[i]);
    }
    if (sTableID.sortCol == iCol){
        aRTs.reverse(generateCompareTRs(iCol,sDataType));
    } else {
        aRTs.sort()
    }
    var oFragment = document.createDocumentFragment();
    for (let i=0; i<aRTs.length;i++){
        oFragment.appendChild(aRTs[i]);
    }
    oTBody.appendChild(oFragment);
    sTableID.sortCol = iCol;
}