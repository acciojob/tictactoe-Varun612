const formEl=document.getElementById('player-form')
const gameEl=document.getElementById('game-board')
const startBtn=document.getElementById('submit')
const messageEl =document.getElementById('message')
const cells =Array.from(document.querySelectorAll('.cell'))

let players=[]
let turn=0
let board=Array(9).fill('')
const winCombos = [
	[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[1,4,7],[0,3,6],[2,5,8]
]
startBtn.addEventListener('click',(event)=> {
	event.preventDefault()
	const p1=document.getElementById('player1').value.trim()
	const p2=document.getElementById('player2').value.trim()
	if(!p1 || !p2) return;
	players=[p1,p2];
	formEl.classList.add('hidden');
	gameEl.classList.remove('hidden');
	updateMessage()
})
cells.forEach((cell,idx) => {
	cell.addEventListener('click',() => {
		if(board[idx] || checkWinner()) return;
		board[idx] = turn ===0? 'x':'o'
		cell.textContent= board[idx]
		const winnerCombo = checkWinner()
			 if(winnerCombo) {
				 winnerCombo.forEach(i => cells[i].style.backgroundColor = 'purple')
				 messageEl.textContent=`${players[turn]} congratulations you won!`
			 }
		else if(board.every(v=>v)) {
			messageEl.textContent = `Draw!`
		}
		else {
			turn=1-turn
			updateMessage()
		}
	})
})
function updateMessage() {
	messageEl.textContent = `${players[turn]}, you're up`
}
function checkWinner() {
	for(let combo of winCombos) {
		const [a,b,c] = combo
		if(board[a] && board[a] === board[b] && board[a] === board[c])
			return combo
	}
	return null
}

