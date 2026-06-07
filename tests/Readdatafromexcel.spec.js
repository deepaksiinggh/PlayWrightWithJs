import ExcelJs from 'exceljs';
import {test,expect} from '@playwright/test'

const writeFileExcel = async (sheetpath,cellvalue,replacevalue,coloumn)=>{
const workBook = new ExcelJs.Workbook();
await workBook.xlsx.readFile(sheetpath);
const worksheet = workBook.getWorksheet('Sheet1');
const object = readExcel(worksheet,cellvalue)
const cell = worksheet.getCell(object.rowNumber,object.cellNumber+coloumn);
cell.value=replacevalue;
await workBook.xlsx.writeFile(sheetpath);


}


const readExcel =(worksheet,cellvalue)=>{

    const object  = {rowNumber:-1,cellNumber:-1}
    worksheet.eachRow((row,rownumber)=>{

    row.eachCell((cell,coulmnyumber)=>{
        console.log(cell.value);
        if(cell.value===cellvalue){
           object.rowNumber=rownumber;
           object.cellNumber=coulmnyumber;
        }
    })
})

return object;
}
 

test('upload download excel validation', async ({ page }) => {
    const fruits ="Apple";
    const price = "550";
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;

    const filePath = 'C:/Users/tdeep/Downloads/download.xlsx';

    await download.saveAs(filePath);

    await writeFileExcel(
        filePath,
        fruits,
        price,
        2
    );

    await page.locator('#fileinput').setInputFiles(filePath);

    const desiredRow = page.getByRole('row').filter({has:page.getByText(fruits)})
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(price);

});