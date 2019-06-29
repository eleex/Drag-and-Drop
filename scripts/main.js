var mozzila = document.querySelector(".mozzila");
var container = document.querySelector(".container");

mozzila.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    var limits = {
        left: container.offsetLeft,
        right: container.offsetLeft + container.offsetWidth,
        minleft: 0,
        maxleft: container.offsetWidth - mozzila.offsetWidth,
        top: container.offsetTop,
        bot: container.offsetHeight + container.offsetTop,
        mintop: 0,
        maxbot: container.offsetHeight - mozzila.offsetHeight
    };

    var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
    };    

    mozzila.ondragstart = function() {
        return false;
    };    

    var onMouseMove = function(evtMove) {
        evtMove.preventDefault();

        var shift = {
            x: startCoordinates.x - evtMove.clientX,
            y: startCoordinates.y - evtMove.clientY
        };

        startCoordinates = {
            x: evtMove.clientX,
            y: evtMove.clientY
        };

        if(evtMove.clientX > limits.left && evtMove.clientX <= limits.right){
            mozzila.style.left = mozzila.offsetLeft - shift.x + "px";
            if(mozzila.offsetLeft < limits.minleft){
                mozzila.style.left = limits.minleft + "px";
            }else if(mozzila.offsetLeft > limits.maxleft){
                mozzila.style.left = limits.maxleft + "px";
            }
        }

        if(evtMove.clientY > limits.top && evtMove.clientY <= limits.bot){
            mozzila.style.top = mozzila.offsetTop - shift.y + "px";
            if(mozzila.offsetTop < limits.mintop){
                mozzila.style.top = limits.mintop + "px";
            }else if(mozzila.offsetTop > limits.maxbot){
                mozzila.style.top = limits.maxbot + "px";
            }
        }
        
    };

    var onMouseUp = function(evtUp) {
        evtUp.preventDefault();
        
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});
