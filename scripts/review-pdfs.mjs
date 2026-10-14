import fs from 'node:fs';
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas';
Object.assign(globalThis,{DOMMatrix,ImageData,Path2D});
const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
const files=['C:/Users/pc/Downloads/Home (desktop).pdf','C:/Users/pc/Downloads/screencapture-springhillhotelandsuites-2026-10-14-13_14_34.pdf'];
for(let i=0;i<files.length;i++){
 const doc=await getDocument({data:new Uint8Array(fs.readFileSync(files[i])),useSystemFonts:true}).promise;
 const texts=[];
 for(let n=1;n<=doc.numPages;n++){
 const page=await doc.getPage(n);const initial=page.getViewport({scale:1});const viewport=page.getViewport({scale:Math.min(1100/initial.width,6500/initial.height)});
 const canvas=createCanvas(Math.ceil(viewport.width),Math.ceil(viewport.height));await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
 fs.writeFileSync(`tmp/references/reference-${i+1}-${n}.png`,canvas.toBuffer('image/png'));
 texts.push((await page.getTextContent()).items.map(item=>item.str).join(' '));
 }
 fs.writeFileSync(`tmp/references/reference-${i+1}.txt`,texts.join('\n'));console.log(`${files[i]}: ${doc.numPages} pages rendered`);
}
