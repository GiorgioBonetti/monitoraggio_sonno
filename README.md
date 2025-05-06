# Guida Rapida per Eseguire l'App React

Questa guida riassume i passaggi essenziali per eseguire l'applicazione React.

## Prerequisiti: Installazione degli Strumenti

1. **Installa Node.js e npm:**
    * Se sei su windows, apri il terminale ed esegui:
      ```# Download and install fnm:
      winget install Schniz.fnm
      # Download and install Node.js:
      fnm install 22
      # Verify the Node.js version:
      node -v # Should print "v22.15.0".
      # Verify npm version:
      npm -v # Should print "10.9.2".
      ```
    * Se sei da mac / linux, vai su [https://nodejs.org/](https://nodejs.org/) e scarica l'installer per il tuo sistema operativo.
    * Esegui l'installer e segui le istruzioni.
    * Apri il terminale e verifica l'installazione con:
        ```bash
        node -v
        npm -v
        ```

## Esecuzione del Progetto

1. **Naviga alla cartella del progetto:**
   ```bash
   cd [percorso/alla/cartella/del/progetto]
   ```

2. **Installa le librerie:**
   ```bash
   npm install
   ```

3. **Avvia il progetto:**
   ```bash
   npm run dev
   ```

4. **Apri l'applicazione nel browser:**
    * L'indirizzo sarà indicato nel terminale, solitamente `http://localhost:5173/`.
