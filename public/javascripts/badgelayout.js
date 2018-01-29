var txtFullName;
var canvas;

var submitForm = function(){
    alert(txtFullName.top);
    $('#fullName_top').val(txtFullName.top);
    $('#fullName_left').val(txtFullName.left);
    $('#fullName_width').val(txtFullName.width);
    $('#form1').submit();
};

$(function(){
    canvas = new fabric.Canvas('badgeCanvas');
    /*
    var rect = new fabric.Rect({
        top : 100,
        left : 100,
        width : 60,
        height : 70,
        fill : 'red'
    });

    canvas.add(rect);
    */
    
    /*
    var imgElement = document.getElementById('my-image');
    var imgInstance = new fabric.Image(imgElement, {
      left: 100,
      top: 100,
      angle: 30,
      opacity: 0.85
    });
    canvas.add(imgInstance);
    */
    txtFullName = new fabric.Textbox('Muhammad Imran', {
      left: 10,
      top: 100,
      width: 400,
      angle: 0,
      opacity: 1,
      fontFamily: 'Arial'
    });
    canvas.add(txtFullName);    


});


