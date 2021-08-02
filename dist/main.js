(()=>{var t={289:(t,e,s)=>{const i=s(507);t.exports=class extends i{constructor(t){super(t),this.notAttackedTiles=this.makeArrayOfTiles()}placeShips(){for(let t of Object.values(this.gameboard.ships)){let e=!1;for(;!e;){let s=this.generatePosition();this.randomRotation(t.id),e=this.gameboard.moveShip(t.id,s)}}}randomRotation(t){Math.random()<.5&&this.gameboard.ships[t].toggleOrientation()}generatePosition(){return Math.floor(100*Math.random())}setNextOutgoingAttack(){this.notAttackedTiles=this.shuffleArray(this.notAttackedTiles),this.nextOutgoingAttack=this.notAttackedTiles.pop()}shuffleArray(t){return t.sort(((t,e)=>.5-Math.random())),t}makeArrayOfTiles(){let t=[];for(let e=0;e<100;e++)t.push(e);return t}}},153:t=>{const e=document.getElementById("player2-name"),s=document.getElementById("player1-name");t.exports={setToOnePlayer:function(t){e.style.display="none",e.required=!1,t.number=1},setToTwoPlayers:function(t){e.style.display="block",e.required=!0,t.number=2},startGame:function(t,i){1===i.number?(t.addPlayer1("human",s.value),t.addPlayer2("computer","r2-d2"),t.player2.createShips(),t.player2.placeShips()):2===i.number&&(t.addPlayer1("human",s.value),t.addPlayer2("human",e.value)),t.relatePlayers(),t.startGame()}}},360:t=>{function e(t,e,s){if(0===t.getTiles().length){const e=document.getElementById(s);let i=function(t){let e=document.createElement("div");e.classList.add("out-of-board-ship");for(let s=0;s<t;s++){let i=document.createElement("div");i.classList.add("tile"),0===s?i.classList.add("ship-left"):s===t-1&&i.classList.add("ship-right"),e.appendChild(i)}return e}(t.length);i.draggable=!0,e.appendChild(i)}}t.exports={createBoard:function(t){const e=document.getElementById(t);for(let s=0;s<100;s++){let i=document.createElement("div");i.setAttribute("id",`${t}-${s}`),i.classList.add("tile"),e.appendChild(i)}},renderBoard:function(t,s,i,r){if("player"!==r&&"enemy"!==r)throw new Error("mode not valid, try with player or enemy");!function(t){document.getElementById(t).childNodes.forEach((t=>{t.classList="",t.classList.add("tile")}))}(s),"player"===r&&function(t,s,i){for(ship of Object.values(t.ships))e(ship,0,i)}(t,0,i)}}},417:(t,e,s)=>{const i=s(390),r=s(289);t.exports=class{constructor(){this.player1=null,this.player2=null,this.stage="preGame",this.winner=null}addPlayer1(t,e){if("human"===t)this.player1=new i(e);else{if("computer"!==t)throw new Error('type of player not valid. Must be "human" or "computer"');this.player1=new r(e)}}addPlayer2(t,e){if("human"===t)this.player2=new i(e);else{if("computer"!==t)throw new Error('type of player not valid. Must be "human" or "computer"');this.player2=new r(e)}}relatePlayers(){this.player1.setEnemy(this.player2),this.player2.setEnemy(this.player1)}getStage(){return this.stage}setStage(t){if(!["preGame","inGame","ended"].includes(t))throw new Error("stage is not a valid game stage");this.stage=t}getWinner(){return this.winner}startGame(){if("preGame"===this.getStage()){let t=this.player1.gameboard.getShips(),e=this.player2.gameboard.getShips();return!(!this.checkAllShipsPlaced(t)||!this.checkAllShipsPlaced(e)||(this.setStage("inGame"),0))}throw new Error("Game has already been started. Try to reset to start over")}checkAllShipsPlaced(t){for(let e of Object.values(t))if(0===e.getTiles().length)return!1;return!0}gameTurn(){if("inGame"!==this.getStage())throw new Error("cannot play if the game has not started");this.player1 instanceof i&&this.player2 instanceof r?(this.player1.play(),this.player2.setNextOutgoingAttack(),this.player2.play(),this.checkEndGame()):this.player1 instanceof r&&this.player2 instanceof i?(this.player1.setNextOutgoingAttack(),this.player1.play(),this.player2.play(),this.checkEndGame()):this.player1 instanceof r&&this.player2 instanceof r?(this.player1.setNextOutgoingAttack(),this.player1.play(),this.player2.setNextOutgoingAttack(),this.player2.play(),this.checkEndGame()):this.player1 instanceof i&&this.player2 instanceof i&&(this.player1.nextOutgoingAttack?this.player1.play():this.player2.nextOutgoingAttack&&(this.player2.play(),this.checkEndGame()))}checkEndGame(){(this.player1.gameboard.allShipsSank()||this.player2.gameboard.allShipsSank())&&(this.setStage("ended"),this.setWinner())}setWinner(){this.player1.gameboard.allShipsSank()&&this.player2.gameboard.allShipsSank()?this.winner="tie":this.player1.gameboard.allShipsSank()?this.winner=this.player2:this.player2.gameboard.allShipsSank()&&(this.winner=this.player1)}}},498:(t,e,s)=>{const i=s(643);t.exports=class{constructor(){this.ships={},this.tilesShooted={water:[],hit:[]}}addShip(t){let e=new i(t);return this.ships[e.getId()]=e,this.ships[e.getId()]}removeShip(t){delete this.ships[t]}getShips(){return this.ships}moveShip(t,e){let s=this.ships[t].getTiles();this.ships[t].setTiles(e);for(let e of Object.values(this.ships))if(e.getId()!==t&&this.shipsIntersects(e.getId(),t))return this.ships[t].setTiles(s),!1;return!0}shipsIntersects(t,e){let s=this.ships[t].getTiles(),i=this.ships[e].getTiles();for(let t of s)for(let e of i)if(t===e)return!0;return!1}rotateShip(t){if(0===this.ships[t].getTiles().length)throw new Error("Can't rotate ship outside the board");this.ships[t].toggleOrientation();let e=this.ships[t].getTiles();return this.moveShip(t,e[0])}receiveAttack(t){return!this.tilesShooted.water.includes(t)&&!this.tilesShooted.hit.includes(t)&&(this.shipHit(t)?this.tilesShooted.hit.push(t):this.tilesShooted.water.push(t),!0)}shipHit(t){let e=!1;for(let s of Object.values(this.ships))e=e||s.hit(t);return e}allShipsSank(){for(let t of Object.values(this.ships))if(!t.isSunk())return!1;return!0}}},390:(t,e,s)=>{const i=s(507);t.exports=class extends i{constructor(t){super(t)}setNextOutgoingAttack(t){this.nextOutgoingAttack=t}}},507:(t,e,s)=>{const i=s(498);t.exports=class{constructor(t){this.name=t,this.gameboard=new i,this.nextOutgoingAttack=null,this.enemy=null}createShips(){for(let t=2;t<6;t++)for(let e=1;e<7-t;e++)this.gameboard.addShip(t)}setNextOutgoingAttack(){return null}getNextOutgoingAttack(){return this.nextOutgoingAttack}setEnemy(t){this.enemy=t}getEnemy(){return this.enemy}deleteEnemy(){this.enemy=null}play(){let t=this.getNextOutgoingAttack();this.enemy.gameboard.receiveAttack(t),this.nextOutgoingAttack=null}}},643:t=>{class e{static currentId=-1;constructor(t){if(t<=0||6<=t)throw new Error("Ship length must be between 1 and 5");this.id=this.setId(),this.length=t,this.horizontal=!0,this.tiles=[],this.hits={}}setId(){return e.currentId++,e.currentId}getId(){return this.id}getTiles(){return this.tiles}setTiles(t){if(Number.isInteger(t)){if(t<0||t>99)throw new Error("position not valid");this.tiles=this.chooseTiles(t),this.generateHitsObject(this.tiles)}else if(Array.isArray(t)){if(0!==t.length&&this.length!==t.length)throw new Error("The number of tiles you're trying to assign does not match with the ship length");this.tiles=t}}chooseTiles(t){let e=[];if(this.horizontal){const s=Math.floor(t/10);let i=0,r=1;for(;i<this.length;)Math.floor((t+i)/10)===s?e.push(t+i):(e.push(t-r),r++),i++}else{let s=0,i=1;for(;s<this.length;)t+10*s<100?e.push(t+10*s):(e.push(t-10*i),i++),s++}return e.sort(((t,e)=>t-e)),e}generateHitsObject(t){this.hits={},t.forEach((t=>this.hits[t]=!1))}isHorizontal(){return this.horizontal}toggleOrientation(){this.horizontal=!this.horizontal}hit(t){return t in this.hits&&(this.hits[t]=!0,!0)}getHits(){return this.hits}isSunk(){for(let t of Object.values(this.hits))if(!t)return!1;return!0}}t.exports=e}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var a=e[i]={exports:{}};return t[i](a,a.exports,s),a.exports}(()=>{const t=s(417),e=s(360),i=s(153);let r={number:1},a=new t;const n=document.getElementById("1player"),h=document.getElementById("2players"),l=document.getElementById("player-names"),o=document.getElementById("pre-game-settings");n.addEventListener("click",(t=>{t.preventDefault(),i.setToOnePlayer(r)})),h.addEventListener("click",(t=>{t.preventDefault(),i.setToTwoPlayers(r)})),l.addEventListener("submit",(t=>{t.preventDefault(),i.startGame(a,r),e.createBoard("P1Board"),e.createBoard("P1enemyBoard"),a.player1.createShips(),e.renderBoard(a.player1.gameboard,"P1Board","ship-container","player"),o.style.display="none"})),document.getElementById("placing-finished").addEventListener("click",(()=>{console.log(a)}))})()})();
//# sourceMappingURL=main.js.map