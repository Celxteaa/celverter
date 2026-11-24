'use strict';
const http=require('http'),fs=require('fs'),path=require('path'),zlib=require('zlib'),crypto=require('crypto');
const root=path.join(__dirname,'dist'),port=process.env.PORT||3000;
const MT={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};
/* only the first (/*) block of _headers applies to every response; later blocks (e.g. /assets/*) are for static hosts */
const H={};try{let seen=false;for(const l of fs.readFileSync(path.join(root,'_headers'),'utf8').split('\n')){if(/^\S/.test(l)){if(seen)break;seen=true;continue}if(/^\s+\S/.test(l)){const i=l.indexOf(':');H[l.slice(0,i).trim()]=l.slice(i+1).trim()}}}catch{}
const GZ=new Map(); /* gzip once per distinct file content instead of on every request */
const gz=b=>{const k=crypto.createHash('md5').update(b).digest('hex');let z=GZ.get(k);if(!z){z=zlib.gzipSync(b);if(GZ.size>1000)GZ.clear();GZ.set(k,z)}return z};
const server=http.createServer((q,s)=>{
  try{
    if(q.method!=='GET'&&q.method!=='HEAD'){s.writeHead(405,{Allow:'GET, HEAD'});return s.end()}
    let u,search,raw;try{const x=new URL(q.url,'http://x');raw=x.pathname;u=decodeURIComponent(x.pathname);search=x.search}catch{s.writeHead(400);return s.end()}
    if(u.includes('\0')){s.writeHead(400);return s.end()}
    /* redirect from the still-encoded path: a decoded %0d%0a would put line breaks into the Location header */
    if(!path.extname(u)&&!u.endsWith('/')){s.writeHead(301,{Location:raw.replace(/^\/+/,'/')+'/'+search});return s.end()}
    let f=path.normalize(path.join(root,u));
    if(f!==root&&!f.startsWith(root+path.sep)){s.writeHead(403);return s.end()}
    if(u.endsWith('/'))f=path.join(f,'index.html');
    fs.readFile(f,(e,b)=>{
      try{
        let st=200;
        if(e||path.basename(f).startsWith('_')){st=404;f='x.html';try{b=fs.readFileSync(path.join(root,'404.html'))}catch{b=Buffer.from('Not found')}}
        const ext=path.extname(f),versioned=/(^|[?&])v=/.test(search)&&(ext==='.js'||ext==='.css');
        const h={...H,'Content-Type':MT[ext]||'application/octet-stream','Cache-Control':ext==='.html'?'no-cache':versioned?'public, max-age=31536000, immutable':'public, max-age=86400',Vary:'Accept-Encoding'};
        if(MT[ext]&&/\bgzip\b/.test(q.headers['accept-encoding']||'')){b=gz(b);h['Content-Encoding']='gzip'}
        h['Content-Length']=b.length;s.writeHead(st,h);s.end(q.method==='HEAD'?undefined:b);
      }catch(err){console.error(err);if(!s.headersSent)s.writeHead(500);s.end()}
    });
  }catch(err){console.error(err);if(!s.headersSent)s.writeHead(500);s.end()}
});
server.on('clientError',(e,sock)=>{if(sock.writable)sock.end('HTTP/1.1 400 Bad Request\r\n\r\n')});
process.on('uncaughtException',e=>console.error('uncaught:',e));
server.listen(port,()=>console.log('http://localhost:'+port));
