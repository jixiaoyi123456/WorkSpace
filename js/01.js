// 能够改变html的内容
//innerHTML
function change_content() {
    document.getElementById("one").innerHTML = "Hello JavaScript!"
    // document.getElementById("one").innerHTML = "我变了！";
}
// 能够改变HTML的属性
function change_attribute() {
    document.getElementById('five').src = '../image/14.png';
}
// 能够改变css的样式
function change_css() {
    document.getElementById('two').style.backgroundColor = 'blue';

}// css样式中元素的显示和隐藏
function hidden_css() {
    document.getElementById('three').style.display = 'none';
}
function show_css() {
document.getElementById('four').style.display = 'block';
}