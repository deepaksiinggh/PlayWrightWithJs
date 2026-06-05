import ExcelJs from 'exceljs';

const readData = async ()=>{
const workBook = new ExcelJs.Workbook();
await workBook.xlsx.readFile("C:/Users/tdeep/Downloads/Grocery_Details.xlsx");
const worksheet = workBook.getWorksheet('Grocery Details');
worksheet.eachRow((row,rownumber)=>{

    row.eachCell((cell,coulmnyumber)=>{
        console.log(cell.value)
    })
})
}

readData();