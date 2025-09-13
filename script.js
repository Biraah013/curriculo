// JavaScript para funcionalidades interativas do currículo
// Autor: Ubiratã Oliveira dos Santos

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveFeatures();
    initializeAnimations();
    initializeScrollEffects();
    loadSavedTheme();
    loadSavedLanguage();
});

// Inicializa todas as funcionalidades interativas
function initializeInteractiveFeatures() {
    // Adiciona event listeners para botões flutuantes
    const floatingContactBtn = document.getElementById('contactBtn');
    if (floatingContactBtn) {
        floatingContactBtn.addEventListener('click', openContactModal);
    }
    
    // Verifica se as bibliotecas de PDF estão carregadas
    setTimeout(() => {
        if (!window.jspdf || !window.html2canvas) {
            console.warn('Bibliotecas de PDF não carregadas. Usando fallback de impressão.');
        }
    }, 3000);

    // Adiciona event listeners para fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeContactModal();
            closeResumeBuilder();
            closePreview();
        }
    });

    // Fecha modal ao clicar fora dele
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeContactModal();
            }
        });
    }

    // Adiciona efeitos de hover aos cards
    addHoverEffects();
}

// Abre o modal de contato
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.classList.add('modal-open');
        const contactAvatar = document.querySelector('.contact-avatar');
        if (contactAvatar) {
            contactAvatar.classList.add('avatar-animate');
        }
        document.documentElement.style.overflow = 'hidden'; // mobile fix
        animateContactOptions();
    }
}

// Fecha o modal de contato
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('modal-open');
        const contactAvatar = document.querySelector('.contact-avatar');
        if (contactAvatar) {
            contactAvatar.classList.remove('avatar-animate');
        }
        document.documentElement.style.overflow = 'auto'; // mobile fix
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
        }, 300);
    }
}

// Anima as opções de contato sequencialmente
function animateContactOptions() {
    const contactOptions = document.querySelectorAll('.contact-option');
    contactOptions.forEach((option, index) => {
        setTimeout(() => {
            option.classList.add('option-animate');
        }, index * 150);
    });
}

// Adiciona efeitos de hover aos cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.education-item, .experience-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Inicializa animações
function initializeAnimations() {
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
    
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    const floatingBtn = document.querySelector('.floating-contact-btn');
    if (floatingBtn) {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.transform = 'scale(0) rotate(180deg)';
        setTimeout(() => {
            floatingBtn.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            floatingBtn.style.opacity = '1';
            floatingBtn.style.transform = 'scale(1) rotate(0deg)';
        }, 1000);
    }
}

// Efeitos de scroll
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const floatingBtn = document.querySelector('.floating-contact-btn');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        if (header) {
            const parallaxSpeed = scrollTop * 0.3;
            header.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        if (floatingBtn) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                floatingBtn.style.transform = 'translateY(100px)';
            } else {
                floatingBtn.style.transform = 'translateY(0)';
            }
        }
        lastScrollTop = scrollTop;
    });
}

// --------- MODAL CURRÍCULO (fix para mobile) ---------
function openResumeBuilder() {
    const modal = document.getElementById('resumeBuilderModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.classList.add('modal-open');
        document.documentElement.style.overflow = 'hidden'; // fix mobile scroll
    }
}

function closeResumeBuilder() {
    const modal = document.getElementById('resumeBuilderModal');
    if (modal) {
        modal.classList.remove('modal-open');
        document.documentElement.style.overflow = 'auto'; // fix mobile scroll
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
        }, 300);
    }
}

// --------- DOWNLOAD PDF ---------
function downloadGeneratedResume() {
    const resumePreview = document.getElementById('resumePreview');
    if (!resumePreview) return;

    if (!window.jspdf || !window.html2canvas) {
        alert("Bibliotecas de PDF não carregadas. Tente pelo botão Imprimir.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const element = resumePreview;

    html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 10;
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

        pdf.save('curriculo.pdf');
    });
}

// --------- (resto do seu código: coleta dados, gera HTML, etc) ---------
// Não alterei a parte do generateResumeHTML, só o download e o modal.
// Continue usando suas funções de generateResume, generateModernHTML, etc.
