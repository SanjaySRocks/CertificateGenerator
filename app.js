const express = require('express');
const cors = require('cors');

// Pdf lib
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

// Fs
const fs = require('fs').promises;

const { connectToDatabase } = require('./database/mongodb');
const Certificate = require('./models/certificates');

// Express Js
const app = express();
const port = 3000; // or any port of your choice

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for form data
app.use(cors());

// Connect Database
connectToDatabase();

// Create certificates folder if not exists
const certificatesDir = './certificates'; // Directory path

async function createCertificatesDir() {
  try {
    // Check if the directory exists
    await fs.access(certificatesDir);
    console.log(`${certificatesDir} already exists.`);
  } catch (error) {
    // Create the directory if it doesn't exist
    await fs.mkdir(certificatesDir);
    console.log(`${certificatesDir} created successfully.`);
  }
}

createCertificatesDir().catch(error => {
  console.error('Error:', error);
});

app.get('/prunedb', async (req, res)=>{
  try {

    // Delete all documents (certificates) from the collection
    var result = await Certificate.deleteMany();
  } catch (error) {
    console.error('Error:', error);
  }

  return res.status(200).json({ status: `${result.deletedCount} certificates deleted.` })
})

// Download File Route
app.get('/download/:id', (req, res) => {
  const fileid = req.params.id;

  const file = `${__dirname}/certificates/${fileid}`;
  res.download(file);
});

// Generate Route
app.post('/generate', async (req, res) => {
  const { fullName, phoneNo, email } = req.body;

  var duplicateKey = null;
  var pdf = null;

  if (!fullName || !phoneNo || !email)
    return res.status(200).json({ status: "error", message: "Bad Request Check all required fields!" })

  // Save in Database
  try {
    var Cert = new Certificate({
      fullName: fullName,
      phoneNo: phoneNo,
      email: email
    })

    // Generate Certificate File and Save
    pdf = await createCertficatePdf(Cert._id, fullName);

    var Cert = await Cert.save();
    
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      console.error('Duplicate Data');

      const duplicateKey = Object.keys(error.keyValue)[0];
      const existingDocument = await Certificate.findOne({ [duplicateKey]: error.keyValue[duplicateKey] });
      
      try{
        var existingPdf = await fs.readFile("certificates/"+existingDocument._id.toString()+".pdf")
      }
      catch(e)
      {
        return res.status(200).json({ error: e});
      }

      const base64String = existingPdf.toString('base64');
      const fileName = `${existingDocument._id.toString()}.pdf`

      // Duplicate Data
      return res.status(200).json(
        {
          status: "success", CertificateDetails: existingDocument,
          file: { fileName: fileName, contentType: 'application/pdf', data: base64String }
        });
    } else {
      console.error('Error saving document:', error);
    }

    return;
  }


  res.status(201).json(
    {
      status: "success", CertificateDetails: Cert,
      file: { pdf }
    });

});

async function createCertficatePdf(certificate_id, certificate_name)
{
  try {
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
    const textWidth = courierBoldText.widthOfTextAtSize(certificate_name, fontSize);

    // Calculate the horizontal center position
    const centerX = (firstPage.getWidth() - textWidth) / 2;
    var date = new Date();
    //const currentTimestamp = Math.floor(new Date().getTime() / 1000);

    // Print Date Id
    firstPage.drawText(date.toISOString().slice(0, 10), {
      x: width - 140,
      y: 80,
      size: fontSize - 16,
      font: courierBoldText,
      color: rgb(0, 0, 0),
    })

    // Print Certificate ID
    firstPage.drawText(certificate_id.toString(), {
      x: 80,
      y: height / 2 + 106,
      size: fontSize - 16,
      font: courierBoldText,
      color: rgb(0, 0, 0),
    })

    // Print Name
    firstPage.drawText(certificate_name, {
      x: centerX,
      y: height / 2 - 14,
      size: fontSize,
      font: TimesRoman,
      color: rgb(0.95, 0.1, 0.1),
    })

    var pdfBytes = await pdfDoc.save()

    // Bytes to Base64
    var base64String = Buffer.from(pdfBytes).toString('base64');
    var fileName = `${certificate_id.toString()}.pdf`

    // Save Pdf File Locally

    try{
      await fs.writeFile('certificates/' + fileName, pdfBytes);
    }
    catch(error)
    {
      console.log(error); 
    }
    
    // developement mode
    // await fs.writeFile(`certificates/generated-pdf.pdf`, pdfBytes);
    return { fileName: fileName, contentType: 'application/pdf', data: base64String }
  }
  catch (error) {
    console.log("Error in Creating Certificate: ", error);
    return;
  }
}

// Default Route
app.get('/', (req, res) => {
  res.status(200).json(
    { 
      apiName: "Certificate Generate API", 
      author: "https://github.com/sanjaysrocks", 
      Usage: "To Create Certificate Use /generate endpoint (post request)" 
    })
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
