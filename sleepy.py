from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ── BASIS PENGETAHUAN ──

SYMPTOMS = [
    {'id': 'G01', 'text': 'Sulit memulai tidur meski merasa mengantuk',               'sub': 'Berbaring di tempat tidur tetapi pikiran tidak bisa berhenti dan sulit terlelap.'},
    {'id': 'G02', 'text': 'Sering terbangun di tengah malam',                         'sub': 'Tidur terasa terpotong-potong dan sulit melanjutkan tidur setelah terbangun.'},
    {'id': 'G03', 'text': 'Terbangun terlalu dini dan tidak bisa tidur lagi',          'sub': 'Bangun jauh sebelum waktu yang diinginkan dan tidak mampu melanjutkan tidur.'},
    {'id': 'G04', 'text': 'Mendengkur dengan suara keras',                             'sub': 'Orang di sekitar atau kamu sendiri menyadari suara dengkuran keras saat tidur.'},
    {'id': 'G05', 'text': 'Napas terputus atau tersedak saat tidur',                   'sub': 'Pernah diinformasikan bahwa napas berhenti sesaat, lalu terengah-engah saat tidur.'},
    {'id': 'G06', 'text': 'Kantuk berlebihan di siang hari',                           'sub': 'Sangat mengantuk di siang hari meski merasa sudah cukup tidur malam sebelumnya.'},
    {'id': 'G07', 'text': 'Sering sakit kepala saat bangun pagi',                      'sub': 'Hampir setiap pagi terbangun dengan rasa sakit atau berat di kepala.'},
    {'id': 'G08', 'text': 'Kaki terasa tidak nyaman saat akan tidur',                  'sub': 'Ada dorongan kuat untuk menggerakkan kaki karena rasa tidak nyaman atau merayap.'},
    {'id': 'G09', 'text': 'Sensasi merayap atau kesemutan di kaki saat malam',         'sub': 'Rasa tidak enak di kaki yang memburuk saat istirahat dan membaik jika digerakkan.'},
    {'id': 'G10', 'text': 'Tiba-tiba lemas atau jatuh saat mengalami emosi kuat',      'sub': 'Otot mendadak lemas ketika tertawa, marah, atau terkejut.'},
    {'id': 'G11', 'text': 'Melihat atau mendengar hal aneh saat mau tidur atau bangun','sub': 'Halusinasi visual atau suara yang terasa nyata di ambang tidur atau baru bangun.'},
    {'id': 'G12', 'text': 'Tidak bisa bergerak sesaat setelah bangun tidur',           'sub': 'Merasa sadar tetapi tubuh tidak bisa digerakkan selama beberapa detik (sleep paralysis).'},
    {'id': 'G13', 'text': 'Mimpi buruk berulang yang terasa sangat nyata',             'sub': 'Mimpi menakutkan yang berulang dan membuat terbangun dalam keadaan panik.'},
    {'id': 'G14', 'text': 'Berteriak, bicara, atau berjalan saat tidur',               'sub': 'Dilaporkan melakukan gerakan atau bicara tanpa sadar saat sedang tidur.'},
    {'id': 'G15', 'text': 'Tidur cukup tetapi tetap sangat lelah saat bangun',         'sub': 'Durasi tidur cukup, tetapi bangun pagi tidak terasa segar.'},
    {'id': 'G16', 'text': 'Mudah marah atau suasana hati buruk akibat kurang tidur',   'sub': 'Masalah tidur membuat lebih sensitif atau mudah marah tanpa sebab yang jelas.'},
    {'id': 'G17', 'text': 'Sulit berkonsentrasi atau fokus di siang hari',             'sub': 'Otak terasa lamban, sulit mengingat, atau tidak bisa fokus pada pekerjaan.'},
]

