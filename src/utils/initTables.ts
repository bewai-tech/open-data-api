import { initBaseAdresseNationale, initDepartementsFranceTable, initSireneTable } from '../tables';

const initTables = async () => {

    try {
        await initSireneTable();
        await initDepartementsFranceTable();
        await initBaseAdresseNationale();
    } catch (error) {
        //
    }

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