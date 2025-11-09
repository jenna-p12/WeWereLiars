function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    var buttons = document.querySelectorAll('.nav-btn');
    
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }
    
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    document.getElementById(pageId).classList.add('active');
    event.target.classList.add('active');
}

function toggleCard(element) {
    var detail = element.querySelector('.detail');
    
    if (detail.classList.contains('show')) {
        detail.classList.remove('show');
    } else {
        detail.classList.add('show');
    }
}