const express = require('express');
const app = express();
const port = 3000; // or any port of your choice

app.use(express.json());

const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;


app.get('/download', (req,res) =>{
  const file = `${__dirname}/certificates/generated-pdf.pdf`;
  res.download(file);
});


app.get('/gen/:name', async (req,res) => {

  const name = req.params.name;

  const url = __dirname + '/GreenIndiaCert.pdf';
  const existingPdfBytes = await fs.readFile(url);

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const TimesRoman = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const fontSize = 30;

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  // Calculate the width of the text
  const textWidth = helveticaFont.widthOfTextAtSize(name, fontSize);

  // Calculate the horizontal center position
  const centerX = (firstPage.getWidth() - textWidth) / 2;

  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  
  // Print Certificate ID
  firstPage.drawText(currentTimestamp.toString(), {
    x: 40,
    y: height/2 + 140,
    size: fontSize - 16,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  })

  // Print Name
  firstPage.drawText(name, {
    x: centerX,
    y: height / 2 - 14,
    size: fontSize,
    font: TimesRoman,
    color: rgb(0.95, 0.1, 0.1),
  })

  const pdfBytes = await pdfDoc.save()
  // await fs.writeFile(`certificates/GreenIndiaCert-${currentTimestamp}.pdf`, pdfBytes);
  await fs.writeFile(`certificates/generated-pdf.pdf`, pdfBytes);

  res.json({ status: "success", message: name, certficateId: currentTimestamp, certificateFile: 'http://localhost:3000/certificates/generated-pdf.pdf'});

});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
