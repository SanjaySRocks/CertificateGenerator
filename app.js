const express = require('express');
const app = express();
const port = 3000; // or any port of your choice

app.use(express.json());

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;


app.get('/download/:id', (req,res) =>{
  const fileid = req.params.id;

  const file = `${__dirname}/certificates/${fileid}`;
  res.download(file);
});


app.get('/generate/:name', async (req,res) => {
  const name = req.params.name;

  // const pattern = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;

  // if(!pattern.test(name))
  //   return res.status(200).json({status:"error", message: "Only Alphabets and Numbers allowed in Name"})
  
  const url = __dirname + '/GreenIndiaCert.pdf';
  const existingPdfBytes = await fs.readFile(url);

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const TimesRoman = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const fontSize = 30;

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { height } = firstPage.getSize()

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

  const fileName = `GreenIndiaCert-${currentTimestamp}.pdf`
  await fs.writeFile('certificates/'+fileName, pdfBytes);
  
  // developement mode
  //await fs.writeFile(`certificates/generated-pdf.pdf`, pdfBytes);

  res.status(201).json({ status: "success", message: name, certficateId: currentTimestamp, certificateFile: '/download/'+fileName});

});

app.get('/',(req, res)=>{
  res.status(200).json({message: "Certificate Generate Rest API", link: "github.com/sanjaysrocks", Usage: "To Create Certificate Use /generate/<name> endpoint"})
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
