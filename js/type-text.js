// var i = 0;
// var txt = 'Lorem ipsum dummy text blabla.';
// var speed = 50;
// function typeWriter() {
//   if (i < txt.length) {
//     document.getElementById("demo").innerHTML += txt.charAt(i);
//     i++;
//     setTimeout(typeWriter, speed);
//   }
// }
var TextTyper = {
    typeText: function (text, el, currentCharNumber, speed) {
        speed = speed || 50;
        currentCharNumber = currentCharNumber || 0;
        if (currentCharNumber <= text.length) {
            el.textContent += text.charAt(currentCharNumber);
            setTimeout(function () {
                TextTyper.typeText(text, el, ++currentCharNumber, speed);
            }, speed);
        }
    }
};
