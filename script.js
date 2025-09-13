// JavaScript para funcionalidades interativas do currículo
// Autor: Ubiratã Oliveira dos Santos

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveFeatures();
    initializeAnimations();
    initializeScrollEffects();
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

// Abre o modal de contato com animação
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'flex';
        // Força reflow para aplicar a animação
        modal.offsetHeight;
        modal.classList.add('modal-open');
        
        // Adiciona classe para animação da imagem
        const contactAvatar = document.querySelector('.contact-avatar');
        if (contactAvatar) {
            contactAvatar.classList.add('avatar-animate');
        }
        
        // Impede scroll do body
        document.body.style.overflow = 'hidden';
        
        // Adiciona animação sequencial para opções de contato
        animateContactOptions();
    }
}

// Fecha o modal de contato
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('modal-open');
        
        // Remove animação da imagem
        const contactAvatar = document.querySelector('.contact-avatar');
        if (contactAvatar) {
            contactAvatar.classList.remove('avatar-animate');
        }
        
        // Restaura scroll do body
        document.body.style.overflow = 'auto';
        
        // Remove modal após animação
        setTimeout(() => {
            modal.style.display = 'none';
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

// Inicializa animações de entrada
function initializeAnimations() {
    // Animação para o header
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
    
    // Animação para seções
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
    
    // Animação para botão flutuante
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

// Inicializa efeitos de scroll
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const floatingBtn = document.querySelector('.floating-contact-btn');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efeito de parallax sutil no header
        const header = document.querySelector('.header');
        if (header) {
            const parallaxSpeed = scrollTop * 0.3;
            header.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        // Esconde/mostra botão flutuante baseado na direção do scroll
        if (floatingBtn) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling para baixo
                floatingBtn.style.transform = 'translateY(100px)';
            } else {
                // Scrolling para cima
                floatingBtn.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// Adiciona efeito de digitação ao nome
function typewriterEffect() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
}

// Adiciona efeito de loading aos botões
function addButtonLoadingEffect() {
    const buttons = document.querySelectorAll('.contact-action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Carregando...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 1000);
        });
    });
}

// Funcionalidade de impressão personalizada
function customPrint() {
    // Esconde elementos que não devem aparecer na impressão
    const elementsToHide = document.querySelectorAll('.floating-contact-btn, .header-actions');
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });
    
    // Executa a impressão
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'curriculo.pdf';
    link.click();
    
    
    // Restaura elementos após impressão
    setTimeout(() => {
        elementsToHide.forEach(element => {
            element.style.display = '';
        });
    }, 1000);
}

// Adiciona evento para detectar quando usuário está pronto para imprimir
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Funcionalidade de tema (para futuras implementações)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Carrega tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Funções de PDF removidas - apenas gerador de currículos disponível


// Função alternativa para download em PDF (mais avançada)
function downloadPDFAdvanced() {
    // Verifica se as bibliotecas estão carregadas
    if (!window.jspdf || !window.html2canvas) {
        console.log('Bibliotecas não carregadas, usando impressão simples');
        
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'curriculo.pdf';
    link.click();
    
        return;
    }
    
    console.log('Iniciando download PDF avançado...');
    
    const { jsPDF } = window.jspdf;
    
    // Mostra feedback ao usuário
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';
        downloadBtn.disabled = true;
        
        // Restaura botão após 5 segundos (backup)
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 5000);
    }
    
    // Esconde elementos não desejados
    const elementsToHide = document.querySelectorAll('.floating-contact-btn, .header-actions');
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });
    
    // Espera um pouco para elementos serem escondidos
    setTimeout(() => {
        html2canvas(document.querySelector('.container'), {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            try {
                const doc = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 190;
                const pageHeight = 287;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                
                let position = 10;
                
                doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight + 10;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                
                doc.save('curriculo-ubirata-oliveira.pdf');
                console.log('PDF gerado com sucesso!');
                
            } catch (error) {
                console.error('Erro ao gerar PDF:', error);
                alert('Erro ao gerar PDF. Usando impressão do navegador...');
                
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'curriculo.pdf';
    link.click();
    
            }
            
            // Restaura elementos escondidos
            elementsToHide.forEach(element => {
                element.style.display = '';
            });
            
            // Restaura botão
            if (downloadBtn) {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }
            
        }).catch(error => {
            console.error('Erro ao capturar imagem:', error);
            alert('Erro ao capturar página. Usando impressão do navegador...');
            
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'curriculo.pdf';
    link.click();
    
            
            // Restaura elementos escondidos
            elementsToHide.forEach(element => {
                element.style.display = '';
            });
            
            // Restaura botão
            if (downloadBtn) {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }
        });
    }, 100);
}

