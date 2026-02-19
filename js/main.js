// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    
    // Set color based on type
    if (type === 'success') {
        toast.style.background = 'var(--gold)';
        toast.style.color = 'var(--black)';
    } else if (type === 'error') {
        toast.style.background = '#ff4444';
        toast.style.color = 'white';
    } else {
        toast.style.background = 'var(--gold)';
        toast.style.color = 'var(--black)';
    }
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ===== ACTIVE LINK ON SCROLL =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('show');
});

// ===== CLOSE MODALS WITH ESC KEY =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// ===== PREVENT BODY SCROLL WHEN MODAL OPEN =====
const modalObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.style.display === 'block') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modalObserver.observe(modal, { attributes: true, attributeFilter: ['style'] });
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Tutor Connect - Black & Gold Edition loaded!');
});