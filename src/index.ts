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


    const read_file_sync = fs.readFileSync(parameters.src);
    const pdf_doc = await pdf_lib.PDFDocument.load(read_file_sync);
    const pages = pdf_doc.getPages();

    for (const [index, page] of pages.entries()) {
        // add a page number to the lower right corner of the page
        const {width, height} = page.getSize();
        const font = await pdf_doc.embedFont(pdf_lib.StandardFonts.Helvetica);
        const font_size = 12;
        const text = `Page ${index + 1} of ${pages.length}`;
        const text_width = font.widthOfTextAtSize(text, font_size);
        const text_height = font.heightAtSize(font_size);
        const text_x = width - text_width - 50;
        const text_y = text_height + 30;
        page.drawText(text, {
            x: text_x,
            y: text_y,
            size: font_size,
            font: font,
            color: pdf_lib.rgb(0, 0, 0),
        });
    }

    const pdfBytes = await pdf_doc.save();
    fs.writeFileSync(parameters.out, pdfBytes, 'binary');
}

main();
