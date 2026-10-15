# GYMRATS

PWA mobile-first para organizar uma divisão contínua de musculação ABC, registrar séries/cargas e acompanhar evolução. Todos os dados ficam no navegador via IndexedDB (Dexie); não há backend nem envio da planilha a servidores.

## Executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Validação e produção:

```bash
npm run test
npm run build
npm run preview
```

## Funcionalidades

- Dashboard com próximo treino calculado pelo histórico real, consistência semanal e últimos registros.
- Sequência contínua A → B → C; só uma sessão finalizada avança a letra. Um treino escolhido manualmente determina a próxima letra.
- 20 exercícios iniciais editáveis, removíveis e complementáveis por exercícios personalizados.
- Sessão em rascunho, preenchimento de carga/reps/RIR, série extra, sugestões baseadas no último treino e conclusão idempotente.
- Cronômetro persistente por timestamp, com pausar, reiniciar, ±15 s e vibração quando suportada.
- Histórico detalhado, exclusão com confirmação e recálculo imediato da sequência/estatísticas.
- Gráficos reais de volume, carga e repetições; nenhum dado fictício.
- Importação local de XLSX pela aba `Treino ABC`, prévia, validação e tratamento de duplicatas.
- Backup completo em JSON e restauração validada com confirmação.
- Manifesto, service worker, cache offline e layout com áreas seguras do iPhone.

## Importar a planilha

Em **Perfil → Importar planilha Excel**, selecione `Gymrats_Planilha_Treino_ABC.xlsx`. A aplicação lê a linha 5 da aba `Treino ABC`, exibe uma prévia e oferece ignorar duplicatas ou atualizar exercícios existentes. Sessões anteriores nunca são apagadas porque cada uma preserva um retrato do exercício realizado.

## Sequência ABC

A próxima letra deriva exclusivamente da última sessão concluída, independentemente da data ou mudança de semana. Rascunhos e faltas não avançam a sequência. Ao excluir uma sessão no histórico, a próxima letra e as estatísticas são recalculadas.

## Publicar no GitHub Pages

O projeto inclui o workflow `.github/workflows/deploy-pages.yml`. Ele executa os testes, descobre automaticamente o caminho do site, gera a versão de produção e publica a pasta `dist`.

1. Crie um repositório público no GitHub e envie este projeto para a branch `main`.
2. No repositório, abra **Settings → Pages** e selecione **GitHub Actions** como fonte.
3. Abra **Actions** e acompanhe o workflow **Publicar GYMRATS no GitHub Pages**.
4. Quando a execução terminar, abra o endereço informado no job `deploy`.

O código e o endereço do app ficam públicos, mas cargas, histórico e preferências permanecem somente no IndexedDB de cada aparelho. Antes de migrar do `localhost`, exporte um backup em **Perfil → Exportar backup**; depois, abra o endereço publicado no iPhone e restaure esse arquivo.

## Instalar no iPhone

Abra o app publicado no Safari, toque em **Compartilhar**, escolha **Adicionar à Tela de Início** e confirme. Após o primeiro carregamento bem-sucedido, o shell e os recursos essenciais ficam em cache. O iOS pode suspender JavaScript em segundo plano; por isso o cronômetro usa timestamps e se corrige ao voltar ao app, sem prometer execução contínua ou notificações.

## Backup

Use **Perfil → Exportar backup** periodicamente. Para restaurar, escolha o JSON em **Restaurar backup** e confirme a substituição. Dados exclusivamente locais podem ser perdidos ao limpar o navegador ou perder o aparelho.

## Estrutura

- `src/components`: layout, elementos comuns e cronômetro.
- `src/pages`: Início, Treinos, execução, Histórico, Evolução e Perfil.
- `src/database`: banco Dexie versionado e seed inicial.
- `src/services`: sessões, importação XLSX e backup.
- `src/utils`: sequência ABC e cálculos.
- `src/types`, `src/data`, `src/styles`, `src/test`: contratos, catálogo inicial, visual e testes.

## Limitações desta versão

- Sem autenticação, sincronização em nuvem ou compartilhamento entre aparelhos.
- A restauração aceita apenas o esquema de backup v1.
- Aviso sonoro não é emitido automaticamente; vibração depende de suporte/permissões do navegador.
- Reordenação visual por arrastar ainda não foi incluída; a ordem importada e a ordem de cadastro são preservadas.
- Edição detalhada de uma sessão concluída não está disponível; ela pode ser revisada ou excluída e refeita.

Uma futura versão pode adicionar Supabase opcional, autenticação, sincronização, editor completo de sessões e reordenação por gesto.
