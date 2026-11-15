'use strict';
const http=require('http'),fs=require('fs'),path=require('path'),zlib=require('zlib');
const root=path.join(__dirname,'dist'),port=process.env.PORT||3000;
const MT={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};
const H={};try{for(const l of fs.readFileSync(path.join(root,'_headers'),'utf8').split('\n'))if(/^\s+\S/.test(l)){const i=l.indexOf(':');H[l.slice(0,i).trim()]=l.slice(i+1).trim()}}catch{}
http.createServer((q,s)=>{
  if(q.method!=='GET'&&q.method!=='HEAD'){s.writeHead(405,{Allow:'GET, HEAD'});return s.end()}
  let u,search;try{const x=new URL(q.url,'http://x');u=decodeURIComponent(x.pathname);search=x.search}catch{s.writeHead(400);return s.end()}
  if(u.includes('\0')){s.writeHead(400);return s.end()}
  if(!path.extname(u)&&!u.endsWith('/')){s.writeHead(301,{Location:u.replace(/^\/+/,'/')+'/'+search});return s.end()}
  let f=path.normalize(path.join(root,u));
  if(f!==root&&!f.startsWith(root+path.sep)){s.writeHead(403);return s.end()}
  if(u.endsWith('/'))f=path.join(f,'index.html');
  fs.readFile(f,(e,b)=>{
    let st=200;
    if(e||path.basename(f).startsWith('_')){st=404;f='x.html';try{b=fs.readFileSync(path.join(root,'404.html'))}catch{b=Buffer.from('Not found')}}
    const ext=path.extname(f),h={...H,'Content-Type':MT[ext]||'application/octet-stream','Cache-Control':ext==='.html'?'no-cache':'public, max-age=86400',Vary:'Accept-Encoding'};
    if(MT[ext]&&/\bgzip\b/.test(q.headers['accept-encoding']||'')){b=zlib.gzipSync(b);h['Content-Encoding']='gzip'}
    h['Content-Length']=b.length;s.writeHead(st,h);s.end(q.method==='HEAD'?undefined:b);
  });
}).listen(port,()=>console.log('http://localhost:'+port));