// Resume Builder Functions
function openResumeBuilder() {
    const modal = document.getElementById('resumeBuilderModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.offsetHeight;
        modal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeBuilder() {
    const modal = document.getElementById('resumeBuilderModal');
    if (modal) {
        modal.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Curso</label>
                <input type="text" name="course" required>
            </div>
            <div class="form-group">
                <label>Ano</label>
                <input type="number" name="year" min="1950" max="2030" required>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeEntry(this)">
            <i class="fas fa-times"></i> Remover
        </button>
    `;
    container.appendChild(newEntry);
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Cargo</label>
                <input type="text" name="position" required>
            </div>
            <div class="form-group">
                <label>Empresa</label>
                <input type="text" name="company" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Duração</label>
                <input type="text" name="duration" required>
            </div>
        </div>
        <div class="form-group">
            <label>Descrição das Funções</label>
            <textarea name="description" rows="3" required></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeEntry(this)">
            <i class="fas fa-times"></i> Remover
        </button>
    `;
    container.appendChild(newEntry);
}

function removeEntry(button) {
    button.parentElement.remove();
}

function previewResume() {
    collectFormData().then(formData => {
        if (!formData) return;
        
        const resumeHtml = generateResumeHTML(formData);
        
        const previewModal = document.getElementById('resumePreviewModal');
        const previewContainer = document.getElementById('resumePreview');
        
        previewContainer.innerHTML = resumeHtml;
        
        previewModal.style.display = 'flex';
        previewModal.offsetHeight;
        previewModal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    });
}

function closePreview() {
    const modal = document.getElementById('resumePreviewModal');
    if (modal) {
        modal.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function editResume() {
    closePreview();
    // O formulário já está preenchido, não precisa fazer nada
}

function generateResume() {
    collectFormData().then(formData => {
        if (!formData) return;
        
        const resumeHtml = generateResumeHTML(formData);
        
        // Usar impressão do navegador com verificação de bloqueio
        try {
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                // Popup bloqueado, usar método alternativo
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = resumeHtml;
                tempDiv.style.position = 'fixed';
                tempDiv.style.top = '0';
                tempDiv.style.left = '0';
                tempDiv.style.width = '100%';
                tempDiv.style.height = '100%';
                tempDiv.style.background = 'white';
                tempDiv.style.zIndex = '9999';
                tempDiv.style.padding = '20px';
                tempDiv.style.overflow = 'auto';
                
                // Adicionar botão para fechar e imprimir
                const buttonContainer = document.createElement('div');
                buttonContainer.style.position = 'fixed';
                buttonContainer.style.top = '10px';
                buttonContainer.style.right = '10px';
                buttonContainer.style.zIndex = '10000';
                buttonContainer.innerHTML = `
                    <button onclick="window.print()" style="margin-right: 10px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Imprimir</button>
                    <button onclick="this.parentElement.parentElement.remove()" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Fechar</button>
                `;
                
                tempDiv.appendChild(buttonContainer);
                document.body.appendChild(tempDiv);
                
                alert('Popup bloqueado! Usando visualização alternativa. Clique em "Imprimir" para salvar como PDF.');
            } else {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Currículo - ${formData.fullName}</title>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                        <style>
                            * { margin: 0; padding: 0; box-sizing: border-box; }
                            body { font-family: 'Inter', sans-serif; }
                            @media print { 
                                body { -webkit-print-color-adjust: exact; }
                                .no-print { display: none !important; }
                            }
                        </style>
                    </head>
                    <body>
                        ${resumeHtml}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 1000);
            }
        } catch (error) {
            console.error('Erro na impressão:', error);
            alert('Erro ao abrir janela de impressão. Tente novamente ou permita popups para este site.');
        }
        
        // Fecha o modal
        closeResumeBuilder();
    });
}

function downloadGeneratedResume() {
    const resumePreview = document.getElementById('resumePreview');
    if (!resumePreview) return;
    
    const resumeContent = resumePreview.innerHTML;
    
    // Usar impressão do navegador com verificação de bloqueio
    try {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            // Popup bloqueado, usar método alternativo
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = resumeContent;
            tempDiv.style.position = 'fixed';
            tempDiv.style.top = '0';
            tempDiv.style.left = '0';
            tempDiv.style.width = '100%';
            tempDiv.style.height = '100%';
            tempDiv.style.background = 'white';
            tempDiv.style.zIndex = '9999';
            tempDiv.style.padding = '20px';
            tempDiv.style.overflow = 'auto';
            
            // Adicionar botão para fechar e imprimir
            const buttonContainer = document.createElement('div');
            buttonContainer.style.position = 'fixed';
            buttonContainer.style.top = '10px';
            buttonContainer.style.right = '10px';
            buttonContainer.style.zIndex = '10000';
            buttonContainer.innerHTML = `
                <button onclick="window.print()" style="margin-right: 10px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Imprimir</button>
                <button onclick="this.parentElement.parentElement.remove()" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Fechar</button>
            `;
            
            tempDiv.appendChild(buttonContainer);
            document.body.appendChild(tempDiv);
            
            alert('Popup bloqueado! Usando visualização alternativa. Clique em "Imprimir" para salvar como PDF.');
        } else {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Meu Currículo Personalizado</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Inter', sans-serif; }
                        @media print { 
                            body { -webkit-print-color-adjust: exact; }
                            .no-print { display: none !important; }
                        }
                    </style>
                </head>
                <body>
                    ${resumeContent}
                </body>
                </html>
            `);
            printWindow.document.close();
            
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 1000);
        }
    } catch (error) {
        console.error('Erro na impressão:', error);
        alert('Erro ao abrir janela de impressão. Tente novamente ou permita popups para este site.');
    }
    
    closePreview();
}

// Função para preview da foto
function previewPhoto(input) {
    const preview = document.getElementById('photoPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview da foto">`;
        };
        
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = '<div class="no-photo">Nenhuma foto selecionada</div>';
    }
}

// Variável global para idioma atual
let currentLanguage = 'pt';

// Função para mudança de idioma
function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;
    currentLanguage = selectedLanguage;
    
    // Atualizar todos os elementos com data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Atualizar opções do select de templates
    const templateSelect = document.getElementById('resumeTemplate');
    templateSelect.querySelectorAll('option').forEach(option => {
        const key = option.getAttribute('data-translate');
        if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
            option.textContent = translations[currentLanguage][key];
        }
    });
    
    // Atualizar preview do template
    updateTemplatePreview();
    
    // Salvar idioma no localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Função para atualizar preview do template
function updateTemplatePreview() {
    const selectedTemplate = document.getElementById('resumeTemplate').value;
    const templateImage = document.getElementById('templateImage');
    const templateDescription = document.getElementById('templateDescription');
    
    // Usar as imagens SVG reais dos templates
    if (templatePreviews[selectedTemplate]) {
        templateImage.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(templatePreviews[selectedTemplate]);
        templateImage.alt = `Preview do modelo ${selectedTemplate}`;
    }
    
    // Atualizar descrição com base no idioma atual
    const descriptionKeys = {
        modern: 'modern_description',
        europass: 'europass_description',
        classic: 'classic_description',
        minimalist: 'minimalist_description'
    };
    
    const descriptionKey = descriptionKeys[selectedTemplate];
    if (descriptionKey && translations[currentLanguage] && translations[currentLanguage][descriptionKey]) {
        templateDescription.textContent = translations[currentLanguage][descriptionKey];
    }
}

function collectFormData() {
    return new Promise((resolve) => {
        const form = document.getElementById('resumeForm');
        const formData = new FormData(form);
        
        const data = {
            fullName: document.getElementById('fullName').value,
            birthDate: document.getElementById('birthDate').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            objective: document.getElementById('objective').value,
            photo: null,
            template: document.getElementById('resumeTemplate').value,
            education: [],
            experience: []
        };
        
        // Coleta a foto se houver
        const photoInput = document.getElementById('profilePhoto');
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                data.photo = e.target.result;
                continueCollecting();
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            continueCollecting();
        }
        
        function continueCollecting() {
            // Validação básica
            if (!data.fullName || !data.birthDate || !data.city || !data.email) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                resolve(null);
                return;
            }
            
            // Coletar educação
            const educationEntries = document.querySelectorAll('.education-entry');
            educationEntries.forEach(entry => {
                const course = entry.querySelector('input[name="course"]').value;
                const year = entry.querySelector('input[name="year"]').value;
                if (course && year) {
                    data.education.push({ course, year });
                }
            });
            
            // Coletar experiência
            const experienceEntries = document.querySelectorAll('.experience-entry');
            experienceEntries.forEach(entry => {
                const position = entry.querySelector('input[name="position"]').value;
                const company = entry.querySelector('input[name="company"]').value;
                const duration = entry.querySelector('input[name="duration"]').value;
                const description = entry.querySelector('textarea[name="description"]').value;
                if (position && company && duration && description) {
                    data.experience.push({ position, company, duration, description });
                }
            });
            
            resolve(data);
        }
    });
}

