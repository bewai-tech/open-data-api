import { initBaseAdresseNationale, initDepartementsFranceTable, initSireneTable } from '../tables';

export const initTables = async () => {
    await initSireneTable();
    await initDepartementsFranceTable();
    await initBaseAdresseNationale();

    process.exit(0);
};
initTables();

// Exit message
process.on('exit', function (code) {
    if (code === 0) {
        console.log('\nSuccess!');
    } else {
        console.log(`\nProcess exited with code ${code}.`);
    }

    return;
});