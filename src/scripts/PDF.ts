import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { User } from '../contesto/UserContext';
import { SleepStageType } from './extractSleepStages';

export const exportToPDF = async (data: string, user: User, sleepStages?: SleepStageType) => {

    const tempoDormito = document.getElementById('tempoDormito');
    const element = document.getElementById('container3');
    const element2 = document.getElementById('contenitore');

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    if (element && element2 && tempoDormito) {
        const tempoDormitoData = await toPng(tempoDormito, {
            skipFonts: true,
        });

        const imgData = await toPng(element, {
            skipFonts: true,

        });
        const imgData2 = await toPng(element2, {
            skipFonts: true,
        });

        doc.setFontSize(25);
        doc.text('SLEEP MONITOR', pageWidth / 2, 10, {
            align: 'center',
        });



        doc.setFontSize(15);
        doc.text(`Report di oggi`, pageWidth / 2, 20, {
            align: 'center',
        });

        doc.addImage(tempoDormitoData, 'PNG', 10, 25, 100, 85);

        doc.addImage(imgData2, 'PNG', 110, 25, 105, 85);

        const sleepStagesStr =
            Array.isArray(sleepStages) && sleepStages.length > 0
                ? sleepStages
                    .map((s) => {
                        if (s.number < 60) {
                            return `${s.nome}: ${s.number} minuti`;
                        } else {
                            return `${s.nome}: ${Math.floor(s.number / 60)} ore e ${s.number % 60} minuti`;
                        }
                    })
                    .join(" - ")
                : "N/A";

        doc.setFontSize(12);
        doc.text(`${sleepStagesStr}`, pageWidth / 2, 130, {
            align: 'center',
        });

        doc.addImage(imgData, 'PNG', 10, 140, 180, 90);

        doc.setFontSize(10);
        doc.text(` ${data} - ${user.Nome} ${user.Cognome} ${user.dataNascita} \nReport generato automaticamente • © 2025`, pageWidth / 2, pageHeight - 10, {
            align: 'center',
        });
        doc.save('report.pdf');
    }
};