DISEASES = [
    {
        'name':      'Insomnia Kronis',
        'gejala':    ['G01', 'G02', 'G03', 'G16', 'G17'],
        'min_match': 3,
        'desc':      'Insomnia kronis ditandai dengan kesulitan tidur yang terjadi setidaknya 3 malam per minggu selama lebih dari 3 bulan. Kondisi ini berdampak signifikan pada fungsi harian, suasana hati, dan kemampuan konsentrasi.',
        'saran': [
            'Terapkan jadwal tidur dan bangun yang konsisten setiap hari, termasuk akhir pekan.',
            'Hindari kafein setelah pukul 14.00 dan hindari layar elektronik minimal 1 jam sebelum tidur.',
            'Teknik relaksasi seperti pernapasan dalam atau progressive muscle relaxation dapat membantu.',
            'Konsultasi ke dokter atau psikolog untuk terapi CBT-I (Cognitive Behavioral Therapy for Insomnia).',
        ],
        'ref': 'ICSD-3 — Chronic Insomnia Disorder',
    },
    {
        'name':      'Sleep Apnea Obstruktif',
        'gejala':    ['G04', 'G05', 'G06', 'G07', 'G15'],
        'min_match': 3,
        'desc':      'Sleep apnea terjadi ketika saluran napas atas tersumbat berulang kali saat tidur sehingga napas terhenti sesaat. Kondisi ini sering tidak disadari dan berdampak besar pada kualitas tidur secara keseluruhan.',
        'saran': [
            'Segera konsultasi ke dokter spesialis tidur atau dokter THT.',
            'Pemeriksaan polysomnography (sleep study) biasanya diperlukan untuk diagnosis pasti.',
            'Terapi CPAP (Continuous Positive Airway Pressure) adalah penanganan utama sleep apnea.',
            'Menjaga berat badan ideal dan tidur dalam posisi miring dapat membantu mengurangi gejala.',
        ],
        'ref': 'ICSD-3 — Obstructive Sleep Apnea, Adult',
    },
    {
        'name':      'Restless Leg Syndrome',
        'gejala':    ['G08', 'G09', 'G01', 'G02'],
        'min_match': 2,
        'desc':      'Restless Leg Syndrome (RLS) adalah gangguan neurologis yang menyebabkan dorongan kuat untuk menggerakkan kaki, biasanya disertai sensasi tidak nyaman yang memburuk saat istirahat dan membaik saat bergerak.',
        'saran': [
            'Konsultasi ke dokter neurologi untuk evaluasi lebih lanjut.',
            'Pemeriksaan kadar zat besi dan ferritin darah dianjurkan karena defisiensi zat besi berkaitan dengan RLS.',
            'Mengurangi konsumsi kafein dan alkohol dapat meringankan gejala.',
            'Pijat ringan dan kompres hangat pada kaki sebelum tidur kadang membantu.',
        ],
        'ref': 'ICSD-3 — Restless Legs Syndrome',
    },
    {
        'name':      'Narkolepsi',
        'gejala':    ['G06', 'G10', 'G11', 'G12'],
        'min_match': 2,
        'desc':      'Narkolepsi adalah gangguan tidur neurologis kronis yang ditandai dengan rasa kantuk ekstrem di siang hari dan episode mendadak tertidur. Kelemahan otot mendadak saat emosi (cataplexy) adalah ciri khas narkolepsi tipe 1.',
        'saran': [
            'Segera konsultasi ke dokter neurologi atau spesialis tidur karena ini kondisi medis serius.',
            'Diagnosis memerlukan tes khusus seperti MSLT (Multiple Sleep Latency Test).',
            'Penanganan meliputi obat-obatan dan modifikasi gaya hidup seperti tidur siang singkat terjadwal.',
            'Hindari mengemudi atau mengoperasikan mesin berat sebelum kondisi terkontrol.',
        ],
        'ref': 'ICSD-3 / DSM-5 — Narcolepsy Type 1 & 2',
    },
    {
        'name':      'Parasomnia (REM Sleep Behavior Disorder)',
        'gejala':    ['G13', 'G14', 'G02'],
        'min_match': 2,
        'desc':      'Parasomnia meliputi perilaku tidak normal saat tidur seperti mimpi buruk intens, berteriak, berjalan, atau bertindak sesuai isi mimpi. Pada REM Sleep Behavior Disorder, tubuh tidak mengalami kelumpuhan otot normal (atonia) saat fase REM.',
        'saran': [
            'Konsultasi ke dokter neurologi atau psikiater untuk evaluasi lebih lanjut.',
            'Amankan lingkungan tidur dengan menyingkirkan benda tajam untuk mencegah cedera.',
            'Tidur teratur dan manajemen stres dapat mengurangi frekuensi episode.',
            'Jangan membangunkan secara mendadak saat episode terjadi, cukup pastikan keamanannya.',
        ],
        'ref': 'ICSD-3 — REM Sleep Behavior Disorder',
    },
    {
        'name':      'Hipersomnia',
        'gejala':    ['G06', 'G15', 'G16', 'G17'],
        'min_match': 3,
        'desc':      'Hipersomnia ditandai dengan rasa kantuk berlebihan di siang hari meski durasi tidur malam sudah cukup bahkan berlebih. Berbeda dengan narkolepsi, tidur siang pada hipersomnia biasanya tidak membuat lebih segar.',
        'saran': [
            'Konsultasi ke dokter untuk menyingkirkan penyebab organik seperti anemia atau hipotiroid.',
            'Pertimbangkan pemeriksaan polysomnography untuk evaluasi kualitas tidur secara menyeluruh.',
            'Hindari alkohol dan obat-obatan yang dapat memperparah rasa kantuk.',
            'Jadwal tidur konsisten dan paparan cahaya matahari pagi dapat membantu regulasi sirkadian.',
        ],
        'ref': 'ICSD-3 / DSM-5 — Idiopathic Hypersomnia',
    },
    {
        'name':      'Sleep Paralysis Terisolasi',
        'gejala':    ['G12', 'G11'],
        'min_match': 2,
        'desc':      'Sleep paralysis terisolasi adalah kondisi di mana seseorang sadar namun tidak dapat bergerak sesaat saat bangun tidur atau mau tidur, sering disertai halusinasi. Kondisi ini umum terjadi dan biasanya tidak berbahaya.',
        'saran': [
            'Prioritaskan tidur yang cukup dengan jadwal yang konsisten karena kurang tidur memperparah kondisi.',
            'Tidur telentang meningkatkan risiko sleep paralysis, coba posisi miring.',
            'Manajemen stres dan kecemasan dapat mengurangi frekuensi kejadian.',
            'Jika sangat sering dan mengganggu, konsultasi ke dokter untuk evaluasi lebih lanjut.',
        ],
        'ref': 'ICSD-3 — Isolated Sleep Paralysis',
    },
]


