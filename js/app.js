$(function() { //Funkcja samowywołująca zabezpiecza skrypt, treśc nie dostępna na zewnatrz
    console.log('DOM');

    let tilesCount = 20; //ilość kafelków na planszy
    // let tiles = []; //tablica z wygenerowanymi numerkami kafelków
    // let clickedTiles = []; //kliknięte kafelki max 2 szt.
    let canGet = true; //zabezpieczenie przed kliknięciem wiecej niż 2 kafelków
    let movesCount = 0; //liczba ruchów gracza
    let tilesPair = 0; //sparowane kafelki max = tilesCount/2


     function startGame() {
         let tiles = [];
         let clickedTiles = [];
         // let canGet = true;
         // // let movesCount = 0;


         let gameBoard = $(".gameBoard").empty(); //czyszczenie planszy

         //tablica z numerami kafelków
         for (let i = 0; i < tilesCount; i++) {
             tiles.push(Math.floor(i / 2));
         }

         //mieszanie tablicy z numerami kafelków - numery będą określały rodzaj kafelka

         for (i = tilesCount - 1; i > 0; i--) {
             let swap = Math.floor(Math.random() * i);
             let tmp = tiles[i];
             tiles[i] = tiles[swap];
             tiles[swap] = tmp;
         }

         //stworzenie kafelków i dołączenie ich do planszy

         for (i = 0; i < tilesCount; i++) {

             let cell = $('<div class="cell"></div>'); //tworzę pustą komórkę
             let tile = $('<div class="tile"><span class="front"></span><span class="reverse"></span></div>'); //tworzę kafelek

             tile.addClass('cardType' + tiles[i]); //dodaję klasę cardType i losowy numer
             tile.data('cardType', tiles[i]); //ustawiam atrybut data, dataset "cardType" na wartość losową
             tile.data('index', i); //ustawiam data-index="i"

             cell.append(tile);  //wstawiam tile na końcu dzieci cell
             gameBoard.append(cell); //wstawiam cell na końcu dzieci gameBoard
         }

         gameBoard.find('.cell .tile').on("click", function (e) {
             tileClicked(e.target);  //kafelek został kliknięty
         });


         function showMoves(moves) {
             $('.gameMoves').html(moves);
         }


         function tileClicked(element) {



             element = $(element);
             console.log(canGet);

             if (canGet) {  //canGet = true



                 console.log(clickedTiles);

                if (!clickedTiles.length || (element.parent().data('index') != clickedTiles[0].parent().data('index'))) { //jeżeli jeszcze nie pobraliśmy 1 elementu lub jego indeksu nie ma w pobranych
                     clickedTiles.push(element);
                     console.log(clickedTiles);         //index klikniętego kafelka dodajemy do tablicy
                     element.parent().addClass("show"); //kafelkowi dajemy klasę "show

                    if (clickedTiles.length >= 2) {  //clickedTiles zawiera numery aktualnie klkiniętych kafelków
                        canGet = false; //dwa kafelki kliknięte - nie można kliknąć następnych
                        console.log(clickedTiles[0].parent().data('cardType'));
                        console.log(clickedTiles[1].parent().data('cardType'));

                        if (clickedTiles[0].parent().data('cardType') === clickedTiles[1].parent().data('cardType')) { //sprawdzamy czy typ obu kafelków jest taki sam
                            setTimeout(function () {
                                deleteTiles() //jeśli typ kafelków jest taki sam to usuwamy je
                            }, 500);

                        } else {
                            setTimeout(function () {
                                resetTiles() //jeśli typ kafelków jest różny to ukrywamy je
                            }, 500);
                        }



                        movesCount++; //zwiększenie licznika
                        showMoves(movesCount); //pokazujemy wynik licznika w showMoves
                    }
                }
             }
         };


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

             // clickedTiles = new Array();
             canGet = true;
             clickedTiles=[];

         }


         function gameOver() {
             alert("You win!");
         }

         function resetTiles() {
             console.log(clickedTiles);
             if (clickedTiles[0] && clickedTiles[1]) {


                 clickedTiles[0].parent().removeClass('show'); //ukrywanie kafelków przez usunięcie klasy show
                 clickedTiles[1].parent().removeClass('show');


                 // clickedTiles = new Array(); //wyczyszczenie tablicy z aktualnie kliknietymi kafelkami
                 canGet = true; //wyłączenie możliwości klikania
                 clickedTiles = [];
             }
         }

     }

    startGame();




});