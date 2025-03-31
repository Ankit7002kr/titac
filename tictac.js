document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const result = document.getElementById("result");
    const turnDisplay = document.getElementById("turn");
    const grid = document.getElementById("grid");

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let gameOver = false;
    let againstComputer = false;
    
    function checkWinner() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameOver = true;
                result.innerText = `${board[a]} Wins!`;
                result.style.fontSize = "2rem";
                result.style.fontWeight = "bold";
                result.style.textAlign = "center";
                result.style.marginTop = "20px";
                result.style.display = "block";
                return;
            }
        }
        if (!board.includes(null)) {
            gameOver = true;
            result.innerText = "It's a Draw!";
            result.style.fontSize = "2rem";
            result.style.fontWeight = "bold";
            result.style.textAlign = "center";
            result.style.marginTop = "20px";
            result.style.display = "block";
        }
    }

    function computerMove() {
        if (gameOver) return;
        let availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (availableMoves.length > 0) {
            let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            board[move] = "O";
            boxes[move].innerText = "O";
            checkWinner();
            currentPlayer = "X";
            turnDisplay.innerText = "X's Turn";
        }
    }

    function handleMove(index) {
        if (board[index] || gameOver) return;
        board[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        checkWinner();
        
        if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnDisplay.innerText = `${currentPlayer}'s Turn`;
            if (againstComputer && currentPlayer === "O") {
                setTimeout(computerMove, 500);
            }
        }
    }

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => handleMove(index));
    });

    function resetGame() {
        board.fill(null);
        gameOver = false;
        result.innerText = "";
        result.style.display = "none";
        boxes.forEach(box => box.innerText = "");
        currentPlayer = "X";
        turnDisplay.innerText = "X's Turn";
    }

    document.getElementById("computer").addEventListener("click", () => {
        againstComputer = true;
        resetGame();
    });

    document.getElementById("other").addEventListener("click", () => {
        againstComputer = false;
        resetGame();
    });

    function adjustLayout() {
        const screenWidth = window.innerWidth;
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(3, 1fr)";
        grid.style.gap = "5px";
        grid.style.width = "min(90vw, 350px)";
        grid.style.height = grid.style.width;
        grid.style.margin = "0 auto";
        
        boxes.forEach(box => {
            box.style.width = "100%";
            box.style.height = "100%";
            box.style.fontSize = screenWidth > 768 ? "2.5rem" : screenWidth > 500 ? "2rem" : "1.5rem";
        });
    }

    window.addEventListener("resize", adjustLayout);
    adjustLayout();
});