# ── MESIN INFERENSI (Forward Chaining) ──

def diagnose(answers: dict) -> list:
    """
    answers: { 'G01': True/False, 'G02': True/False, ... }
    Returns list of matched diseases sorted by match ratio, descending.
    """
    results = []
    for disease in DISEASES:
        matched = [g for g in disease['gejala'] if answers.get(g) is True]
        if len(matched) >= disease['min_match']:
            ratio = len(matched) / len(disease['gejala'])
            results.append({
                'name':         disease['name'],
                'desc':         disease['desc'],
                'saran':        disease['saran'],
                'ref':          disease['ref'],
                'match_count':  len(matched),
                'total_gejala': len(disease['gejala']),
                'confidence':   round(ratio * 100),
                'matched_ids':  matched,
            })
    results.sort(key=lambda x: x['confidence'], reverse=True)
    return results


# ── ROUTES ──

@app.route('/')
def index():
    return render_template('index.html', symptoms=SYMPTOMS)


@app.route('/diagnose', methods=['POST'])
def diagnose_route():
    data    = request.get_json()
    answers = data.get('answers', {})   # { 'G01': true/false, ... }
    matched = diagnose(answers)

    # Tambahkan info gejala yg cocok untuk ditampilkan di frontend
    sym_map = {s['id']: s['text'] for s in SYMPTOMS}
    for m in matched:
        m['matched_texts'] = [sym_map[g] for g in m['matched_ids']]

    return jsonify({'results': matched})


if __name__ == '__main__':
    app.run(debug=True)
