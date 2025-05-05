# Applicazione di Monitoraggio del Sonno
Giorgio Bonetti VR488066
Francesco Frison VR500307

## 1. Obiettivi
L'obiettivo principale del progetto è la realizzazione di un'applicazione web per **l'analisi dei dati relativi al sonno** di una persona. Attraverso la visualizzazione grafica dei dati raccolti (suddivisi in fasi come sonno leggero, profondo, REM e veglia), l'applicazione consente all'utente di comprendere l'andamento del proprio riposo nel tempo e identificare eventuali pattern o anomalie.

## 2. Funzionalità
L'applicazione implementa le seguenti funzionalità principali:

- **Caricamento e gestione dati**: i dati del sonno vengono letti da file CSV memorizzati nella cartella `public/`.
- **Parsing**: i dati grezzi vengono processati per suddividerli per giorno e fase del sonno, calcolando anche la durata totale.
- **Visualizzazione tramite grafici**:
  - Un **grafico a torta** mostra le fasi del sonno per avere un idea di quanto tempo per ogni fase si ha dormito
  - Un **grafico a punti** che mostra per ogni minuto la fase di sonno in cui si era, in modo che visivamente sia più impattante
  - Un **grafico a barre sovrapposte** mostra le diverse fasi del sonno per ciascun giorno.

- **Adattamento del periodo visualizzato**: l’utente può visualizzare i dati in formato settimanale o mensile, con il grafico che si adatta automaticamente aggiungendo giorni mancanti se necessario.

## 3. Tecnologie e Tecniche Utilizzate
Il progetto è stato sviluppato utilizzando:

- **React** con **TypeScript** per la struttura dell’interfaccia utente e la tipizzazione.
- **Vite** come bundler e ambiente di sviluppo.
- **G2Plot** (`@antv/g2plot`) per la realizzazione dei grafici interattivi.
- **Bootstrap** per lo stile **responsive**: la libreria consente all’interfaccia dell’applicazione di adattarsi automaticamente a diverse dimensioni di schermo, migliorando la fruibilità da dispositivi mobili o desktop.
- **CSS inline e layout semantico** per una visualizzazione semplice e coerente.
- **Parsing e gestione delle date** in JavaScript con l’oggetto `Date`, per calcolare range completi e ordinare i dati.

## 4. Limitazioni Attuali
- **Assenza di interfaccia utente avanzata**: attualmente il progetto non prevede un'interazione diretta per caricare file o cambiare viste (es. selettori di data o filtri dinamici).
- **Staticità dei dati**: i file CSV sono letti staticamente dal front-end. Non c'è un back-end o API per caricare o salvare dati.
- **Nessun controllo degli errori sui dati**: in caso di file malformati, l’applicazione non fornisce feedback o fall-back.

## 5. Sviluppi Futuri Possibili
Per migliorare e rendere più completo il progetto, si suggeriscono i seguenti sviluppi:

- **Caricamento dinamico dei dati** da parte dell’utente tramite interfaccia grafica.
- **Aggiunta di un back-end** per memorizzare, analizzare e recuperare dati del sonno da più dispositivi.
- **Introduzione di filtri temporali interattivi** (es. selettore calendario, range di date personalizzato).
- **Notifiche e consigli personalizzati** in base ai pattern di sonno rilevati.
