function useRanges() {
    //DOM范围的复杂选取
    var oP1 = document.getElementById('p1');
    var oP2 = document.getElementById('p2');
    var oP3 = document.getElementById('p3');
    var oRange1 = document.createRange();
    var oRange2 = document.createRange();
    var oHello = oP1.firstChild.firstChild;
    var oWorld = oP1.lastChild;
    // setStart() setEnd() 接受两个参数：
    // 1. 节点的引用； 2. 偏移量；
    oRange1.setStart(oHello, 2);
    oRange1.setEnd(oWorld, 3);
    // alert(oRange1);

    //DOM范围内的删除
    // if(oRange1.deleteContents()){
    //     alert('deletContents');
    // }
    //DOM范围内的删除选取范围，并将范围内的文档碎片座位函数值返回
    // var oFragment = oRange1.extractContents();
    // document.body.appendChild(oFragment);
    //DOM范围内的删除选取范围，创建可以用来插入到文档任何其他位置的副本
    var oFragment_backup = oRange1.cloneContents();
    document.body.appendChild(oFragment_backup);
    //DOM范围内的插入,在选取的开头插入内容
    var oSpan = document.createElement('span');
    oSpan.style.color = 'red';
    oSpan.appendChild(document.createTextNode('insert text'));
    oRange1.insertNode(oSpan);
    //DOM方用surroundContents法插入包围范围的内容
  //  var oSpan_2 = document.createElement('span');
    oSpan.style.backgroundColor = 'blue';
    // oRange1.surroundContents(oSpan);
    //折叠DOM范围
    oRange2.setStartAfter(oP2);
    oRange2.setEndBefore(oP3);
    console.log(oRange2);
    alert(oRange2.collapsed);
    //比较DOM范围
}