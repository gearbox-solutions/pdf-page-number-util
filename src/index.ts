const pdf_lib = require('pdf-lib');
const fs = require('fs');
const {processArguments} = require('./helperfunctions.js');

async function main() {
    const parameters = processArguments(process.argv);

    if (!parameters.src) {
        throw new Error('PDF source not defined. Please use --src= to set the pdf source');
    }

    if (!parameters.out) {
        throw new Error('Out parameter not defined. Please use --out= to set the path to the output pdf');
    }

    const hexColor = parameters.color ? parameters.color : '#000000';
    const fontSize = parameters.size ? parseInt(parameters.size, 10) : 8;
    const marginBottom = parameters.bottom ? parseInt(parameters.bottom, 10) : 30;
    const marginRight = parameters.right ? parseInt(parameters.right, 10) : 50;

    const rgbColor = hexToRgb(hexColor);


    const read_file_sync = fs.readFileSync(parameters.src);
    const pdf_doc = await pdf_lib.PDFDocument.load(read_file_sync);
    const pages = pdf_doc.getPages();

    // font formatting
    const font = await pdf_doc.embedFont(pdf_lib.StandardFonts.Helvetica);



    for (const [index, page] of pages.entries()) {
        // add a page number to the lower right corner of the page
        const {width} = page.getSize();
        const text = `Page ${index + 1} of ${pages.length}`;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const textHeight = font.heightAtSize(fontSize);
        const textX = width - textWidth - marginRight;
        const textY = textHeight + marginBottom;

        page.drawText(text, {
            x: textX,
            y: textY,
            size: fontSize,
            font: font,
            color: pdf_lib.rgb(rgbColor.r/255, rgbColor.g/255, rgbColor.b/255),
        });
    }

    const pdfBytes = await pdf_doc.save();
    fs.writeFileSync(parameters.out, pdfBytes, 'binary');
}

main();

function hexToRgb(hex){
    // convert hex to rgb
    const hexCode = hex.replace('#', '');
    const r = parseInt(hexCode.substring(0, 2), 16);
    const g = parseInt(hexCode.substring(2, 4), 16);
    const b = parseInt(hexCode.substring(4, 6), 16);

    return {r, g, b};

}
