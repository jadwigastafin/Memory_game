/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(function () {
    console.log('DOM');

    var tilesCount = 20; //ilość kafelków na planszy
    var canGet = true; //zabezpieczenie przed kliknięciem wiecej niż 2 kafelków
    var movesCount = 0; //liczba ruchów gracza
    var tilesPair = 0; //sparowane kafelki max = tilesCount/2


    function startGame() {
        var tiles = []; //tablica z wygenerowanymi numerkami kafelków
        var clickedTiles = []; //kliknięte kafelki max 2 szt.

        var gameBoard = $(".gameBoard"); //przypisanie planszy

        //tablica z numerami kafelków
        for (var _i = 0; _i < tilesCount; _i++) {
            tiles.push(Math.floor(_i / 2));
        }

        //mieszanie tablicy z numerami kafelków - numery będą określały rodzaj kafelka

        for (i = tilesCount - 1; i > 0; i--) {
            var swap = Math.floor(Math.random() * i);
            var tmp = tiles[i];
            tiles[i] = tiles[swap];
            tiles[swap] = tmp;
        }

        //stworzenie kafelków i dołączenie ich do planszy

        for (i = 0; i < tilesCount; i++) {

            var cell = $('<div class="cell"></div>'); //tworzę pustą komórkę
            var tile = $('<div class="tile"><span class="front"></span><span class="reverse"></span></div>'); //tworzę kafelek

            tile.addClass('cardType' + tiles[i]); //dodaję klasę cardType i losowy numer
            tile.data('cardType', tiles[i]); //ustawiam atrybut data, dataset "cardType" na wartość losową
            tile.data('index', i); //ustawiam data-index="i"

            cell.append(tile); //wstawiam tile na końcu dzieci cell
            gameBoard.append(cell); //wstawiam cell na końcu dzieci gameBoard
        }

        gameBoard.find('.cell .tile').on("click", function (e) {
            tileClicked(e.target); //kafelek został kliknięty
        });

        function showMoves(moves) {
            $('.gameMoves').html("/ " + moves + " /");
        }

        function tileClicked(element) {

            // ODLICZANIE CZASU
            // let seconds = 0;
            // let time = setInterval(function(){
            //     seconds++;
            //     $(".gameTime").html(seconds);
            //
            // }, 100);
            //


            // timer();

            element = $(element);
            console.log(canGet);

            if (canGet) {
                //canGet = true

                // time();

                console.log(clickedTiles);

                if (!clickedTiles.length || element.parent().data('index') != clickedTiles[0].parent().data('index')) {
                    //jeżeli jeszcze nie pobraliśmy 1 elementu lub jego indeksu nie ma w pobranych
                    clickedTiles.push(element);
                    console.log(clickedTiles); //index klikniętego kafelka dodajemy do tablicy
                    element.parent().addClass("show"); //kafelkowi dajemy klasę "show

                    if (clickedTiles.length >= 2) {
                        //clickedTiles zawiera numery aktualnie klkiniętych kafelków
                        canGet = false; //dwa kafelki kliknięte - nie można kliknąć następnych
                        console.log(clickedTiles[0].parent().data('cardType'));
                        console.log(clickedTiles[1].parent().data('cardType'));

                        if (clickedTiles[0].parent().data('cardType') === clickedTiles[1].parent().data('cardType')) {
                            //sprawdzamy czy typ obu kafelków jest taki sam
                            setTimeout(function () {
                                deleteTiles(); //jeśli typ kafelków jest taki sam to usuwamy je
                            }, 500);
                        } else {
                            setTimeout(function () {
                                resetTiles(); //jeśli typ kafelków jest różny to ukrywamy je
                            }, 700);
                        }

                        movesCount++; //zwiększenie licznika
                        showMoves(movesCount); //pokazujemy wynik licznika w showMoves
                    }
                }
            }
        }

        // ODLICZANIE CZASU
        // function timer(){
        //     let counter = 0;
        //     let id = setInterval(function () {
        //
        //         counter++
        //
        //         console.log('dziala', counter);
        //
        //
        //     }, 100);
        // }


        function deleteTiles() {
            //deleteTiles jeśli typ kafelków jest taki sam

            clickedTiles[0].parent().fadeOut(function () {
                //rozjaśnienie do transparent
                $(this).remove();
            });

            clickedTiles[1].parent().fadeOut(function () {
                $(this).remove();
            });

            tilesPair++; //zwiększenie licznika odgadniętych par
            if (tilesPair >= tilesCount / 2) {
                gameOver(); //jeśli licznik par osiągnął liczbę kafelków/2 to koniec gry
            }

            canGet = true;
            clickedTiles = [];
        }

        function gameOver() {
            // clearInterval(id);
            $('.gameFinish').html("<h1>You win! <br> Done in '+moves+' moves</h1>");

            // alert("You win!");
        }

        function resetTiles() {
            console.log(clickedTiles);
            if (clickedTiles[0] && clickedTiles[1]) {

                clickedTiles[0].parent().removeClass('show'); //ukrywanie kafelków przez usunięcie klasy show
                clickedTiles[1].parent().removeClass('show');

                canGet = true; //wyłączenie możliwości klikania
                clickedTiles = [];
            }
        }
    }
    startGame();
});

/***/ })
/******/ ]);