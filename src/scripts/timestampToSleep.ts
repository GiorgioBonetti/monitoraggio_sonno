// funzione che, in base al timestamp in cui si e' andati a letto (una stringa)
function timestampToSleep(timestamp: string, timeSlept: string[]): string {
    // converto timestamp es. '23:00:00' in ['23', '00'] togliendo i secondi
    const time = timestamp.split(":").slice(0, 2);

    // converto entrambi gli array in array di numeri
    const timeNum = time.map((el) => parseInt(el));
    const timeSleptNum = timeSlept.map((el) => parseInt(el));

    // calcolo l'orario di sveglia aggiungendo a timeNum, timeSleptNum
    const wakeUpTime = timeNum.map((el, index) => {
        // sommo i due array
        return el + timeSleptNum[index];
    });

    // aggiusto l'ora
    if (wakeUpTime[0] > 23) {
        wakeUpTime[0] = wakeUpTime[0] - 24;
    }

    // ora sottraggo a wakeUpTime il tempo che avrebbe dovuto dormire, in modo da ottenere l'orario corretto in cui andare a letto
    const idealSleepTime = [8, 0];
    const bedTime = wakeUpTime.map((el, index) => {
        // sottraggo i due array
        return el - idealSleepTime[index];
    });

    // aggiusto l'ora
    if (bedTime[0] < 0) {
        bedTime[0] = bedTime[0] + 24;
    }

    // converto l'array in stringa es. [23, 00] in '23:00'
    const bedTimeString = bedTime.map((el) => {
        // aggiungo lo zero davanti se il numero e' minore di 10
        return el < 10 ? "0" + el : el;
    });

    return bedTimeString.join(":");
}

export default timestampToSleep;
