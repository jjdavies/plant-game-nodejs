

var garden = document.getElementById("garden");
var plants ="";
var gardenJSON;
var tiles = document.getElementsByClassName('blank');




(()=>{
    fetch('assets/stage2.png');
    fetch('data/plantData.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        gardenJSON = data;
        

        for (var i = 1; i <= 100; i++){
            var row = 1 + (i - (i % 10))/10;
            var spaceClass = "blank";
            for (var k = 0; k < gardenJSON.garden.length; k++){
                if (gardenJSON.garden[k].plantID == i){
                    if (gardenJSON.garden[k].state == "pot") spaceClass = "pot";
                }
            }
            plants += "<div id='" + i + "' class='" + spaceClass + " row" + row + "'></div>";
            
        }

    
        garden.innerHTML=plants;
        for (var j = 0; j < tiles.length; j++){
            tiles[j].addEventListener('click', (e)=>{
                e.target.classList.remove("blank");
                e.target.classList.add("pot");
                setTimeout(()=>{
                    e.target.classList.remove("pot");
                    e.target.classList.add("stage2");
                    setTimeout(()=>{
                        e.target.classList.remove("stage2");
                        e.target.classList.add("stage3");
                        setTimeout(()=>{
                            e.target.classList.remove("stage3");
                            e.target.classList.add("stage4");
                            setTimeout(()=>{
                                e.target.classList.remove("stage4");
                                e.target.classList.add("stage5");
                                setTimeout(()=>{
                                    e.target.classList.remove("stage5");
                                    e.target.classList.add("stage6");
                                    setTimeout(()=>{
                                        e.target.classList.remove("stage6");
                                        e.target.classList.add("stage7");
                                        setTimeout(()=>{
                                            e.target.classList.remove("stage7");
                                            e.target.classList.add("stage8");
                                            setTimeout(()=>{
                                                e.target.classList.remove("stage8");
                                                e.target.classList.add("stage9");
                                            }, 3000)
                                        }, 3000)
                                    }, 3000)
                                }, 3000)
                            }, 3000)
                        }, 3000)
                    }, 3000)
                }, 3000)
                var plantID = e.target.id;
                for (var k = 0; k < gardenJSON.garden.length; k++){
                    if (gardenJSON.garden[k].plantID == plantID){
                        gardenJSON.garden[k].state = "pot";
                    }
                }

                fetch('data/plantData.json', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(gardenJSON),
                    })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
        }
    });

})();
