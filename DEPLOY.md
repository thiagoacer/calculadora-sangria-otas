# Guia de Publicação (Deploy)

Sua ferramenta "Calculadora de Sangria das OTAs" está pronta para ir ao ar!
Como o projeto foi feito com **Vite + React**, as melhores opções de hospedagem gratuita e profissional são **Vercel** ou **Netlify**.

## Opção 1: Vercel (Recomendada)
A Vercel é a criadora do Next.js e tem a melhor infraestrutura para React.

### Passo a Passo
1. Crie uma conta em [vercel.com](https://vercel.com).
2. Instale a CLI da Vercel (opcional, mas rápido):
   ```bash
   npm i -g vercel
   ```
3. Rode o comando de deploy na pasta do projeto:
   ```bash
   vercel
   ```
4. Siga as instruções no terminal (aceite os padrões, o Vite é detectado automaticamente).

### Deploy via GitHub (Automático)
1. Suba seu código para o GitHub.
2. No painel da Vercel, clique em "Add New Project".
3. Importe o repositório do GitHub.
4. Clique em "Deploy".
*Sempre que você der `git push`, a Vercel atualiza o site sozinha.*

---

## Opção 2: Netlify
Muito similar à Vercel, excelente para projetos estáticos.

1. Arraste a pasta `dist` (gerada após o comando `npm run build`) para a área de "Drop" no site [app.netlify.com/drop](https://app.netlify.com/drop).
2. O site estará online em segundos.

---

## Antes de Publicar (Checklist)
- [x] **Build**: O comando `npm run build` deve rodar sem erros (já verificado).
- [x] **SEO**: As meta tags (título, descrição) estão configuradas no `index.html`.
- [x] **Responsividade**: Testado em mobile e desktop.
- [ ] **Links**: Verifique se o link do WhatsApp no passo 5 está correto.

## Domínio Personalizado
Tanto Vercel quanto Netlify permitem conectar um domínio (ex: `calculadorasangria.com.br`) facilmente nas configurações do projeto após o deploy.
