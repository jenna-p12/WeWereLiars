// -------- Page Navigation --------
function showPage(pageId, event) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('.nav-btn');

    pages.forEach(page => page.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');

    // Find and activate the correct button
    const clickedButton = event ? event.currentTarget : document.querySelector(`button[onclick="showPage('${pageId}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------- Flashcard Flip --------
function flipCard(element) {
    element.classList.toggle('flipped');
}

// -------- Evidence Card Toggle --------
function toggleCard(element) {
    const detail = element.querySelector('.detail');
    if (detail) {
        const isShowing = detail.classList.contains('show');
        
        if (isShowing) {
            detail.style.maxHeight = '0';
            detail.classList.remove('show');
        } else {
            detail.classList.add('show');
            detail.style.maxHeight = detail.scrollHeight + 'px';
        }
    }
}

// -------- Scroll to Top Button --------
const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------- Memory Puzzle Drag and Drop --------
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDrop(e) {
    e.stopPropagation();
    
    if (draggedElement !== this) {
        // Swap the pieces
        const container = this.parentNode;
        const allPieces = Array.from(container.children).filter(el => el.classList.contains('puzzle-piece'));
        const draggedIndex = allPieces.indexOf(draggedElement);
        const targetIndex = allPieces.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
    }
    
    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    
    const pieces = document.querySelectorAll('.puzzle-piece');
    pieces.forEach(piece => {
        piece.classList.remove('correct', 'incorrect');
    });
}

function checkPuzzle() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const resultText = document.querySelector('.puzzle-result');
    let correct = true;
    
    pieces.forEach((piece, index) => {
        const correctOrder = parseInt(piece.getAttribute('data-order'));
        const currentOrder = index + 1;
        
        piece.classList.remove('correct', 'incorrect');
        
        if (correctOrder === currentOrder) {
            piece.classList.add('correct');
            piece.querySelector('.puzzle-number').textContent = currentOrder;
        } else {
            piece.classList.add('incorrect');
            piece.querySelector('.puzzle-number').textContent = '?';
            correct = false;
        }
    });
    
    if (correct) {
        resultText.textContent = '✓ Perfect! You\'ve reconstructed Cadence\'s memory timeline.';
        resultText.style.color = '#4caf50';
    } else {
        resultText.textContent = '✗ Not quite right. Try rearranging the fragments.';
        resultText.style.color = '#f44336';
    }
}

// -------- Initialize on Page Load --------
document.addEventListener('DOMContentLoaded', () => {
    // Make sure the home page is active on load
    showPage('home');
    
    // Initialize puzzle drag and drop
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    
    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragover', handleDragOver);
        piece.addEventListener('drop', handleDrop);
        piece.addEventListener('dragend', handleDragEnd);
    });
});
// -------- Shuffle Puzzle on Load --------
function shufflePuzzle() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    if (!puzzleGrid) return;
    
    const pieces = Array.from(puzzleGrid.querySelectorAll('.puzzle-piece'));
    
    // Fisher-Yates shuffle
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        puzzleGrid.appendChild(pieces[j]);
    }
}

// Update the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Make sure the home page is active on load
    showPage('home');
    
    // Shuffle puzzle on load
    shufflePuzzle();
    
    // Initialize puzzle drag and drop
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    
    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragover', handleDragOver);
        piece.addEventListener('drop', handleDrop);
        piece.addEventListener('dragend', handleDragEnd);
    });
});