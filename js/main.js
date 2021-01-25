var active = false;

function dataRequest(){
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', 'https://cors-anywhere.herokuapp.com/https://csrng.net/csrng/csrng.php?min=0&max=255');
    myRequest.onload = function(){

        if (active) {
            throw Error("New response received before old one finished.")
        }
 
        var myData = JSON.parse(myRequest.responseText);

        if (myData[0].status == "error"){
            throw Error(myData[0].reason)
        }

        var number = myData[0].random;

        var binary = ("00000000" + number.toString(2)).slice(-8);

        var binaryArray = Array.from(binary, Number);

        console.log(binaryArray);

        
        manipulacija(binaryArray);
    };
    myRequest.send();
}

function manipulacija(binaryArray) {
    active = true;

    var nesto = document.getElementById("glavni-container").children;

    for (var i = 0; i < 8; i++) {
        if (binaryArray[i] == false) {

            nesto[i].classList.add("active0");

        } else {

            nesto[i].classList.add("active1");
        }

    }

    setTimeout(reset, 500);

};

function reset(){
    active = false;

    var nesto = document.getElementById("glavni-container").children;

    for (var i = 0; i < 8; i++) {
        nesto[i].classList.remove("active0")
        nesto[i].classList.remove("active1")
    }
}

setInterval(dataRequest, 1000)

