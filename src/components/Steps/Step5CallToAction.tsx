import React, { ChangeEvent, FormEvent } from 'react';
import { useWizard } from '@/components/Wizard/WizardContext';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { supabase } from '@/lib/supabase';

const Step5CallToAction = () => {
  const { data, updateData, results } = useWizard();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!data.name || !data.whatsapp) {
        alert('Por favor, preencha pelo menos Nome e WhatsApp.');
        return;
      }

      // 1. Prepare data payload
      const leadData = {
        name: data.name,
        hotel_name: data.hotelName,
        whatsapp: data.whatsapp,
        email: data.email,
        monthly_revenue: parseFloat(data.monthlyRevenue.toString()) || 0,
        ota_percentage: parseFloat(data.otaPercentage.toString()) || 0,
        commission_rate: parseFloat(data.commissionRate.toString()) || 0,
        lost_revenue: results?.monthlyCommission || 0,
        dependency_score: results?.dependencyScore || 'N/A',
      };

      // 2. Save to Supabase
      const { error } = await supabase.from('leads_calc_ota').insert([leadData]);

      if (error) throw error;

      // 3. Success Feedback
      alert('Relatório gerado e dados salvos com sucesso! 🚀');
      console.log('Lead saved:', leadData);

    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Erro ao salvar os dados. Verifique sua conexão.');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200 animate-fadeIn transition-transform">
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">
        Pare a Sangria Agora
      </h2>
      <p className="text-text-light mb-8 text-center bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100">
        Receba seu relatório detalhado e um plano de ação personalizado.
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Seu Nome"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Ex: João Silva"
        />

        <Input
          label="Nome do Hotel/Pousada"
          name="hotelName"
          value={data.hotelName}
          onChange={handleChange}
          placeholder="Ex: Pousada Vista do Mar"
        />

        <Input
          label="WhatsApp (com DDD)"
          name="whatsapp"
          value={data.whatsapp}
          onChange={handleChange}
          placeholder="(11) 99999-9999"
        />

        <Input
          label="E-mail Corporativo"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="seu@hotel.com"
          type="email"
        />

        <Button type="submit" variant="accent" className="mb-4">
          Gerar Relatório PDF
        </Button>

        <div className="space-y-3 mt-6 pt-6 border-t border-slate-100">
          <p className="text-center text-xs text-text-light font-medium uppercase tracking-wider mb-2">Outras Opções</p>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => window.open('https://wa.me/5511992364885?text=Quero%20um%20plano%20para%20recuperar%20minha%20margem', '_blank')}
          >
            Quero um plano para recuperar isso
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed"
            onClick={() => window.open('https://wa.me/5511992364885?text=Gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20de%2030min', '_blank')}
          >
            Agendar diagnóstico de 30 minutos
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step5CallToAction;