function generateResumeHTML(data) {
    const selectedTemplate = data.template || 'modern';
    
    switch(selectedTemplate) {
        case 'europass':
            return generateEuropassHTML(data);
        case 'classic':
            return generateClassicHTML(data);
        case 'minimalist':
            return generateMinimalistHTML(data);
        default:
            return generateModernHTML(data);
    }
}

function generateModernHTML(data) {
    const birthDate = new Date(data.birthDate);
    const formattedDate = birthDate.toLocaleDateString('pt-PT');
    
    const photoSection = data.photo ? `
        <div class="profile-photo" style="flex-shrink: 0;">
            <img src="${data.photo}" alt="Foto de ${data.fullName}" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid rgba(255, 255, 255, 0.2); object-fit: cover; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
        </div>
    ` : '';
    
    return `
        <div class="container" style="max-width: 800px; margin: 0 auto; background: white; min-height: auto;">
            <header class="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; text-align: center;">
                <div class="header-content" style="max-width: 600px; margin: 0 auto;">
                    <div class="profile-section" style="display: flex; align-items: center; gap: 2rem; text-align: left;">
                        ${photoSection}
                        <div class="profile-info" style="flex: 1;">
                            <h1 class="name" style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">${data.fullName}</h1>
                            <div class="contact-info" style="display: flex; gap: 2rem; flex-wrap: wrap;">
                                <div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; opacity: 0.95;">
                                    <i class="fas fa-calendar-alt" style="font-size: 1rem; opacity: 0.8;"></i>
                                    <span>${formattedDate}</span>
                                </div>
                                <div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; opacity: 0.95;">
                                    <i class="fas fa-map-marker-alt" style="font-size: 1rem; opacity: 0.8;"></i>
                                    <span>${data.city}</span>
                                </div>
                                <div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; opacity: 0.95;">
                                    <i class="fas fa-envelope" style="font-size: 1rem; opacity: 0.8;"></i>
                                    <span>${data.email}</span>
                                </div>
                                ${data.phone ? `<div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; opacity: 0.95;">
                                    <i class="fas fa-phone" style="font-size: 1rem; opacity: 0.8;"></i>
                                    <span>${data.phone}</span>
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main class="main-content" style="padding: 2rem;">
                <section class="section" style="margin-bottom: 3rem;">
                    <h2 class="section-title" style="font-size: 1.5rem; font-weight: 600; color: #2d3748; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-graduation-cap" style="color: #667eea; font-size: 1.25rem;"></i>
                        Formação Académica e Cursos
                    </h2>
                    <div class="section-content" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        ${data.education.map(edu => `
                            <div class="education-item" style="background-color: #f7fafc; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #667eea;">
                                <div class="education-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                                    <h3 class="course-title" style="font-size: 1.1rem; font-weight: 600; color: #2d3748;">${edu.course}</h3>
                                    <span class="year" style="background-color: #667eea; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500;">${edu.year}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="section" style="margin-bottom: 3rem;">
                    <h2 class="section-title" style="font-size: 1.5rem; font-weight: 600; color: #2d3748; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-briefcase" style="color: #667eea; font-size: 1.25rem;"></i>
                        Experiência Profissional
                    </h2>
                    <div class="section-content" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        ${data.experience.map(exp => `
                            <div class="experience-item" style="background-color: #f7fafc; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #48bb78;">
                                <div class="experience-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                                    <div class="job-info" style="flex: 1;">
                                        <h3 class="job-title" style="font-size: 1.1rem; font-weight: 600; color: #2d3748; margin-bottom: 0.25rem;">${exp.position}</h3>
                                        <h4 class="company" style="font-size: 1rem; font-weight: 500; color: #48bb78;">${exp.company}</h4>
                                    </div>
                                    <span class="duration" style="background-color: #48bb78; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500; white-space: nowrap;">${exp.duration}</span>
                                </div>
                                <div class="job-description" style="color: #4a5568; line-height: 1.7;">
                                    <p style="margin-bottom: 0.5rem;"><strong style="color: #2d3748;">Funções:</strong> ${exp.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </main>

            <footer class="footer" style="background-color: #2d3748; color: white; text-align: center; padding: 1.5rem; margin-top: 2rem;">
                <p style="font-size: 0.875rem; opacity: 0.8;">&copy; 2025 ${data.fullName}</p>
            </footer>
        </div>
    `;
}

function generateEuropassHTML(data) {
    const birthDate = new Date(data.birthDate);
    const formattedDate = birthDate.toLocaleDateString('pt-PT');
    
    const photoSection = data.photo ? `
        <div class="europass-photo" style="position: absolute; top: 20px; right: 20px; width: 100px; height: 120px; border: 2px solid #0066cc;">
            <img src="${data.photo}" alt="Foto de ${data.fullName}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
    ` : '';
    
    return `
        <div class="europass-container" style="max-width: 800px; margin: 0 auto; background: white; font-family: Arial, sans-serif; position: relative; padding: 20px;">
            ${photoSection}
            
            <div class="europass-header" style="border-bottom: 3px solid #0066cc; padding-bottom: 10px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width: 60px; height: 60px; background: #0066cc; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #0066cc; font-weight: bold; font-size: 20px;">E</span>
                        </div>
                    </div>
                    <div>
                        <h1 style="color: #0066cc; font-size: 24px; font-weight: bold; margin: 0;">Europass</h1>
                        <p style="color: #666; font-size: 14px; margin: 0;">Currículo Vitae</p>
                    </div>
                </div>
            </div>
            
            <div class="europass-content">
                <section style="margin-bottom: 25px;">
                    <h2 style="color: #0066cc; font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 3px;">INFORMAÇÕES PESSOAIS</h2>
                    <div style="margin-left: 20px;">
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Nome:</strong> ${data.fullName}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Data de nascimento:</strong> ${formattedDate}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Localização:</strong> ${data.city}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${data.email}</p>
                        ${data.phone ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Telefone:</strong> ${data.phone}</p>` : ''}
                    </div>
                </section>
                
                ${data.objective ? `
                <section style="margin-bottom: 25px;">
                    <h2 style="color: #0066cc; font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 3px;">${translations[currentLanguage]?.objective?.toUpperCase() || 'OBJETIVO'}</h2>
                    <div style="margin-left: 20px;">
                        <p style="margin: 5px 0; font-size: 14px; color: #555; line-height: 1.5;">${data.objective}</p>
                    </div>
                </section>
                ` : ''}
                
                <section style="margin-bottom: 25px;">
                    <h2 style="color: #0066cc; font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 3px;">${translations[currentLanguage]?.academic_education?.toUpperCase() || 'EDUCAÇÃO E FORMAÇÃO'}</h2>
                    <div style="margin-left: 20px;">
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-left: 3px solid #0066cc;">
                                <p style="margin: 0; font-size: 14px; font-weight: bold;">${edu.year}</p>
                                <p style="margin: 5px 0; font-size: 14px; color: #0066cc; font-weight: bold;">${edu.course}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <section style="margin-bottom: 25px;">
                    <h2 style="color: #0066cc; font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 3px;">${translations[currentLanguage]?.professional_experience?.toUpperCase() || 'EXPERIÊNCIA PROFISSIONAL'}</h2>
                    <div style="margin-left: 20px;">
                        ${data.experience.map(exp => `
                            <div style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-left: 3px solid #0066cc;">
                                <p style="margin: 0; font-size: 14px; font-weight: bold;">${exp.duration}</p>
                                <p style="margin: 5px 0; font-size: 14px; color: #0066cc; font-weight: bold;">${exp.position}</p>
                                <p style="margin: 5px 0; font-size: 14px;">${exp.company}</p>
                                <p style="margin: 5px 0; font-size: 13px; color: #666;">${exp.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        </div>
    `;
}

function generateClassicHTML(data) {
    const birthDate = new Date(data.birthDate);
    const formattedDate = birthDate.toLocaleDateString('pt-PT');
    
    const photoSection = data.photo ? `
        <div class="classic-photo" style="float: right; margin-left: 20px; margin-bottom: 20px;">
            <img src="${data.photo}" alt="Foto de ${data.fullName}" style="width: 120px; height: 150px; border: 1px solid #333; object-fit: cover;">
        </div>
    ` : '';
    
    const objectiveTitle = translations[currentLanguage]?.objective || 'Objetivo';
    const educationTitle = translations[currentLanguage]?.academic_education || 'Formação Académica';
    const experienceTitle = translations[currentLanguage]?.professional_experience || 'Experiência Profissional';
    
    return `
        <div class="classic-container" style="max-width: 800px; margin: 0 auto; background: white; font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6;">
            ${photoSection}
            
            <div class="classic-header" style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
                <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #333; text-transform: uppercase; letter-spacing: 2px;">${data.fullName}</h1>
                <p style="font-size: 14px; color: #666; margin: 10px 0 0 0;">${formattedDate} | ${data.city} | ${data.email}${data.phone ? ' | ' + data.phone : ''}</p>
            </div>
            
            <div class="classic-content" style="clear: both;">
                ${data.objective ? `
                <section style="margin-bottom: 25px;">
                    <h2 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 5px; text-transform: uppercase;">${objectiveTitle}</h2>
                    <p style="font-size: 14px; color: #333; line-height: 1.6;">${data.objective}</p>
                </section>
                ` : ''}
                
                <section style="margin-bottom: 25px;">
                    <h2 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 5px; text-transform: uppercase;">${educationTitle}</h2>
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: baseline;">
                            <h3 style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">${edu.course}</h3>
                            <span style="font-size: 14px; color: #666; font-style: italic;">${edu.year}</span>
                        </div>
                    `).join('')}
                </section>
                
                <section style="margin-bottom: 25px;">
                    <h2 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 5px; text-transform: uppercase;">${experienceTitle}</h2>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                <h3 style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">${exp.position}</h3>
                                <span style="font-size: 14px; color: #666; font-style: italic;">${exp.duration}</span>
                            </div>
                            <p style="font-size: 14px; color: #666; margin: 0 0 5px 0; font-weight: bold;">${exp.company}</p>
                            <p style="font-size: 14px; color: #333; margin: 0;">${exp.description}</p>
                        </div>
                    `).join('')}
                </section>
            </div>
        </div>
    `;
}

function generateMinimalistHTML(data) {
    const birthDate = new Date(data.birthDate);
    const formattedDate = birthDate.toLocaleDateString('pt-PT');
    
    const photoSection = data.photo ? `
        <div class="minimalist-photo" style="width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin-right: 20px; flex-shrink: 0;">
            <img src="${data.photo}" alt="Foto de ${data.fullName}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
    ` : '';
    
    return `
        <div class="minimalist-container" style="max-width: 800px; margin: 0 auto; background: white; font-family: 'Inter', sans-serif; padding: 60px 40px; color: #333;">
            <div class="minimalist-header" style="display: flex; align-items: center; margin-bottom: 40px;">
                ${photoSection}
                <div>
                    <h1 style="font-size: 32px; font-weight: 300; margin: 0; color: #333; letter-spacing: -1px;">${data.fullName}</h1>
                    <p style="font-size: 16px; color: #666; margin: 5px 0 0 0; font-weight: 300;">${formattedDate} • ${data.city}</p>
                    <p style="font-size: 16px; color: #666; margin: 5px 0 0 0; font-weight: 300;">${data.email}${data.phone ? ' • ' + data.phone : ''}</p>
                </div>
            </div>
            
            <div class="minimalist-content">
                ${data.objective ? `
                <section style="margin-bottom: 40px;">
                    <h2 style="font-size: 20px; font-weight: 400; color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0;">${translations[currentLanguage]?.objective || 'Objetivo'}</h2>
                    <p style="font-size: 15px; color: #555; line-height: 1.6; font-weight: 300;">${data.objective}</p>
                </section>
                ` : ''}
                
                <section style="margin-bottom: 40px;">
                    <h2 style="font-size: 20px; font-weight: 400; color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0;">${translations[currentLanguage]?.academic_education || 'Educação'}</h2>
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: baseline;">
                            <h3 style="font-size: 18px; font-weight: 500; color: #333; margin: 0;">${edu.course}</h3>
                            <span style="font-size: 14px; color: #999; font-weight: 300;">${edu.year}</span>
                        </div>
                    `).join('')}
                </section>
                
                <section>
                    <h2 style="font-size: 20px; font-weight: 400; color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0;">${translations[currentLanguage]?.professional_experience || 'Experiência'}</h2>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                                <h3 style="font-size: 18px; font-weight: 500; color: #333; margin: 0;">${exp.position}</h3>
                                <span style="font-size: 14px; color: #999; font-weight: 300;">${exp.duration}</span>
                            </div>
                            <p style="font-size: 16px; color: #666; margin: 0 0 10px 0; font-weight: 400;">${exp.company}</p>
                            <p style="font-size: 15px; color: #555; margin: 0; line-height: 1.6; font-weight: 300;">${exp.description}</p>
                        </div>
                    `).join('')}
                </section>
            </div>
        </div>
    `;
}

// Função para carregar idioma salvo
function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
        changeLanguage();
    } else {
        // Inicializar preview do template
        updateTemplatePreview();
    }
}

// Função para atualizar preview da foto com tradução
function previewPhoto(input) {
    const preview = document.getElementById('photoPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview da foto">`;
        };
        
        reader.readAsDataURL(input.files[0]);
    } else {
        const noPhotoText = translations[currentLanguage]?.no_photo_selected || 'Nenhuma foto selecionada';
        preview.innerHTML = `<div class="no-photo">${noPhotoText}</div>`;
    }
}

