import { Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell } from "docx";
import * as fs from "fs";
import * as path from "path";

async function generate() {
  // Helper: safe image load; fallback to a 1×1 transparent PNG if missing
  const readImg = (p: string) => {
    try {
      return fs.readFileSync(path.resolve(p));
    } catch {
      // Base64 for a 1×1 transparent PNG
      return Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO7+JfsAAAAASUVORK5CYII=",
        "base64"
      );
    }
  };
  const presidentImg = readImg("public/assets/ken mwanymba.png");
  const treasurerImg = readImg("public/assets/treasue.png");
  const secretaryImg = readImg("public/assets/jared omwandasi.png");

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          children: [new TextRun({ text: "SOCIAL DEMOCRATIC PARTY OF KENYA", bold: true, size: 48 })],
          alignment: "center",
        }),
        new Paragraph({ text: "MEMBERSHIP RECRUITMENT FORM", heading: "Heading1", alignment: "center" }),
        new Paragraph({ children: [new TextRun({ text: "\n" })] }),
        new Paragraph({ text: "Party leadership images will be added here.", alignment: "center", spacing: { after: 200 } }),
        new Paragraph({ text: "\nPlease fill in the member details below:", spacing: { after: 200 } }),
        new Table({
          rows: [
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Full Name" })] }), new TableCell({ children: [new Paragraph({ text: "_________________________" })] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Email" })] }), new TableCell({ children: [new Paragraph({ text: "_________________________" })] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Phone" })] }), new TableCell({ children: [new Paragraph({ text: "_________________________" })] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Address" })] }), new TableCell({ children: [new Paragraph({ text: "_________________________" })] })] }),
          ],
        }),
        new Paragraph({ text: "\nSignature: _________________________   Date: __________" }),
      ],
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve("public/forms/membership_form.docx");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);
  console.log("membership_form.docx generated at", outputPath);
}

generate();
