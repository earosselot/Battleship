(()=>{var t={289:(t,e,s)=>{const i=s(507);t.exports=class extends i{constructor(t){super(t),this.tiles=this.makeArrayOfTiles()}placeShips(){for(let t of Object.values(this.gameboard.ships)){let e=!1;for(;!e;){let s=this.generatePosition();this.randomRotation(t.id),e=this.gameboard.placeShip(t.id,s)}}}randomRotation(t){Math.random()<.5&&this.gameboard.ships[t].rotate()}generatePosition(){return Math.floor(100*Math.random())}setNextOutgoingAttack(){this.tiles=this.shuffleArray(this.tiles),this.nextOutgoingAttack=this.tiles.pop()}shuffleArray(t){return t.sort(((t,e)=>.5-Math.random())),t}makeArrayOfTiles(){let t=[];for(let e=0;e<100;e++)t.push(e);return t}}},998:t=>{function e(t,e){for(tileId of t.tilesShoted.water)document.getElementById(`${e}-${tileId}`).classList.add("tile-water")}function s(t,e){for(tileId of t.tilesShoted.hit)document.getElementById(`${e}-${tileId}`).classList.add("tile-hit")}t.exports={createBoard:function(t){const e=document.getElementById(t);for(let s=0;s<100;s++){let i=document.createElement("div");i.setAttribute("id",`${t}-${s}`),i.classList.add("tile"),e.appendChild(i)}},renderPlayerBoard:function(t,i){!function(t,e){for(tileId of Object.keys(t.tilesWithShips))document.getElementById(`${e}-${tileId}`).classList.add("tile-ship")}(t,i),e(t,i),s(t,i)},renderEnemyBoard:function(t,i){e(t,i),s(t,i)}}},417:(t,e,s)=>{const i=s(390),r=s(289);t.exports=class{constructor(t,e,s,i){this.player1=this.createPlayer(t,e),this.player2=this.createPlayer(s,i),this.relatePlayers()}createPlayer(t,e){if("human"===t)return new i(e);if("computer"===t)return new r(e);throw new Error('type of player not valid. Must be "human" or "computer"')}relatePlayers(){this.player1.setEnemy(this.player2),this.player2.setEnemy(this.player1)}}},498:(t,e,s)=>{const i=s(643);t.exports=class{constructor(){this.ships={},this.tilesWithShips={},this.tilesShoted={water:[],hit:[]}}addShip(t){let e=new i(t);return this.ships[e.getId()]=e,this.ships[e.getId()]}placeShip(t,e){let s=this.ships[t].setPosition(e),i={};for(const e of s){if(e in this.tilesWithShips)return!1;i[e]=t}return this.tilesWithShips={...this.tilesWithShips,...i},!0}receiveAttack(t){if(this.tilesShoted.water.includes(t)||this.tilesShoted.hit.includes(t))return!1;if(t in this.tilesWithShips){const e=this.tilesWithShips[t];return this.ships[e].hit(),this.tilesShoted.hit.push(t),!0}return this.tilesShoted.water.push(t),!0}allShipsSank(){for(const t of Object.values(this.ships))if(!t.isSunk())return!1;return!0}}},390:(t,e,s)=>{const i=s(507);t.exports=class extends i{constructor(t){super(t)}placeShips(){return null}setNextOutgoingAttack(t){this.nextOutgoingAttack=t}}},507:(t,e,s)=>{const i=s(498);t.exports=class{constructor(t){this.name=t,this.gameboard=new i,this.nextOutgoingAttack=null,this.enemy=null}createShips(){for(let t=2;t<6;t++)for(let e=1;e<7-t;e++)this.gameboard.addShip(t)}placeShips(){return null}setNextOutgoingAttack(){return null}getNextOutgoingAttack(){return this.nextOutgoingAttack}setEnemy(t){this.enemy=t}getEnemy(){return this.enemy}deleteEnemy(){this.enemy=null}play(){let t=this.getNextOutgoingAttack();this.enemy.gameboard.receiveAttack(t),this.nextOutgoingAttack=null}}},643:t=>{class e{static currentId=-1;constructor(t){if(t<=0||6<=t)throw new Error("Ship length must be between 1 and 5");this.id=this.setId(),this.length=t,this.hits=0,this.sunk=!1,this.horizontal=!0,this.position=-1}setId(){return e.currentId++,e.currentId}getId(){return this.id}hit(){return this.hits+=1,this}isSunk(){return this.hits===this.length?(this.sunk=!0,this.sunk):this.sunk}setPosition(t){if(t<0||t>99)throw new Error("position not valid");return this.position=t,this.setTiles()}setTiles(){let t=[];if(this.horizontal){const e=Math.floor(this.position/10);let s=0,i=1;for(;s<this.length;)Math.floor((this.position+s)/10)===e?t.push(this.position+s):(t.push(this.position-i),i++),s++}else{let e=0,s=1;for(;e<this.length;)this.position+10*e<100?t.push(this.position+10*e):(t.push(this.position-10*s),s++),e++}return t}rotate(){this.horizontal=!this.horizontal,this.setTiles()}}t.exports=e}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,s),n.exports}(()=>{const t=s(417),e=s(998);function i(t){let s=t.path[0].id.split("-")[1];r.player1.setNextOutgoingAttack(s),r.player1.play(),r.player2.setNextOutgoingAttack(),r.player2.play(),e.renderPlayerBoard(r.player1.gameboard,"P1Board"),e.renderEnemyBoard(r.player1.enemy.gameboard,"P1enemyBoard"),r.player1.gameboard.allShipsSank()&&r.player2.gameboard.allShipsSank()?console.log("tie"):r.player2.gameboard.allShipsSank()?console.log("player1 win"):r.player1.gameboard.allShipsSank()&&console.log("player2 win"),this.removeEventListener("click",i)}e.createBoard("P1Board"),e.createBoard("P1enemyBoard"),document.getElementById("P1enemyBoard").childNodes.forEach((t=>{t.addEventListener("click",i)}));const r=new t("human","human1","computer","cpu2");r.player1.createShips(),r.player1.placeShips(),r.player2.createShips(),r.player2.placeShips()})()})();
//# sourceMappingURL=main.js.map