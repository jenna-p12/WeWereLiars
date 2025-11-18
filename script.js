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

// -------- Initialize on Page Load --------
document.addEventListener('DOMContentLoaded', () => {
    // Make sure the home page is active on load
    showPage('home');
});