// Função para atualizar templates com idioma
function generateModernHTML(data) {
    const birthDate = new Date(data.birthDate);
    const formattedDate = birthDate.toLocaleDateString(currentLanguage === 'pt-br' ? 'pt-BR' : 'pt-PT');
    
    const photoSection = data.photo ? `
        <div class="profile-photo" style="flex-shrink: 0;">
            <img src="${data.photo}" alt="Foto de ${data.fullName}" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid rgba(255, 255, 255, 0.2); object-fit: cover; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
        </div>
    ` : '';
    
    const educationTitle = translations[currentLanguage]?.academic_education || 'Formação Académica e Cursos';
    const experienceTitle = translations[currentLanguage]?.professional_experience || 'Experiência Profissional';
    const objectiveTitle = translations[currentLanguage]?.objective || 'Objetivo';
    
    return `
        <div class="container" style="max-width: 800px; margin: 0 auto; background: white; min-height: auto;">
            <header class="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; text-align: center;">
                <div class="header-content" style="max-width: 600px; margin: 0 auto;">
                    <div class="profile-section" style="display: flex; align-items: center; gap: 2rem; text-align: left;">
                        ${photoSection}
                        <div class="profile-info" style="flex: 1;">
                            <h1 class="name" style="font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">${data.fullName}</h1>
                            <div class="contact-info" style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center;">
                                <div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.95;">
                                    <i class="fas fa-calendar-alt" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                    <span>${formattedDate}</span>
                                </div>
                                <div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.95;">
                                    <i class="fas fa-map-marker-alt" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                    <span>${data.city}</span>
                                </div>
                                <div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.95;">
                                    <i class="fas fa-envelope" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                    <span>${data.email}</span>
                                </div>
                                ${data.phone ? `<div class="contact-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; opacity: 0.95;">
                                    <i class="fas fa-phone" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                    <span>${data.phone}</span>
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main class="main-content" style="padding: 1.5rem;">
                ${data.objective ? `
                <section class="section" style="margin-bottom: 2rem;">
                    <h2 class="section-title" style="font-size: 1.3rem; font-weight: 600; color: #2d3748; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-target" style="color: #667eea; font-size: 1.1rem;"></i>
                        ${objectiveTitle}
                    </h2>
                    <div class="section-content">
                        <p style="color: #4a5568; line-height: 1.6; font-size: 1rem;">${data.objective}</p>
                    </div>
                </section>
                ` : ''}
                
                <section class="section" style="margin-bottom: 2rem;">
                    <h2 class="section-title" style="font-size: 1.3rem; font-weight: 600; color: #2d3748; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-graduation-cap" style="color: #667eea; font-size: 1.1rem;"></i>
                        ${educationTitle}
                    </h2>
                    <div class="section-content" style="display: flex; flex-direction: column; gap: 1rem;">
                        ${data.education.map(edu => `
                            <div class="education-item" style="background-color: #f7fafc; padding: 1rem; border-radius: 6px; border-left: 3px solid #667eea;">
                                <div class="education-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                                    <h3 class="course-title" style="font-size: 1rem; font-weight: 600; color: #2d3748;">${edu.course}</h3>
                                    <span class="year" style="background-color: #667eea; color: white; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.8rem; font-weight: 500;">${edu.year}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <section class="section" style="margin-bottom: 2rem;">
                    <h2 class="section-title" style="font-size: 1.3rem; font-weight: 600; color: #2d3748; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-briefcase" style="color: #667eea; font-size: 1.1rem;"></i>
                        ${experienceTitle}
                    </h2>
                    <div class="section-content" style="display: flex; flex-direction: column; gap: 1rem;">
                        ${data.experience.map(exp => `
                            <div class="experience-item" style="background-color: #f7fafc; padding: 1rem; border-radius: 6px; border-left: 3px solid #48bb78;">
                                <div class="experience-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 1rem;">
                                    <div class="job-info" style="flex: 1;">
                                        <h3 class="job-title" style="font-size: 1rem; font-weight: 600; color: #2d3748; margin-bottom: 0.2rem;">${exp.position}</h3>
                                        <h4 class="company" style="font-size: 0.9rem; font-weight: 500; color: #48bb78;">${exp.company}</h4>
                                    </div>
                                    <span class="duration" style="background-color: #48bb78; color: white; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.8rem; font-weight: 500; white-space: nowrap;">${exp.duration}</span>
                                </div>
                                <div class="job-description" style="color: #4a5568; line-height: 1.6;">
                                    <p style="margin-bottom: 0.3rem;"><strong style="color: #2d3748;">${translations[currentLanguage]?.functions || 'Funções'}:</strong> ${exp.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </main>
        </div>
    `;
}

// Inicializa tema salvo e idioma quando página carrega
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
    loadSavedLanguage();
});
