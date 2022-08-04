import path from "path";
import { getEmails } from "./db/user-db"
const XLSX = require("xlsx");
const d = async () => {
    // await exportUser();
}

const exportUser = async (emails: any) => {
    // const emails = await getEmails();
    const wb = XLSX.utils.book_new();
    const cols = [
        { field: 'email', header: 'Email', },
    ];
    const data = emails.map((email: any) => [email]);
    console.log(data);
    const ws = XLSX.utils.aoa_to_sheet([[...cols.map(header => header.header.toUpperCase())], ...data]);
    XLSX.utils.book_append_sheet(wb, ws, 'title');
    XLSX.writeFile(wb, 'all-users.xlsx');
};

const readEmails = async () => {
    const readXlsxFile = require('read-excel-file/node')
    const r = await readXlsxFile('files/rimani.xlsx');
    const rimani = r.map((e:any)=>e[0])
    const b = await readXlsxFile('files/bacan.xlsx');
    const bacan = b.map((e:any)=>e[0])
    console.log(rimani, bacan);

    const all = Array.from(new Set([...bacan, ...rimani]));
    
    await exportUser(all);
    // const bacan = await readXlsxFile('files/bacan.xlsx');
}
readEmails();