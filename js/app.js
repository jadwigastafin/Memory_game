$(function() {
    console.log('DOM');

    let tilesCount = 20; //ilość kafelków na planszy
    let canGet = true; //zabezpieczenie przed kliknięciem wiecej niż 2 kafelków
    let movesCount = 0; //liczba ruchów gracza
    let tilesPair = 0; //sparowane kafelki max = tilesCount/2
    let timeCount = 0;
    let gameStarted = false;
    let timer = null;
    let bestScore =  JSON.parse( localStorage.getItem("score") );
    if( !bestScore ){
        bestScore = {
            time: 999,
            moves: 999
        }
    }

    $('.bestScore').html("<h1>Best score: <br> Time: "+bestScore.time+" <br> Moves: "+bestScore.moves+" </h1>");



    function startGame() {
         let tiles = []; //tablica z wygenerowanymi numerkami kafelków
         let clickedTiles = []; //kliknięte kafelki max 2 szt.

         let gameBoard = $(".gameBoard"); //przypisanie planszy



         //tablica z numerami kafelków
         for (let i = 0; i < tilesCount; i++) {
             tiles.push(Math.floor(i / 2));
         }

         //mieszanie tablicy z numerami kafelków - numery będą określały rodzaj kafelka

         for (i = tilesCount-1; i > 0; i--) {
             let swap = Math.floor(Math.random() * i/2);
             let tmp = tiles[i];
             tiles[i] = tiles[swap];
             tiles[swap] = tmp;
         }

         //stworzenie kafelków i dołączenie ich do planszy

         for (i = 0; i < tilesCount; i++) {

             let cell = $('<div class="cell"></div>'); //tworzę pustą komórkę
             let tile = $('<div class="tile"><span class="front"></span><span class="reverse"></span></div>'); //tworzę kafelek

             tile.addClass('cardType' + tiles[i]); //dodaję klasę cardType i losowy numer
             tile.data('cardType', tiles[i]);
             //ustawiam atrybut data, dataset "cardType" na wartość losową
             tile.data('index', i); //ustawiam data-index="i"

             cell.append(tile);  //wstawiam tile na końcu dzieci cell
             gameBoard.append(cell); //wstawiam cell na końcu dzieci gameBoard
         }

         gameBoard.find('.cell .tile').on("click", function (e) {
             tileClicked(e.target);  //kafelek został kliknięty
         });



         function showMoves(moves) {
             $('.gameMoves').html("/ "+moves+" /");
         };



         function timer() {
              timer = setInterval(function () {

                 timeCount++;

                 $(".gameTime").html("/ "+timeCount+" /");  //wyświetlanie czasu na ekranie


                 console.log("DziałaTimer", timeCount);

             }, 1000);
         }




         function tileClicked(element) {
             element = $(element);
             if(!gameStarted){
                 timer();
                 gameStarted=true;
             }
             if (canGet) {  //canGet = true

                 if (!clickedTiles.length || (element.parent().data('index') != clickedTiles[0].parent().data('index'))) { //jeżeli jeszcze nie pobraliśmy 1 elementu lub jego indeksu nie ma w pobranych
                     clickedTiles.push(element);//index klikniętego kafelka dodajemy do tablicy
                     element.parent().addClass("show"); //kafelkowi dajemy klasę "show"


                     if (clickedTiles.length >= 2) {  //clickedTiles zawiera numery aktualnie klkiniętych kafelków
                         canGet = false; //dwa kafelki kliknięte - nie można kliknąć następnych

                         if (clickedTiles[0].parent().data('cardType') === clickedTiles[1].parent().data('cardType')) { //sprawdzamy czy typ obu kafelków jest taki sam
                             setTimeout(function () {
                                 deleteTiles() //jeśli typ kafelków jest taki sam to usuwamy je

                             }, 500);

                         } else {
                             setTimeout(function () {
                                 resetTiles() //jeśli typ kafelków jest różny to ukrywamy je

                             }, 700);
                         }


                         movesCount++; //zwiększenie licznika
                         showMoves(movesCount); //pokazujemy wynik licznika w showMoves

                     }
                 }
             }

         }




         function deleteTiles() {  //deleteTiles jeśli typ kafelków jest taki sam

             clickedTiles[0].parent().fadeOut(function () { //rozjaśnienie do transparent
                 $(this).remove();
             });

             clickedTiles[1].parent().fadeOut(function () {
                 $(this).remove();
             });


             tilesPair++;  //zwiększenie licznika odgadniętych par
             if (tilesPair >= tilesCount / 2) {



             gameOver();  //jeśli licznik par osiągnął liczbę kafelków/2 to koniec gry

             }

             canGet = true;
             clickedTiles=[];

         }



         function gameOver() {

             clearInterval(timer);

             $('.gameFinish').html("<h1>Congratulations! <br> Done in "+movesCount+" moves <br> in "+timeCount+" seconds</h1>");
             if(movesCount < bestScore.moves && timeCount < bestScore.time ) {
                localStorage.setItem("score", JSON.stringify({moves: movesCount, time: timeCount}));
                console.log('saved');
             }
         }




         function resetTiles() {
             if (clickedTiles[0] && clickedTiles[1]) {

                 clickedTiles[0].parent().removeClass('show'); //ukrywanie kafelków przez usunięcie klasy show
                 clickedTiles[1].parent().removeClass('show');

                 canGet = true;    //włączenie możliwości klikania
                 clickedTiles = [];
             }
         }

     };

     startGame();




});