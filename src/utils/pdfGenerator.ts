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
    doc.setTextColor(200, 0, 0); // Red
    doc.text(`📉 ATENÇÃO: Você perde o equivalente a ${results.lostDailyRates} diárias/mês.`, 14, finalY);

    // --- AI Action Plan Section ---
    const planY = finalY + 20;

    doc.setFillColor(240, 248, 255); // Light Blue Background
    doc.rect(10, planY, 190, 60, 'F');
    doc.setDrawColor(47, 191, 113); // Green Border
    doc.setLineWidth(1);
    doc.rect(10, planY, 190, 60, 'S');

    doc.setTextColor(11, 37, 69);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(actionPlan.title, 105, planY + 10, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(actionPlan.description, 105, planY + 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Sua Missão Hoje:', 15, planY + 32);

    doc.setFont('helvetica', 'normal');
    doc.text(`• ${actionPlan.step1}`, 15, planY + 40);
    doc.text(`• ${actionPlan.step2}`, 15, planY + 48);

    doc.setFontSize(11);
    doc.setTextColor(47, 191, 113); // Strategic Green
    doc.text(`🏆 Resultado Esperado: ${actionPlan.expectedResult}`, 15, planY + 56);

    // --- CTA Footer ---
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text('Precisa de ajuda para implementar isso?', 105, 270, { align: 'center' });
    doc.setTextColor(11, 37, 69);
    doc.text('Agende seu diagnóstico gratuito: (11) 99236-4885', 105, 275, { align: 'center' });

    // Save
    doc.save(`Plano_Sangria_${data.hotelName.replace(/\s+/g, '_')}.pdf`);
};
