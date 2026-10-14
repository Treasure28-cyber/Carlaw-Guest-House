import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const pages=['','rooms','amenities','gallery','about','contact'];
let links=0;
for(const page of pages){
 const html=fs.readFileSync(path.join('dist',page,'index.html'),'utf8');
 assert.match(html,/<main id="main">/);assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/name="description"/);
 assert.equal((html.match(/<h1>/g)||[]).length,1,`${page}: one main heading`);
 JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)/)[1]);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)/g)){
 const target=match[1].split('#')[0];let local=path.join('dist',target);if(fs.existsSync(local)&&fs.statSync(local).isDirectory())local=path.join(local,'index.html');
 assert.ok(fs.existsSync(local),`${page}: missing ${target}`);links++;
 }
 assert.ok(!/\[RATE\]|\[EMAIL\]|PASTE REAL|FORM ENDPOINT/.test(html),'No unfinished placeholders');
}
const photos=JSON.parse(fs.readFileSync('dist/assets/photos.json'));assert.equal(photos.length,9);for(const [file] of photos)assert.ok(fs.existsSync('dist/assets/'+file));
console.log(`Passed: six pages, ${links} local links/assets, structured data, nine photographs, and no unfinished placeholders.`);
