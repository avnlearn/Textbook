// var ul = document.getElementsByClassName("random");
function Random_Item(lst) {
    // var ul = document.getElementsByTagName("ol")
    for (var i = 0; i < lst.length; i++) {
        for (var j = lst[i].children.length; j >= 0; j--) {
            lst[i].appendChild(lst[i].children[Math.random() * j | 0]);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    var ul = document.getElementsByTagName("ol")
    Random_Item(ul)
});

