// Template preview images as SVG strings
const templatePreviews = {
    modern: `
        <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="modernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="300" height="200" fill="white" stroke="#e0e0e0"/>
            <rect x="0" y="0" width="300" height="60" fill="url(#modernGrad)"/>
            <circle cx="50" cy="30" r="20" fill="rgba(255,255,255,0.3)"/>
            <text x="80" y="25" fill="white" font-size="12" font-weight="bold">Astoufo</text>
            <text x="80" y="40" fill="rgba(255,255,255,0.8)" font-size="10">Desenvolvedor</text>
            <text x="20" y="85" fill="#333" font-size="10" font-weight="bold">EXPERIÊNCIA</text>
            <rect x="20" y="90" width="260" height="15" fill="#f0f0f0" rx="2"/>
            <text x="25" y="100" fill="#666" font-size="8">Senior Developer - Tech Company</text>
            <text x="20" y="125" fill="#333" font-size="10" font-weight="bold">EDUCAÇÃO</text>
            <rect x="20" y="130" width="260" height="15" fill="#f0f0f0" rx="2"/>
            <text x="25" y="140" fill="#666" font-size="8">Mestrado em Informática</text>
        </svg>
    `,
    europass: `
        <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" fill="white" stroke="#e0e0e0"/>
            <rect x="220" y="10" width="40" height="50" fill="#f0f0f0" stroke="#0066cc"/>
            <text x="225" y="25" fill="#999" font-size="6">FOTO</text>
            <text x="150" y="25" text-anchor="middle" fill="#0066cc" font-size="14" font-weight="bold">JOÃO SILVA</text>
            <text x="150" y="40" text-anchor="middle" fill="#666" font-size="9">Desenvolvedor | Lisboa</text>
            <line x1="10" y1="65" x2="290" y2="65" stroke="#0066cc" stroke-width="2"/>
            <text x="10" y="85" fill="#0066cc" font-size="10" font-weight="bold">INFORMAÇÕES PESSOAIS</text>
            <text x="15" y="100" fill="#333" font-size="8">Email: teste@hotmail.com | Telefone: +351 000 000 000</text>
            <text x="10" y="120" fill="#0066cc" font-size="10" font-weight="bold">EXPERIÊNCIA PROFISSIONAL</text>
            <rect x="15" y="125" width="270" height="20" fill="#f9f9f9" stroke-left="#0066cc" stroke-left-width="3"/>
            <text x="20" y="135" fill="#333" font-size="8">2020-2025 | Desenvolvedor Senior | Tech Company</text>
            <text x="10" y="155" fill="#0066cc" font-size="10" font-weight="bold">EDUCAÇÃO E FORMAÇÃO</text>
            <rect x="15" y="160" width="270" height="20" fill="#f9f9f9" stroke-left="#0066cc" stroke-left-width="3"/>
            <text x="20" y="170" fill="#333" font-size="8">2018 | Mestrado em Informática | Universidade de Lisboa</text>
        </svg>
    `,
    classic: `
        <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" fill="white" stroke="#333" stroke-width="2"/>
            <rect x="220" y="15" width="60" height="75" fill="#f5f5f5" stroke="#333"/>
            <text x="235" y="40" fill="#999" font-size="8">FOTO</text>
            <text x="150" y="25" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">Astoufo</text>
            <text x="150" y="40" text-anchor="middle" fill="#666" font-size="9">Desenvolvedor | Lisboa | joao@email.com</text>
            <line x1="20" y1="50" x2="280" y2="50" stroke="#333" stroke-width="2"/>
            <text x="20" y="70" fill="#333" font-size="11" font-weight="bold">EXPERIÊNCIA PROFISSIONAL</text>
            <line x1="20" y1="75" x2="180" y2="75" stroke="#333" stroke-width="1"/>
            <text x="20" y="90" fill="#333" font-size="10" font-weight="bold">Desenvolvedor Senior</text>
            <text x="220" y="90" fill="#666" font-size="9">2020-2025</text>
            <text x="20" y="100" fill="#666" font-size="9">Tech Company Portugal</text>
            <text x="20" y="110" fill="#333" font-size="8">Desenvolvimento de aplicações web e mobile...</text>
            <text x="20" y="130" fill="#333" font-size="11" font-weight="bold">FORMAÇÃO ACADÉMICA</text>
            <line x1="20" y1="135" x2="180" y2="135" stroke="#333" stroke-width="1"/>
            <text x="20" y="150" fill="#333" font-size="10" font-weight="bold">Mestrado em Informática</text>
            <text x="220" y="150" fill="#666" font-size="9">2018</text>
            <text x="20" y="160" fill="#666" font-size="9">Universidade de Lisboa</text>
        </svg>
    `,
    minimalist: `
        <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" fill="#fafafa"/>
            <circle cx="50" cy="35" r="20" fill="#e0e0e0"/>
            <text x="80" y="30" fill="#333" font-size="16" font-weight="300">Astoufo</text>
            <text x="80" y="45" fill="#666" font-size="10">Desenvolvedor | Lisboa | teste@hotmail.com</text>
            <text x="20" y="80" fill="#333" font-size="12" font-weight="400">Experiência</text>
            <line x1="20" y1="85" x2="280" y2="85" stroke="#e0e0e0" stroke-width="1"/>
            <text x="20" y="100" fill="#333" font-size="11" font-weight="500">Desenvolvedor Senior</text>
            <text x="220" y="100" fill="#999" font-size="9">2020-2025</text>
            <text x="20" y="110" fill="#666" font-size="10">Company Portugal</text>
            <text x="20" y="120" fill="#555" font-size="9">Desenvolvimento de soluções web modernas e escaláveis...</text>
            <line x1="20" y1="130" x2="280" y2="130" stroke="#f0f0f0" stroke-width="1"/>
            <text x="20" y="150" fill="#333" font-size="12" font-weight="400">Educação</text>
            <line x1="20" y1="155" x2="280" y2="155" stroke="#e0e0e0" stroke-width="1"/>
            <text x="20" y="170" fill="#333" font-size="11" font-weight="500">Mestrado em Informática</text>
            <text x="220" y="170" fill="#999" font-size="9">2018</text>
        </svg>
    `
};
