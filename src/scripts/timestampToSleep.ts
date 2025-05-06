// funzione che, in base al timestamp in cui si è andati a letto (una stringa)
function timestampToSleep(timestamp: string, timeSlept: string[]): string {
    const time = timestamp.split(":").slice(0, 2);
    const timeNum = time.map((el) => parseInt(el));
    const timeSleptNum = timeSlept.map((el) => parseInt(el));

    // Calcolo l'orario di sveglia
    let wakeUpMinutes = timeNum[1] + timeSleptNum[1];
    let wakeUpHours =
        timeNum[0] + timeSleptNum[0] + Math.floor(wakeUpMinutes / 60);
    wakeUpMinutes %= 60;
    wakeUpHours %= 24;

    // Calcolo l'orario ideale per andare a letto
    const idealSleepTime = [8, 0];
    let bedMinutes = wakeUpMinutes - idealSleepTime[1];
    let bedHours = wakeUpHours - idealSleepTime[0];

    if (bedMinutes < 0) {
        bedMinutes += 60;
        bedHours -= 1;
    }
    if (bedHours < 0) {
        bedHours += 24;
    }

    // Converto l'orario in stringa
    const bedTimeString = [
        bedHours < 10 ? "0" + bedHours : bedHours,
        bedMinutes < 10 ? "0" + bedMinutes : bedMinutes,
    ];

    return bedTimeString.join(":");
}

export default timestampToSleep;
