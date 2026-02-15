import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BleedResult } from './calculations';
import { formatCurrency } from './formatting';

interface WizardData {
    name: string;
    hotelName: string;
    email: string;
    whatsapp: string;
}

// "Agent" Logic: Selects the best action plan based on the situation
const getActionPlan = (dependencyScore: string) => {
    if (dependencyScore === 'Alta') {
        return {
            title: '🚨 AÇÃO IMEDIATA: Otimização Básica',
            description: 'Sua dependência é crítica. Você precisa aparecer mais sem pagar comissão.',
            step1: 'Atualize as fotos do seu Perfil da Empresa no Google (antigo Google Meu Negócio) HOJE.',
            step2: 'Peça para 5 hóspedes fazendo check-out avaliarem sua pousada no Google.',
            expectedResult: 'Aumento de visibilidade orgânica em 2 semanas.',
        };
    }

    if (dependencyScore === 'Média') {
        return {
            title: '⚠️ AÇÃO ESTRATÉGICA: Conversão WhatsApp',
            description: 'Você tem fluxo, mas está escapando para a OTA.',
            step1: 'Crie uma lista de transmissão no WhatsApp com hóspedes dos últimos 3 meses.',
            step2: 'Envie uma oferta exclusiva de "Retorno VIP" com 10% de desconto direto.',
            expectedResult: 'Recuperação imediata de 5 a 10 reservas diretas.',
        };
    }

    // Baixa
    return {
        title: '✅ AÇÃO DE MESTRE: Fidelização Automática',
        description: 'Você está no caminho certo. Agora é hora de blindar sua base.',
        step1: 'Implemente um e-mail automático de "Obrigado" 24h após o check-out.',
        step2: 'Ofereça um cupom para indicarem amigos (Member-Get-Member).',
        expectedResult: 'Criação de um canal de vendas recorrente e gratuito.',
    };
};

export const generatePDF = (data: WizardData, results: BleedResult) => {
    const doc = new jsPDF();
    const actionPlan = getActionPlan(results.dependencyScore);

    // --- Header ---
    doc.setFillColor(11, 37, 69); // Primary Color #0B2545
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Sangria OTA', 105, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Análise Financeira & Plano de Ação', 105, 25, { align: 'center' });

    // --- Client Info ---
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(12);
    doc.text(`Hotel/Pousada: ${data.hotelName}`, 14, 50);
    doc.text(`Responsável: ${data.name}`, 14, 56);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 14, 62);

    // --- Diagnosis Section ---
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. O Tamanho do Buraco', 14, 75);

    autoTable(doc, {
        startY: 80,
        head: [['Indicador', 'Seu Resultado']],
        body: [
            ['Faturamento Mensal', formatCurrency(results.monthlyRevenue)],
            ['Comissão Mensal (Sangria)', formatCurrency(results.monthlyCommission)],
            ['Projeção Anual de Perda', formatCurrency(results.annualCommission)],
            ['Dependência das OTAs', `${results.otaPercentage}% (${results.dependencyScore})`],
        ],
        theme: 'striped',
        headStyles: { fillColor: [11, 37, 69] },
        styles: { fontSize: 12 },
    });

    // --- Visual Alert ---
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.setTextColor(220, 38, 38); // Red-600
    doc.setFont('helvetica', 'bold');
    doc.text(`📉 ATENÇÃO: Você perde o equivalente a ${results.lostDailyRates} diárias/mês.`, 14, finalY);

    // --- AI Action Plan Section ---
    const planY = finalY + 15;

    // Background for Plan
    doc.setFillColor(240, 253, 244); // Green-50 (Mint)
    doc.setDrawColor(22, 163, 74); // Green-600
    doc.setLineWidth(0.5);
    doc.rect(10, planY, 190, 65, 'DF');

    // Plan Title
    doc.setTextColor(21, 128, 61); // Green-700
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(actionPlan.title, 105, planY + 12, { align: 'center' });

    // Plan Description
    doc.setTextColor(55, 65, 81); // Gray-700
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(actionPlan.description, 105, planY + 22, { align: 'center' });

    // Steps
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39); // Gray-900
    doc.text('Sua Missão Hoje:', 15, planY + 36);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`• ${actionPlan.step1}`, 20, planY + 44);
    doc.text(`• ${actionPlan.step2}`, 20, planY + 52);

    // Expected Result
    doc.setFontSize(11);
    doc.setTextColor(21, 128, 61); // Green-700
    doc.setFont('helvetica', 'bold');
    doc.text(`🏆 Resultado Esperado: ${actionPlan.expectedResult}`, 105, planY + 60, { align: 'center' });

    // --- STRATEGIC ACCELERATOR (New Persuasive Section) ---
    const accelY = planY + 75;

    doc.setFillColor(255, 247, 237); // Orange-50
    doc.setDrawColor(234, 88, 12); // Orange-600
    doc.rect(10, accelY, 190, 45, 'DF');

    doc.setTextColor(194, 65, 12); // Orange-800
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('🚀 Quer Mudar o Jogo Mais Rápido?', 105, accelY + 12, { align: 'center' });

    doc.setTextColor(67, 20, 7); // Orange-950
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(
        'Este plano é apenas o começo. Existem estratégias avançadas de Revenue Management que podem dobrar seus resultados. Uma consultoria especializada é o caminho mais curto para estancar essa sangria e aumentar sua margem de lucro.',
        170
    );
    doc.text(splitText, 105, accelY + 22, { align: 'center' });

    // --- CTA Footer ---
    const footerY = 270;
    doc.setFontSize(12);
    doc.setTextColor(11, 37, 69); // Primary
    doc.setFont('helvetica', 'bold');
    doc.text('Agende seu diagnóstico gratuito agora:', 105, footerY, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235); // Blue-600 Link color
    doc.text('(11) 99236-4885', 105, footerY + 8, { align: 'center' });

    // Save
    doc.save(`Plano_Sangria_${data.hotelName.replace(/\s+/g, '_')}.pdf`);
};
