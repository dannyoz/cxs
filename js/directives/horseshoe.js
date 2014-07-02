
//Directive 
.directive('horseshoe',[ 'mainPage', '$timeout', function (mainPage, $timeout) {
    return{
        restrict:'E',
        templateUrl : 'views/templates/horseshoe.html',
        scope : {
        	data : '=data'
        },
        link : function(scope, element, attrs){

            scope.percent   = scope.data
		    scope.total     = 121
		    scope.radius    = 140
		    scope.draggable = false
		    scope.dial      = angular.element(element[0].children[0].children[2])

		    scope.animateGraph = function(){

		    	function iplusplus(i){
		    		
		    		$timeout(function(){
		    			scope.percent = i
		    		},i*20)
		    	}

		    	for (var i = 0; i < scope.percent; i++){
		    		iplusplus(i+1)	
		    	}
		    }

		    //Calculate path attributes
		    scope.svgHoreshoe = function(endAngle){

				var PI = Math.PI,
				    cos = Math.cos,
				    sin = Math.sin,
				    centerY = 200,
				    centerX = 200,
					radius = scope.radius,
					startAngle = - 240,
				    startRadians = startAngle * PI / 180,
				    endRadians = endAngle * PI / 180,
				    largeArc = ((endRadians - startRadians) % (PI * 2)) > PI ? 1 : 0,
				    startX = centerX + cos(startRadians) * radius,
			        startY = centerY + sin(startRadians) * radius,
			        endX = centerX + cos(endRadians) * radius,
			        endY = centerY + sin(endRadians) * radius


				var commands = [
			      	'M', startX, startY,      
			      	'A', radius, radius, 0, largeArc, 1, endX, endY
			    ]
			    
			    return String(commands.join(' '))
			}

			//Calculate score end angle
			scope.calcPerc = function(){
				var percentage = (scope.percent / scope.total)*100
					endAngle = percentage * 3.6 - 240

				scope.potential = scope.svgHoreshoe(endAngle - 0.0001);
			}

			scope.increment = function(dir, e){
				e.preventDefault();

				if (dir == 'up' && scope.percent < 100){
					scope.percent = scope.percent + 1
					mainPage.dataAverage = mainPage.dataAverage +1
				}

				if (dir == 'down' && scope.percent > 0){
					scope.percent = scope.percent - 1
					mainPage.dataAverage = mainPage.dataAverage - 1 
				}

			}			

			//Mouse over event triggered when hovering over score
			scope.changeScore = function(e){

				var $element = angular.element(e.srcElement);

				if (scope.draggable == true){

					var parent       = e.srcElement.offsetParent,
						parentHeight = parent.clientHeight,
						parentWidth  = parent.clientWidth,
						parentMidy   = parent.clientHeight / 2,
						parentMidx   = parent.clientWidth / 2,
						thisOffsetX  = e.offsetX,
						thisOffsetY  = e.offsetY;
					
					//Detect which quadrant the mouseover event is bound to
					if (thisOffsetY < parentMidy && thisOffsetX < parentMidx)   calcPosPerc('tl');
					if (thisOffsetY >= parentMidy && thisOffsetX < parentMidx)  calcPosPerc('bl');
					if (thisOffsetY < parentMidy && thisOffsetX >= parentMidx)  calcPosPerc('tr');
					if (thisOffsetY >= parentMidy && thisOffsetX >= parentMidx) calcPosPerc('br');	

					function calcPosPerc(quad) {
						
						//Bottom left quadrant -- 0% to 20%
						if (quad == 'bl'){

							var shift   = 340,
								range   = 140,
								offset  = -thisOffsetY,
								base    = offset + shift,
								result  = Math.round(base/range *20);

							scope.percent = result
							mainPage.dataAverage = result
						}

						//Top left quadrant -- 21% to 50%
						if (quad == 'tl'){

							var xshift    = 60,
								xrange    = parentMidx - xshift,
								xoffset   = -thisOffsetX,
								xbase     = thisOffsetX - xshift,
								xresult   = xbase/xrange * 100,
								yshift    = 60,
								yrange    = parentMidy - yshift,
								yoffset   = -thisOffsetY + parentMidy,
								yresult   = yoffset/yrange * 100,
								combined  = Math.round(((yresult + xresult)/ 2)*0.3 + 20),
								composite = (combined < 20) ? 20 : (combined > 50) ? 50 : combined;

							scope.percent = composite
							mainPage.dataAverage = composite
						}

						//Top right quadrant -- 51% to 80%
						if (quad == 'tr'){

							var xshift    = 60,
								xrange    = parentMidx - xshift,
								xoffset   = thisOffsetX - parentMidx,
								xresult   = xoffset/xrange * 100,
								yshift    = 60,
								yrange    = parentMidy - yshift,
								yoffset   = thisOffsetY - yshift,
								yresult   = yoffset/yrange * 100,
								combined  = Math.round(((yresult + xresult)/ 2)*0.3 + 50),
								composite = (combined < 50) ? 50 : (combined > 80) ? 80 : combined;

							scope.percent = composite
							mainPage.dataAverage = composite	

						}

						if(quad == 'br'){

							var range     = 125,
								offset    = thisOffsetY - parentMidy,
								result    = Math.round((offset/range *100)*0.2 + 80),
								composite = (result < 80) ? 80 : (result > 100) ? 100 : result;

							scope.percent = composite
							mainPage.dataAverage = composite
						}
					}
				}	


				$element.on('mousedown', function(event){
					event.preventDefault();
					scope.draggable = true
		            return false;
				})

				$element.on('mouseup', function() {
		            event.preventDefault();
					scope.draggable = false
		            return false;
		        });
				
			}

			//Plots co-ordiantes for dial CSS -- Manual entry for all 100 co-ords!
			scope.positionDial = function(){

				var x,y;

				switch (scope.percent){
					case 0:
				        x = '-72';
				        y = '120';
				        break;
					case 1:
				        x = '-75';
				        y = '118';
				        break;
				    case 2:
				        x = '-80';
				        y = '115';
				        break;
				    case 3:
				        x = '-86';
				        y = '110';
				        break;
				    case 4:
				        x = '-91';
				        y = '106';
				        break; 
				    case 5:
				        x = '-96';
				        y = '101';
				        break; 
				    case 6:
				        x = '-102';
				        y = '95';
				        break;
				    case 7:
				        x = '-107';
				        y = '89';
				        break;
				    case 8:
				        x = '-112';
				        y = '84';
				        break;
				    case 9:
				        x = '-117';
				        y = '77';
				        break; 
				    case 10:
				        x = '-120';
				        y = '71';
				        break;
				    case 11:
				        x = '-124';
				        y = '65';
				        break;
				    case 12:
				        x = '-127';
				        y = '59';
				        break;
				    case 13:
				        x = '-130';
				        y = '52';
				        break;
				    case 14:
				        x = '-133';
				        y = '44';
				        break;
				    case 15:
				        x = '-135';
				        y = '37';
				        break;
				    case 16:
				        x = '-136';
				        y = '31';
				        break;
				    case 17:
				        x = '-138';
				        y = '23';
				        break;
				    case 18:
				        x = '-139';
				        y = '16';
				        break;
				    case 19:
				        x = '-140';
				        y = '10';
				        break;
				    case 20:
				        x = '-140';
				        y = '2';
				        break;
				    case 21:
				        x = '-140';
				        y = '-6';
				        break;
				    case 22:
				        x = '-139';
				        y = '-15';
				        break;
				    case 23:
				        x = '-138';
				        y = '-22';
				        break;
				    case 24:
				        x = '-137';
				        y = '-28';
				        break;
				    case 25:
				        x = '-135';
				        y = '-35';
				        break;
				    case 26:
				        x = '-134';
				        y = '-41';
				        break;
				    case 27:
				        x = '-131';
				        y = '-49';
				        break;
				    case 28:
				        x = '-128';
				        y = '-56';
				        break;
				    case 29:
				        x = '-124';
				        y = '-64';
				        break;
				    case 30:
				        x = '-122';
				        y = '-68';
				        break;
				    case 31:
				        x = '-119';
				        y = '-74';
				        break;
				    case 32:
				        x = '-115';
				        y = '-81';
				        break; 
				    case 33:
				        x = '-109';
				        y = '-88';
				        break;
				    case 34:
				        x = '-104';
				        y = '-94';
				        break;
				    case 35:
				        x = '-100';
				        y = '-97';
				        break;
				    case 36:
				        x = '-93';
				        y = '-104';
				        break;
				    case 37:
				        x = '-89';
				        y = '-108';
				        break;
				    case 38:
				        x = '-84';
				        y = '-112';
				        break;
				    case 39:
				        x = '-78';
				        y = '-116';
				        break;
				   	case 40:
				        x = '-72';
				        y = '-120';
				        break;
				    case 41:
				        x = '-65';
				        y = '-124';
				        break;
				    case 42:
				        x = '-59';
				        y = '-126';
				        break;
				    case 43:
				        x = '-53';
				        y = '-129';
				        break;
				    case 44:
				        x = '-46';
				        y = '-131';
				        break;
				    case 45:
				        x = '-39';
				        y = '-134';
				        break;
				    case 46:
				        x = '-32';
				        y = '-136';
				        break;
				    case 47:
				        x = '-25';
				        y = '-138';
				        break;
				    case 48:
				        x = '-18';
				        y = '-139';
				        break;
				    case 49:
				        x = '-11';
				        y = '-140';
				        break;
				    case 50:
				        x = '-3';
				        y = '-140';
				        break;
				    case 51:
				        x = '3';
				        y = '-139';
				        break;
				   	case 52:
				        x = '11';
				        y = '-139';
				        break;
				    case 53:
				        x = '19';
				        y = '-138';
				        break;
				    case 54:
				        x = '26';
				        y = '-136';
				        break;
				    case 55:
				        x = '33';
				        y = '-134';
				        break;
				    case 56:
				        x = '40';
				        y = '-133';
				        break;
				    case 57:
				        x = '46';
				        y = '-131';
				        break;
				    case 58:
				        x = '54';
				        y = '-128';
				        break;
				    case 59:
				        x = '60';
				        y = '-126';
				        break;
				    case 60:
				        x = '67';
				        y = '-122';
				        break;
				    case 61:
				        x = '73';
				        y = '-119';
				        break;
				    case 62:
				        x = '80';
				        y = '-115';
				        break;
				    case 63:
				        x = '85';
				        y = '-111';
				        break;
				    case 64:
				        x = '92';
				        y = '-106';
				        break;
				    case 65:
				        x = '97';
				        y = '-101';
				        break;
				    case 66:
				        x = '102';
				        y = '-97';
				        break;
				    case 67:
				        x = '106';
				        y = '-91';
				        break;
				    case 68:
				        x = '111';
				        y = '-86';
				        break;
				    case 69:
				        x = '115';
				        y = '-80';
				        break;
				    case 70:
				        x = '120';
				        y = '-74';
				        break;
				    case 71:
				        x = '123';
				        y = '-68';
				        break;
				    case 72:
				        x = '126';
				        y = '-61';
				        break;
				    case 73:
				        x = '129';
				        y = '-54';
				        break;
				    case 74:
				        x = '132';
				        y = '-48';
				        break;
				    case 75:
				        x = '134';
				        y = '-41';
				        break;
				    case 76:
				        x = '136';
				        y = '-34';
				        break;
				   	case 77:
				        x = '138';
				        y = '-27';
				        break;
				    case 78:
				        x = '139';
				        y = '-20';
				        break;
				    case 79:
				        x = '140';
				        y = '-13';
				        break;
				    case 80:
				        x = '140';
				        y = '-5';
				        break;
				    case 81:
				        x = '140';
				        y = '3';
				        break;
				    case 82:
				        x = '140';
				        y = '10';
				        break;
				    case 83:
				        x = '139';
				        y = '16';
				        break;
				   	case 84:
				        x = '138';
				        y = '24';
				        break;
				   	case 85:
				        x = '136';
				        y = '31';
				        break;
				    case 86:
				        x = '135';
				        y = '37';
				        break;
				    case 87:
				        x = '132';
				        y = '46';
				        break;
				    case 88:
				        x = '130';
				        y = '52';
				        break;
				    case 89:
				        x = '127';
				        y = '58';
				        break;
				    case 90:
				        x = '124';
				        y = '65';
				        break;
				    case 91:
				        x = '120';
				        y = '72';
				        break;
				    case 92:
				        x = '116';
				        y = '78';
				        break;
				    case 93:
				        x = '112';
				        y = '84';
				        break;
				    case 94:
				        x = '108';
				        y = '89';
				        break;
				    case 95:
				        x = '103';
				        y = '95';
				        break;
				    case 96:
				        x = '98';
				        y = '100';
				        break;
				    case 97:
				        x = '93';
				        y = '105';
				        break;
				    case 98:
				        x = '88';
				        y = '108';
				        break;
				    case 99:
				        x = '80';
				        y = '115';
				        break;
				    case 100:
				        x = '75';
				        y = '118';
				        break;    
				}

				var cssObj = {
					'-webkit-transform': 'translate('+x+'px, '+y+'px)',
					'-moz-transform': 'translate('+x+'px, '+y+'px)',
					'transform': 'translate('+x+'px, '+y+'px)'
				};

				scope.dial.css(cssObj);
			}

			//Apply track angle
			scope.trackAngle = scope.svgHoreshoe(415);
			scope.animateGraph();

			//Watch for changes to scope then apply score end angle
			scope.$watch(function(){
				scope.calcPerc();
				scope.positionDial();
			})
        }
    }
}])