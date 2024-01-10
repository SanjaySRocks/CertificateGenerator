const express = require('express');
const cors = require('cors');

// Pdf lib
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

// Fs
const fs = require('fs').promises;

// Express Js
const app = express();
const port = 3000; // or any port of your choice

app.use(express.json());
app.use(cors());


// Download File Route
app.get('/download/:id', (req,res) =>{
  const fileid = req.params.id;

  const file = `${__dirname}/certificates/${fileid}`;
  res.download(file);
});

// Generate Route
app.post('/generate', async (req,res) => {
  const name = req.body.name;

  if(!name)
    return res.status(200).json({status:"error", message: "Invalid Certificate Name"})

  const url = __dirname + '/certificate.pdf';
  const existingPdfBytes = await fs.readFile(url);

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const courierBoldText = await pdfDoc.embedFont(StandardFonts.CourierBold)
  const TimesRoman = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

  const fontSize = 30;
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  // Calculate the width of the text
  const textWidth = courierBoldText.widthOfTextAtSize(name, fontSize);

  // Calculate the horizontal center position
  const centerX = (firstPage.getWidth() - textWidth) / 2;
  const date = new Date();
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  
  // Print Date Id
  firstPage.drawText(date.toISOString().slice(0,10), {
    x: width -140,
    y: 80,
    size: fontSize - 16,
    font: courierBoldText,
    color: rgb(0, 0, 0),
  })

  // Print Certificate ID
  firstPage.drawText(currentTimestamp.toString(), {
    x: 80,
    y: height/2 + 106,
    size: fontSize - 16,
    font: courierBoldText,
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
  const base64String = Buffer.from(pdfBytes).toString('base64');

  const fileName = `GreenIndiaCert-${currentTimestamp}.pdf`

  await fs.writeFile('certificates/'+fileName, pdfBytes);
  
  // developement mode
  // await fs.writeFile(`certificates/generated-pdf.pdf`, pdfBytes);

  res.status(201).json(
    { 
      status: "success", message: name, certficateId: currentTimestamp, 
      file:{ fileName: fileName, contentType: 'application/pdf', data: base64String }
    });

});

// Default Route
app.get('/',(req, res)=>{
  res.status(200).json({message: "Certificate Generate Rest API", link: "github.com/sanjaysrocks", Usage: "To Create Certificate Use /generate endpoint (post request)"})
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
