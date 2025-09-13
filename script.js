// =============================
// Funções principais
// =============================

function previewResume(templateType) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const summary = document.getElementById("summary").value;
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;

    let resumeHTML = "";

    switch (templateType) {
        case "moderno":
            resumeHTML = generateModernHTML(name, email, phone, summary, experience, education, skills);
            break;
        case "classico":
            resumeHTML = generateClassicHTML(name, email, phone, summary, experience, education, skills);
            break;
        case "criativo":
            resumeHTML = generateCreativeHTML(name, email, phone, summary, experience, education, skills);
            break;
    }

    const previewContent = document.getElementById("previewContent");
    previewContent.innerHTML = resumeHTML;

    document.getElementById("resumePreview").style.display = "block";
    document.getElementById("downloadPreviewBtn").style.display = "inline-block";
}

function closePreview() {
    document.getElementById("resumePreview").style.display = "none";
}

// =============================
// Função de download ajustada
// =============================

async function downloadGeneratedResume() {
    const { jsPDF } = window.jspdf;
    const resumePreview = document.getElementById("resumePreview");

    if (!resumePreview) {
        alert("Erro: currículo não encontrado.");
        return;
    }

    // Captura o currículo como imagem
    const canvas = await html2canvas(resumePreview, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Cria PDF no formato A4
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calcula proporção da imagem
    const imgProps = {
        width: canvas.width,
        height: canvas.height
    };

    let imgWidth = pdfWidth;
    let imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // Se a altura ainda for maior que a página, ajusta pela altura
    if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = (imgProps.width * imgHeight) / imgProps.height;
    }

    // Centraliza a imagem na página
    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    // Faz o download automático
    pdf.save("curriculo.pdf");

    // Fecha o modal de preview se existir
    if (typeof closePreview === "function") {
        closePreview();
    }
}

// =============================
// Templates de Currículo
// =============================

function generateModernHTML(name, email, phone, summary, experience, education, skills) {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #007BFF;">${name}</h1>
            <p>${email} | ${phone}</p>
            <h2>Resumo</h2>
            <p>${summary}</p>
            <h2>Experiência</h2>
            <p>${experience}</p>
            <h2>Educação</h2>
            <p>${education}</p>
            <h2>Habilidades</h2>
            <p>${skills}</p>
        </div>
    `;
}

function generateClassicHTML(name, email, phone, summary, experience, education, skills) {
    return `
        <div style="font-family: Times New Roman, serif; color: #000; padding: 20px;">
            <h1 style="text-align: center;">${name}</h1>
            <p style="text-align: center;">${email} | ${phone}</p>
            <h2>Resumo</h2>
            <p>${summary}</p>
            <h2>Experiência</h2>
            <p>${experience}</p>
            <h2>Educação</h2>
            <p>${education}</p>
            <h2>Habilidades</h2>
            <p>${skills}</p>
        </div>
    `;
}

function generateCreativeHTML(name, email, phone, summary, experience, education, skills) {
    return `
        <div style="font-family: Verdana, sans-serif; color: #444; padding: 20px; background: #f4f4f9;">
            <h1 style="color: #e91e63;">${name}</h1>
            <p><strong>Email:</strong> ${email} | <strong>Telefone:</strong> ${phone}</p>
            <h2 style="color: #3f51b5;">Resumo</h2>
            <p>${summary}</p>
            <h2 style="color: #3f51b5;">Experiência</h2>
            <p>${experience}</p>
            <h2 style="color: #3f51b5;">Educação</h2>
            <p>${education}</p>
            <h2 style="color: #3f51b5;">Habilidades</h2>
            <p>${skills}</p>
        </div>
    `;
}

// =============================
// Idioma (traduções) e salvamento
// =============================

function loadSaveLanguage(lang) {
    const translations = {
        pt: {
            title: "Gerador de Currículo",
            name: "Nome",
            email: "Email",
            phone: "Telefone",
            summary: "Resumo",
            experience: "Experiência",
            education: "Educação",
            skills: "Habilidades",
            preview: "Pré-visualizar",
            download: "Baixar PDF"
        },
        en: {
            title: "Resume Builder",
            name: "Name",
            email: "Email",
            phone: "Phone",
            summary: "Summary",
            experience: "Experience",
            education: "Education",
            skills: "Skills",
            preview: "Preview",
            download: "Download PDF"
        }
    };

    const t = translations[lang];

    document.getElementById("title").innerText = t.title;
    document.getElementById("labelName").innerText = t.name;
    document.getElementById("labelEmail").innerText = t.email;
    document.getElementById("labelPhone").innerText = t.phone;
    document.getElementById("labelSummary").innerText = t.summary;
    document.getElementById("labelExperience").innerText = t.experience;
    document.getElementById("labelEducation").innerText = t.education;
    document.getElementById("labelSkills").innerText = t.skills;
    document.getElementById("previewBtn").innerText = t.preview;
    document.getElementById("downloadPreviewBtn").innerText = t.download;
}
