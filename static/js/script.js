// CANVAS: NIGHT SKY + SHOOTING STARS
(function(){
  const cv=document.getElementById('bg'),ctx=cv.getContext('2d');
  let W,H,stars=[],shoots=[];

  function resize(){ W=cv.width=window.innerWidth; H=cv.height=window.innerHeight; }

  function initStars(){
    stars=Array.from({length:110},()=>({
      x:Math.random()*W, y:Math.random()*H*.8,
      r:.4+Math.random()*1.8,
      phase:Math.random()*Math.PI*2,
      spd:.3+Math.random()*1.2
    }));
  }

  function mkShoot(){
    return {
      x:Math.random()*W*.7+W*.1,
      y:Math.random()*H*.4,
      len:80+Math.random()*140,
      spd:8+Math.random()*10,
      angle:Math.PI/5+Math.random()*.3,
      alpha:1, life:0, maxLife:40+Math.random()*30
    };
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    // BG gradient - lighter brown
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#18100a'); g.addColorStop(.55,'#201408'); g.addColorStop(1,'#18100a');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

    const t=Date.now()/1000;

    // Twinkle stars
    stars.forEach(s=>{
      const al=.15+.65*(0.5+0.5*Math.sin(s.phase+t*s.spd));
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(248,230,190,${al})`; ctx.fill();
    });

    // Moon
    const mx=W*.82,my=75;
    const rg=ctx.createRadialGradient(mx,my,0,mx,my,170);
    rg.addColorStop(0,'rgba(220,160,50,.14)'); rg.addColorStop(.6,'rgba(220,160,50,.05)'); rg.addColorStop(1,'transparent');
    ctx.fillStyle=rg; ctx.fillRect(0,0,W,H);
    const rm=ctx.createRadialGradient(mx-16,my-16,0,mx,my,50);
    rm.addColorStop(0,'#fff8e7'); rm.addColorStop(.5,'#ecc06a'); rm.addColorStop(1,'#b87820');
    ctx.beginPath(); ctx.arc(mx,my,50,0,Math.PI*2); ctx.fillStyle=rm; ctx.fill();
    ctx.beginPath(); ctx.arc(mx+20,my-10,44,0,Math.PI*2);
    ctx.fillStyle='rgba(24,16,10,.75)'; ctx.fill();

    // Shooting stars
    if(Math.random()<.008 && shoots.length<3) shoots.push(mkShoot());
    shoots=shoots.filter(s=>{
      s.life++; s.x+=Math.cos(s.angle)*s.spd; s.y+=Math.sin(s.angle)*s.spd;
      s.alpha=Math.max(0,1-s.life/s.maxLife);
      if(s.alpha<=0) return false;
      const tail={x:s.x-Math.cos(s.angle)*s.len,y:s.y-Math.sin(s.angle)*s.len};
      const sg=ctx.createLinearGradient(tail.x,tail.y,s.x,s.y);
      sg.addColorStop(0,'rgba(255,240,200,0)');
      sg.addColorStop(1,`rgba(255,240,200,${s.alpha*0.9})`);
      ctx.beginPath(); ctx.moveTo(tail.x,tail.y); ctx.lineTo(s.x,s.y);
      ctx.strokeStyle=sg; ctx.lineWidth=1.5; ctx.stroke();
      // head glow
      ctx.beginPath(); ctx.arc(s.x,s.y,2.5,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,248,220,${s.alpha})`; ctx.fill();
      return true;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize',()=>{resize();initStars();});
  resize();initStars();draw();
})();

// KNOWLEDGE BASE
const SYMPTOMS=[
  {id:'G01',text:'Sulit memulai tidur meski merasa mengantuk',sub:'Berbaring di tempat tidur tetapi pikiran tidak bisa berhenti dan sulit terlelap.'},
  {id:'G02',text:'Sering terbangun di tengah malam',sub:'Tidur terasa terpotong-potong dan sulit melanjutkan tidur setelah terbangun.'},
  {id:'G03',text:'Terbangun terlalu dini dan tidak bisa tidur lagi',sub:'Bangun jauh sebelum waktu yang diinginkan dan tidak mampu melanjutkan tidur.'},
  {id:'G04',text:'Mendengkur dengan suara keras',sub:'Orang di sekitar atau kamu sendiri menyadari suara dengkuran keras saat tidur.'},
  {id:'G05',text:'Napas terputus atau tersedak saat tidur',sub:'Pernah diinformasikan bahwa napas berhenti sesaat lalu terengah-engah saat tidur.'},
  {id:'G06',text:'Kantuk berlebihan di siang hari',sub:'Sangat mengantuk di siang hari meski merasa sudah cukup tidur malam sebelumnya.'},
  {id:'G07',text:'Sering sakit kepala saat bangun pagi',sub:'Hampir setiap pagi terbangun dengan rasa sakit atau berat di kepala.'},
  {id:'G08',text:'Kaki terasa tidak nyaman saat akan tidur',sub:'Ada dorongan kuat untuk menggerakkan kaki karena rasa tidak nyaman atau merayap.'},
  {id:'G09',text:'Sensasi merayap atau kesemutan di kaki saat malam',sub:'Rasa tidak enak di kaki yang memburuk saat istirahat dan membaik jika digerakkan.'},
  {id:'G10',text:'Tiba-tiba lemas atau jatuh saat mengalami emosi kuat',sub:'Otot mendadak lemas ketika tertawa, marah, atau terkejut.'},
  {id:'G11',text:'Melihat atau mendengar hal aneh saat mau tidur atau bangun',sub:'Halusinasi visual atau suara yang terasa nyata di ambang tidur atau baru bangun.'},
  {id:'G12',text:'Tidak bisa bergerak sesaat setelah bangun tidur',sub:'Merasa sadar tetapi tubuh tidak bisa digerakkan selama beberapa detik (sleep paralysis).'},
  {id:'G13',text:'Mimpi buruk berulang yang terasa sangat nyata',sub:'Mimpi menakutkan yang berulang dan membuat terbangun dalam keadaan panik.'},
  {id:'G14',text:'Berteriak, bicara, atau berjalan saat tidur',sub:'Dilaporkan melakukan gerakan atau bicara tanpa sadar saat sedang tidur.'},
  {id:'G15',text:'Tidur cukup tetapi tetap sangat lelah saat bangun',sub:'Durasi tidur cukup, tetapi bangun pagi tidak terasa segar sama sekali.'},
  {id:'G16',text:'Mudah marah atau suasana hati buruk akibat kurang tidur',sub:'Masalah tidur membuat lebih sensitif atau mudah marah tanpa sebab yang jelas.'},
  {id:'G17',text:'Sulit berkonsentrasi atau fokus di siang hari',sub:'Otak terasa lamban, sulit mengingat, atau tidak bisa fokus pada pekerjaan.'},
];

const DISEASES=[
  {name:'Insomnia Kronis',gejala:['G01','G02','G03','G16','G17'],min:3,desc:'Insomnia kronis ditandai dengan kesulitan tidur yang terjadi setidaknya 3 malam per minggu selama lebih dari 3 bulan. Kondisi ini berdampak signifikan pada fungsi harian, suasana hati, dan kemampuan konsentrasi.',saran:['Terapkan jadwal tidur dan bangun yang konsisten setiap hari, termasuk akhir pekan.','Hindari kafein setelah pukul 14.00 dan layar elektronik minimal 1 jam sebelum tidur.','Teknik relaksasi seperti pernapasan dalam atau progressive muscle relaxation dapat membantu.','Konsultasi ke dokter atau psikolog untuk terapi CBT-I (Cognitive Behavioral Therapy for Insomnia).'],ref:'ICSD-3 — Chronic Insomnia Disorder'},
  {name:'Sleep Apnea Obstruktif',gejala:['G04','G05','G06','G07','G15'],min:3,desc:'Sleep apnea terjadi ketika saluran napas atas tersumbat berulang kali saat tidur sehingga napas terhenti sesaat. Kondisi ini sering tidak disadari dan berdampak besar pada kualitas tidur.',saran:['Segera konsultasi ke dokter spesialis tidur atau dokter THT.','Pemeriksaan polysomnography (sleep study) biasanya diperlukan untuk diagnosis pasti.','Terapi CPAP (Continuous Positive Airway Pressure) adalah penanganan utama sleep apnea.','Menjaga berat badan ideal dan tidur miring dapat membantu mengurangi gejala.'],ref:'ICSD-3 — Obstructive Sleep Apnea, Adult'},
  {name:'Restless Leg Syndrome',gejala:['G08','G09','G01','G02'],min:2,desc:'Restless Leg Syndrome (RLS) adalah gangguan neurologis yang menyebabkan dorongan kuat untuk menggerakkan kaki, disertai sensasi tidak nyaman yang memburuk saat istirahat dan membaik saat bergerak.',saran:['Konsultasi ke dokter neurologi untuk evaluasi lebih lanjut.','Pemeriksaan kadar zat besi dan ferritin darah dianjurkan karena berkaitan dengan RLS.','Mengurangi konsumsi kafein dan alkohol dapat meringankan gejala.','Pijat ringan dan kompres hangat pada kaki sebelum tidur kadang membantu.'],ref:'ICSD-3 — Restless Legs Syndrome'},
  {name:'Narkolepsi',gejala:['G06','G10','G11','G12'],min:2,desc:'Narkolepsi adalah gangguan tidur neurologis kronis yang ditandai dengan rasa kantuk ekstrem di siang hari. Kelemahan otot mendadak saat emosi (cataplexy) adalah ciri khas narkolepsi tipe 1.',saran:['Segera konsultasi ke dokter neurologi atau spesialis tidur.','Diagnosis memerlukan tes khusus seperti MSLT (Multiple Sleep Latency Test).','Penanganan meliputi obat-obatan dan modifikasi gaya hidup seperti tidur siang singkat terjadwal.','Hindari mengemudi atau mengoperasikan mesin berat sebelum kondisi terkontrol.'],ref:'ICSD-3 / DSM-5 — Narcolepsy Type 1 & 2'},
  {name:'Parasomnia (REM Sleep Behavior Disorder)',gejala:['G13','G14','G02'],min:2,desc:'Parasomnia meliputi perilaku tidak normal saat tidur seperti mimpi buruk intens, berteriak, berjalan, atau bertindak sesuai isi mimpi. Pada REM Sleep Behavior Disorder, atonia otot normal tidak terjadi saat fase REM.',saran:['Konsultasi ke dokter neurologi atau psikiater untuk evaluasi lebih lanjut.','Amankan lingkungan tidur dengan menyingkirkan benda tajam untuk mencegah cedera.','Tidur teratur dan manajemen stres dapat mengurangi frekuensi episode.','Jangan membangunkan secara mendadak saat episode terjadi, cukup pastikan keamanannya.'],ref:'ICSD-3 — REM Sleep Behavior Disorder'},
  {name:'Hipersomnia',gejala:['G06','G15','G16','G17'],min:3,desc:'Hipersomnia ditandai dengan rasa kantuk berlebihan di siang hari meski durasi tidur malam sudah cukup. Berbeda dengan narkolepsi, tidur siang pada hipersomnia biasanya tidak membuat lebih segar.',saran:['Konsultasi ke dokter untuk menyingkirkan penyebab organik seperti anemia atau hipotiroid.','Pertimbangkan pemeriksaan polysomnography untuk evaluasi kualitas tidur menyeluruh.','Hindari alkohol dan obat-obatan yang memperparah kantuk.','Jadwal tidur konsisten dan paparan cahaya matahari pagi dapat membantu regulasi sirkadian.'],ref:'ICSD-3 / DSM-5 — Idiopathic Hypersomnia'},
  {name:'Sleep Paralysis Terisolasi',gejala:['G12','G11'],min:2,desc:'Sleep paralysis terisolasi adalah kondisi di mana seseorang sadar namun tidak dapat bergerak sesaat saat bangun tidur, sering disertai halusinasi. Kondisi ini umum dan biasanya tidak berbahaya.',saran:['Prioritaskan tidur cukup dengan jadwal konsisten karena kurang tidur memperparah kondisi.','Tidur telentang meningkatkan risiko sleep paralysis, coba posisi miring.','Manajemen stres dan kecemasan dapat mengurangi frekuensi kejadian.','Jika sangat sering dan mengganggu, konsultasi ke dokter untuk evaluasi lebih lanjut.'],ref:'ICSD-3 — Isolated Sleep Paralysis'},
];

// STATE
let current=0;
const answers={};

function goHome(){ document.getElementById('landing').style.display='flex'; document.getElementById('app').style.display='none'; document.querySelector('.hdr').classList.remove('visible'); resetQuiz(true); }
function goApp(){ document.getElementById('landing').style.display='none'; document.getElementById('app').style.display='block'; document.querySelector('.hdr').classList.add('visible'); window.scrollTo({top:0}); }

function renderQ(){
  const q=SYMPTOMS[current],total=SYMPTOMS.length;
  document.getElementById('qNum').textContent=`Pertanyaan ${String(current+1).padStart(2,'0')}`;
  document.getElementById('qText').textContent=q.text;
  document.getElementById('qSub').textContent=q.sub;
  document.getElementById('progFill').style.width=`${(current/total)*100}%`;
  document.getElementById('progTxt').textContent=`${current} / ${total}`;
  const card=document.getElementById('qCard');
  card.classList.remove('slide-in'); void card.offsetWidth; card.classList.add('slide-in');
}

function answer(val){
  answers[SYMPTOMS[current].id]=val; current++;
  if(current>=SYMPTOMS.length){ showLoading(); } else { renderQ(); }
}

function showLoading(){
  document.getElementById('quizSection').style.display='none';
  document.getElementById('loading').style.display='block';
  setTimeout(diagnose,1600);
}

function diagnose(){
  const symMap=Object.fromEntries(SYMPTOMS.map(s=>[s.id,s.text]));
  const results=DISEASES.map(d=>{
    const matched=d.gejala.filter(g=>answers[g]===true);
    return matched.length>=d.min?{...d,matchCount:matched.length,total:d.gejala.length,conf:Math.round(matched.length/d.gejala.length*100),matchedTexts:matched.map(g=>symMap[g])}:null;
  }).filter(Boolean).sort((a,b)=>b.conf-a.conf);

  document.getElementById('loading').style.display='none';
  document.getElementById('result').style.display='block';
  const cont=document.getElementById('resultContent');

  if(!results.length){
    cont.innerHTML=`<div class="no-match fade-up"><h2>Tidak Terdeteksi Gangguan Tidur</h2><p>Berdasarkan gejala yang kamu laporkan, sistem tidak menemukan pola yang cocok. Kamu mungkin hanya perlu menjaga konsistensi waktu tidur. Jika gejala berlanjut, tetap konsultasikan ke dokter.</p></div>`;
    return;
  }

  const top=results[0];
  let html=`<div class="r-hero fade-up"><div class="r-lbl">Kemungkinan Diagnosis</div><div class="r-name">${top.name}</div><div class="r-conf">${top.matchCount} dari ${top.total} gejala cocok (${top.conf}%)</div><div class="conf-bar-w"><div class="conf-bar-f" id="confBar"></div></div></div>
  <div class="sec-card fade-up"><h3>Tentang Kondisi Ini</h3><p>${top.desc}</p></div>
  <div class="sec-card fade-up"><h3>Gejala yang Kamu Alami</h3><div class="tag-list">${top.matchedTexts.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>
  <div class="sec-card fade-up"><h3>Saran dan Tindak Lanjut</h3><ul class="saran-ul">${top.saran.map(s=>`<li>${s}</li>`).join('')}</ul></div>`;
  if(results.length>1) html+=`<div class="sec-card fade-up"><h3>Kemungkinan Lain</h3><ul class="other-ul">${results.slice(1,3).map(r=>`<li><span>${r.name}</span><span class="match-b">${r.matchCount}/${r.total} gejala</span></li>`).join('')}</ul></div>`;
  html+=`<div class="sec-card fade-up"><h3>Referensi Medis</h3><p style="font-size:13px;">${top.ref}</p></div>`;
  cont.innerHTML=html;
  setTimeout(()=>{ const b=document.getElementById('confBar'); if(b) b.style.width=top.conf+'%'; },200);
}

function resetQuiz(silent){
  current=0; Object.keys(answers).forEach(k=>delete answers[k]);
  document.getElementById('result').style.display='none';
  document.getElementById('loading').style.display='none';
  document.getElementById('quizSection').style.display='block';
  document.getElementById('resultContent').innerHTML='';
  document.getElementById('progFill').style.width='0%';
  document.getElementById('progTxt').textContent=`0 / ${SYMPTOMS.length}`;
  renderQ();
  if(!silent) window.scrollTo({top:0,behavior:'smooth'});
}

renderQ();
