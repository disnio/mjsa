/**
 * plugin name: jQuery Dragval 
 * varsion: 1.0
 * Alpha
 * license: GNU GENERAL PUBLIC LICENSE v3
 *
 * September 21, 2010
 *
 * Copyright (c) 2010 Kamil Szalewski (http://szalewski.pl, http://pimago.pl)
 *
 *  jQuery Dragval is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  jQuery Dragval is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 *
 **/

(function($) {	
	jQuery.fn.dragval = function(options) {	   
	    
        set = jQuery.extend({
            out: ".Output", // klasa inputa wyjściowego
			actMin: ".ActMin", // input przetrzymujący aktualnie najmniejszą wartość
			actMax: ".ActMax", // input przetrzymujący aktualnie największą wartość
			loop: ".Loop", // input do sprawdzania czy pętla true, czy false
			dragloop: ".DragLoop", // input do sprawdzania czy odpalona zostala juz akcja przesuwania miarki po dojechaniu do konca
			rightloop: ".RightLoop", // sprawdza czy petla po wyjechaniu jest w prawo
			leftloop: ".LeftLoop", // jw w lewo
			mouseout: ".MouseOut", // input sledzacy czy kursor jest na miarce
			measure: ".Measure", // klasa wartości miarki
			indicator: ".Indicator", // klasa wskaźnika
			track: ".Track", // klasa trasy wskaźnika
			label: ".Label", // klasa jednej przedziałki
			labels: ".Labels", // klasa wszystkich przedziałek
			leftBtn: ".LeftBtn", // lewa strzałka
			rightBtn: ".RightBtn", // prawa strzałka
			loopTime: 60, // czas kolejnego przejścia miarki przy przytrzymywaniu strzałki (ms)
			clickTime: 200, // czas po jakim zaczyna się pętla a kończy pojedyńcze kliknięcie (ms)
            step: 10000, // wartość jednego kroku
            min: 10000, // minimalna wartość
			max: 2000000, // maksymalna wartość
			startValue: 0, // startowa wartosc na pasku
			indicStep: 51.7, // długość jednego kroku (px)
			iniPosition: 17 // odległość od początku trasy przy starcie (px)
        }, options);
		
        this.each(function() {			
		    var obj = $(this);
			obj.prepend('<div class="Container">'
                    +'<div class="Track">'
	                +'<div class="Indicator"></div>'
	                +'<div class="LeftBtn"></div>'
		              +'<div class="Labels">'
			            +'<div class="Label LabelFirst" id="lab-1"></div>'
			            +'<div class="Label" id="lab-2"></div>'
			            +'<div class="Label" id="lab-3"></div>'
			            +'<div class="Label" id="lab-4"></div>'
			            +'<div class="Label" id="lab-5"></div>'
			            +'<div class="Label" id="lab-6"></div>'
			            +'<div class="Label" id="lab-7"></div>'
			            +'<div class="Label" id="lab-8"></div>'
			            +'<div class="Label" id="lab-9"></div>'
			            +'<div class="Label LabelLast" id="lab-10"></div>'
		              +'</div>'
		            +'<div class="RightBtn"></div>'
	                +'</div>'
	                +'<div class="Measure"></div>'
                +'</div>'

                +'<input type="hidden" name="" value="" class="ActMin" />'
                +'<input type="hidden" name="" value="" class="ActMax" />'
                +'<input type="hidden" name="" value="0" class="Loop" />'
				+'<input type="hidden" name="" value="0" class="DragLoop" />'
				+'<input type="hidden" name="" value="0" class="MouseOut" />'
				+'<input type="hidden" name="" value="0" class="LeftLoop" />'
				+'<input type="hidden" name="" value="0" class="RightLoop" />');

			var indicator = set.indicator;
	        var loopTime = Number(set.loopTime);
		    var clickTime = Number(set.clickTime);
	        var step = Number(set.step);
		    var min = Number(set.min);
		    var max = Number(set.max);
			var startValue = Number(set.startValue);
		    var indicStep = Number(set.indicStep);
		    var iniPosition = Number(set.iniPosition);
			
			
			if(startValue > 0) {
				$(set.out, obj).attr("value", set.startValue);
				$(set.actMin, obj).attr("value", set.startValue); // aktualnie najmniejsza wartość
				$(set.actMax, obj).attr("value", set.startValue+(9*set.step)); // aktualnie największa wartość		
				
				toValue( startValue );
			} else {
  				// przypisujemy polom zdefinoiowane wartości...
				$(set.out, obj).attr("value", set.min);
				$(set.actMin, obj).attr("value", set.min); // aktualnie najmniejsza wartość
				$(set.actMax, obj).attr("value", set.min+(9*set.step)); // aktualnie największa wartość
		
				//... i generujemy miarkę
				var x = set.min;
				$(set.measure, obj).html(" ");
				// ta pętla wypełnia diva z miarką od wartości najmniejszej do największej
				while (x <= set.min+(9*set.step)) {
            		$(set.measure, obj).append("<span class=\"Value\">"+number_format(x," ")+"</span>");
					x = x+set.step;
       	 		}	
            }			
			//
		
			// zaczynamy zabawę ;-)
			
			// AKCJE
			
			// obsługa drag
			var track = $(set.track, obj);
	    	$(indicator, obj).draggable({ 
		    	axis: 'x', 
				containment: track, 
				grid: [indicStep, indicStep],
				stop: function(event, ui) {
			    	var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
			    	var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
					
			    	var posNumber = Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ); // numer pozycji na linijce
				    
					$(set.out, obj).attr("value", Number((posNumber-1)*step)+actMin);
					
			    	$(set.loop, obj).attr("value", 0);
					$(set.dragloop, obj).attr("value", 0);
					$(set.mouseout, obj).attr("value", 0); 
					$(set.rightloop, obj).attr("value", 0);
					$(set.leftloop, obj).attr("value", 0);
				},
				drag: function(event, ui) {
				    // odpowiada za przesuwanie po wyjechaniu w lewo lub prawo
				    if($(set.dragloop, obj).attr("value")=='0') {
		    	        if(Number($(indicator, obj).css("left").split("px")[0])<=17 && $(set.mouseout, obj).attr("value")=='1') {					
			    	        $(set.loop, obj).attr("value", 1);
					        $(set.dragloop, obj).attr("value", 1);
					    	$(set.leftloop, obj).attr("value", 1);
					        moveLeft();
				        }

		    	        if(Number($(indicator, obj).css("left").split("px")[0])>=481 && $(set.mouseout, obj).attr("value")=='1') {
			    	        $(set.loop, obj).attr("value", 1);
					        $(set.dragloop, obj).attr("value", 1);
					    	$(set.rightloop, obj).attr("value", 1);
					        moveRight();
				        }
                    } else if(Number($(indicator, obj).css("left").split("px")[0]) < 482 && $(set.rightloop, obj).attr("value")=='1') {
                        $(set.loop, obj).attr("value", 0);
					    $(set.dragloop, obj).attr("value", 0);
					    $(set.rightloop, obj).attr("value", 0);	  
                    } else if(Number($(indicator, obj).css("left").split("px")[0]) > 17 && $(set.leftloop, obj).attr("value")=='1') {
                        $(set.loop, obj).attr("value", 0);
					    $(set.dragloop, obj).attr("value", 0);
					    $(set.leftloop, obj).attr("value", 0);
                    }	

					//$("#Debug").html(Math.round(Number($(indicator, obj).css("left").split("px")[0]))-Math.round(iniPosition));
                    if(Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ) >= 1 && Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ) <= 10) {
			    	    var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
			    	    var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
					
			    	    var posNumber = Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ); // numer pozycji na linijce			    
					    
					    $(set.out, obj).attr("value", Number((posNumber-1)*step)+actMin); 
					}
            					
				}
			});

			// po kliknięciu w przedziałke
			$(set.label, obj).click(function() {
				var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
				var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
			 
		    	var posNumber = $(this).attr("id").split("-")[1]; // number pozycji na linijce
				var distance = Number(posNumber * indicStep)-indicStep; // długość pomiędzy początkiem a labelem na którego kliknięto
			
				$(set.out, obj).attr("value", Number((posNumber-1)*step)+actMin);
				$(set.indicator, obj).css("left", distance+iniPosition+"px");
			});
			
			// lewy przycisk
			$(set.leftBtn, obj).mousedown(function() {
		    	$(set.loop, obj).attr("value", 1);
		    	moveLeftWarun( 1 );		
			}).mouseup(function() {
		    	$(set.loop, obj).attr("value", 0);
				$(set.mouseout, obj).attr("value", 0);
			});
			
			// prawy przycisk
			$(set.rightBtn, obj).mousedown(function() {
		    	$(set.loop, obj).attr("value", 1);
		    	moveRightWarun( 1 );		
			}).mouseup(function() {
		    	$(set.loop, obj).attr("value", 0);
				$(set.mouseout, obj).attr("value", 0);
			});
			
			// wyjechanie poza miarkę z przytrzymanym przyciskiem
			$(set.labels, obj).mouseleave(function() {
		    	if($(indicator, obj).attr("class")=="Indicator ui-draggable ui-draggable-dragging") {
			    	$(set.loop, obj).attr("value", 1);
					$(set.mouseout, obj).attr("value", 1);
				}		
			}).mouseover(function() {
		    	$(set.loop, obj).attr("value", 0);
				$(set.mouseout, obj).attr("value", 0);
			});
		
		    $(indicator, obj).mouseleave(function() {
			    if($(indicator, obj).attr("class")=="Indicator ui-draggable ui-draggable-dragging") {
			    	$(set.loop, obj).attr("value", 1);
					$(set.mouseout, obj).attr("value", 1);
				}
			});
			
		    // puszczenie indicatora
			$(indicator, obj).mouseup(function() {
		    	$(set.loop, obj).attr("value", 0);
				$(set.mouseout, obj).attr("value", 0);
			});
			
			// obsługa wpisywania wartości do inputa
			$(set.out, obj).focusout(function() {
		    	var newValue = Number((Math.round(Number($(set.out, obj).attr("value"))/step))*step); // nowa wartość po obliczeniu i zaokrągleniu
				if(integer_validate(newValue)) {
			        toValue( newValue );
				} else {
				    toValue( min );
					$(set.out, obj).attr("value", min);
				}
			});			
			
			// FUNKCJE		
			function toValue( newValue ) { // funckja przesuwa indicator do wybranej wartosci
		    	if(newValue >= min && newValue <= max) {
			    	var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
			    	var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
				
					// jeżeli nowa wartość jest równa max
					if(newValue==max) {
				    	$(set.actMin, obj).attr("value", newValue-(9*step));
						$(set.actMax, obj).attr("value", newValue);
						//$(set.out, obj).attr("value", newValue);
						$(indicator, obj).css("left", iniPosition+(9*indicStep)+"px"); // przesuwamy indicator'a
					
						//... i generujemy miarkę
						var x = newValue-(9*step);
				    	$(set.measure, obj).html(" ");
						// ta pętla wypełnia diva z miarką od wartości najmniejszej do największej
						while (x <= newValue) {
            				$(set.measure, obj).append("<span class=\"Value\">"+number_format(x," ")+"</span>");
							x = x+step;
        				}					
					// jeżeli nowa wartość jest w obrębie aktualniej miarki
					} else if(newValue > actMin && newValue < actMax) {
				    	var stepsTo = (10-((actMax-newValue)/step))-1; // obliczamy ilość kroków na miarce do osiągnięcia nowej wartości
					
						//$(set.out, obj).attr("value", newValue);
						$(indicator, obj).css("left", (stepsTo*indicStep)+17+"px"); // przesuwamy indicator'a				
					} else { // jeżeli nie
				    	$(set.actMin, obj).attr("value", newValue);
						$(set.actMax, obj).attr("value", newValue+(9*step));
						//$(set.out, obj).attr("value", newValue);
						$(indicator, obj).css("left", "17px"); // przesuwamy indicator'a
					
						//... i generujemy miarkę
						var x = newValue;
				    	$(set.measure, obj).html(" ");
						// ta pętla wypełnia diva z miarką od wartości najmniejszej do największej
						while (x <= (newValue+(9*step))) {
            				$(set.measure, obj).append("<span class=\"Value\">"+number_format(x," ")+"</span>");
							x = x+step;
        				}									
					}
				} else if(newValue > max) {
				    toValue( max );
				    $(set.out, obj).attr("value", max);
				} else if(newValue < min) {
				    toValue( min );
				    $(set.out, obj).attr("value", min);
				}
			}	
			
            function integer_validate(src) {
                var regex = /^[\-]{0,1}[0-9]{1,8}$/;
                return regex.test(src);
            }

			function number_format(l,r){w='';while(a=~~(l/1e3)){w=r+((b=l%1e3)>9?(b>99?'':'0'):'00')+b+w;l=a}return l+w}
			
			// funkcja bez warunku sprawdzającego czy ma zacząć zapętlanie W LEWO
		    function moveLeft() {
		        var actValue = Number($(set.out, obj).attr("value")); // aktualna wartość inputa 
			    var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
			    var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
			
			    // jeżeli aktualny max jest większy od maxa to jedziemy ze skryptem...
		        if(actMin>min) {
			        $(set.out, obj).attr("value", actValue-step);
				    $(set.actMin, obj).attr("value", actMin-step);
				    $(set.actMax, obj).attr("value", actMax-step);

				    var x = Number($(set.actMin, obj).attr("value"));
				    $(set.measure, obj).html(""); // czyścimy diva z miarką
				
				    // ta pętla wypełnia diva z miarką od wartości najmniejszej do największej
				    while (x <= Number($(set.actMax, obj).attr("value"))) {
                        $(set.measure, obj).append("<span class=\"Value\">"+number_format(x," ")+"</span>");
					    x = x+step;
                    }				
			    } else {
			    // ...a jeżeli nie to przesuwamy Indicator'a...
			        var posNumber = Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ); // numer pozycji na linijce
				    var distance = Number(posNumber * indicStep)-indicStep; // długość pomiędzy początkiem a labelem na którego kliknięto
				    // ...no chyba, że się nie na :)
				    if(posNumber>1) {
			            $(set.out, obj).attr("value", (Number((posNumber-1)*step)+actMin)-step);
			            $(indicator, obj).css("left", (distance+iniPosition)-indicStep+"px");
				    }
			    }
			
			    if($(set.loop, obj).attr("value")>0) {
                    setTimeout(moveLeft, loopTime); 
                }	
			}
			
			// funckja z warunkiem sprawdzającym czy ma zacząć zapętlanie W LEWO
		    function moveLeftWarun( w ) {
		        var actValue = Number($(set.out, obj).attr("value")); // aktualna wartość inputa 
			    var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
			    var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
			
			    // jeżeli aktualny max jest większy od maxa to jedziemy ze skryptem...
		        if(actMin>min) {
			        $(set.out, obj).attr("value", actValue-step);
				    $(set.actMin, obj).attr("value", actMin-step);
				    $(set.actMax, obj).attr("value", actMax-step);

				    var x = Number($(set.actMin, obj).attr("value"));
				    $(set.measure, obj).html(""); // czyścimy diva z miarką
				
				    // ta pętla wypełnia diva z miarką od wartości najmniejszej do największej
				    while (x <= Number($(set.actMax, obj).attr("value"))) {
                        $(set.measure, obj).append("<span class=\"Value\">"+number_format(x," ")+"</span>");
					    x = x+step;
                    }				
			    } else {
			    // ...a jeżeli nie to przesuwamy Indicator'a...
			        var posNumber = Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ); // numer pozycji na linijce
				    var distance = Number(posNumber * indicStep)-indicStep; // długość pomiędzy początkiem a labelem na którego kliknięto
				    // ...no chyba, że się nie na :)
				    if(posNumber>1) {
			            $(set.out, obj).attr("value", (Number((posNumber-1)*step)+actMin)-step);
			            $(indicator, obj).css("left", (distance+iniPosition)-indicStep+"px");
				    }
			    }
			
			    if(w>0) {
			        setTimeout(checkLoopLeft, clickTime); 
			    } else {
			        if($(set.loop, obj).attr("value")>0) {
                        setTimeout(moveLeft, loopTime); 
                    }
                }	
			}
			
		    // funkcja sprawdza czy odpalić lewą pętlę
			function checkLoopLeft() {
				if($(set.loop, obj).attr("value")>0) {
                	moveLeft(); 
            	}		
			}
			
			// funkcja bez warunku sprawdzającego czy ma zacząć zapętlanie W LEWO
		    function moveRight() {
		        var actValue = Number($(set.out, obj).attr("value")); // aktualna wartość inputa 
			    var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
			    var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
			
			    // jeżeli aktualny max jest większy od maxa to jedziemy ze skryptem...
		        if(actMax<max) {
			        $(set.out, obj).attr("value", actValue+step);
				    $(set.actMin, obj).attr("value", actMin+step);
				    $(set.actMax, obj).attr("value", actMax+step);

				    var x = Number($(set.actMin, obj).attr("value"));
				    $(set.measure, obj).html(""); // czyścimy diva z miarką
				
				    // ta pętla wypełnia diva z miarką od wartości najmniejszej do największej
				    while (x <= Number($(set.actMax, obj).attr("value"))) {
                        $(set.measure, obj).append("<span class=\"Value\">"+number_format(x," ")+"</span>");
					    x = x+step;
                    }				
			    } else {
			    // ...a jeżeli nie to przesuwamy Indicator'a...
			        var posNumber = Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ); // numer pozycji na linijce
				    var distance = Number(posNumber * indicStep)-indicStep; // długość pomiędzy początkiem a labelem na którego kliknięto
				    // ...no chyba, że się nie na :)
				    if(posNumber<10) {
			            $(set.out, obj).attr("value", (Number((posNumber-1)*step)+actMin)+step);
			            $(indicator, obj).css("left", (distance+iniPosition)+indicStep+"px");
				    }
			    }
			
			    if($(set.loop, obj).attr("value")>0) {
                    setTimeout(moveRight, loopTime); 
                }	
			}
			
			// funckja z warunkiem sprawdzającym czy ma zacząć zapętlanie W LEWO
		    function moveRightWarun( w ) {
		        var actValue = Number($(set.out, obj).attr("value")); // aktualna wartość inputa 
			    var actMin = Number($(set.actMin, obj).attr("value")); // aktualnie najmniejsza wartość
			    var actMax = Number($(set.actMax, obj).attr("value")); // aktualnie największa wartość
			
			    // jeżeli aktualny max jest większy od maxa to jedziemy ze skryptem...
		        if(actMax<max) {
			        $(set.out, obj).attr("value", actValue+step);
				    $(set.actMin, obj).attr("value", actMin+step);
				    $(set.actMax, obj).attr("value", actMax+step);

				    var x = Number($(set.actMin, obj).attr("value"));
				    $(set.measure, obj).html(""); // czyścimy diva z miarką
				
				    // ta pętla wypełnia diva z miarką od wartości najmniejszej do największej
				    while (x <= Number($(set.actMax, obj).attr("value"))) {
                        $(set.measure, obj).append("<span class=\"Value\">"+number_format(x," ")+"</span>");
					    x = x+step;
                    }				
			    } else {
			    // ...a jeżeli nie to przesuwamy Indicator'a...
			        var posNumber = Math.round( ( ( Number($(indicator, obj).css("left").split("px")[0]) - iniPosition ) / indicStep ) + 1 ); // numer pozycji na linijce
				    var distance = Number(posNumber * indicStep)-indicStep; // długość pomiędzy początkiem a labelem na którego kliknięto
				    // ...no chyba, że się nie na :)
				    if(posNumber<10) {
			            $(set.out, obj).attr("value", (Number((posNumber-1)*step)+actMin)+step);
			            $(indicator, obj).css("left", (distance+iniPosition)+indicStep+"px");
				    }
			    }
			
			    if(w>0) {
			        setTimeout(checkLoopRight, clickTime); 
			    } else {
			        if($(set.loop, obj).attr("value")>0) {
                        setTimeout(moveRight, loopTime); 
                    }
                }	
			}
			
			// funkcja sprawdza czy odpalić prawą pętlę
			function checkLoopRight() {
				if($(set.loop, obj).attr("value")>0) {
                	moveRight(); 
            	}		
			}
        });
 
        return this;
	};
})(jQuery);
