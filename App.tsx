/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Surah data with page ranges for Tahajjud Mushaf
const SURAHS = [
  { id: 1, name: "الفاتحة", start: 1, end: 1 },
  { id: 2, name: "البقرة", start: 2, end: 13 },
  { id: 3, name: "آل عمران", start: 14, end: 19 },
  { id: 4, name: "النساء", start: 20, end: 27 },
  { id: 5, name: "المائدة", start: 28, end: 32 },
  { id: 6, name: "الأنعام", start: 33, end: 38 },
  { id: 7, name: "الأعراف", start: 39, end: 44 },
  { id: 8, name: "الأنفال", start: 45, end: 47 },
  { id: 9, name: "التوبة", start: 48, end: 52 },
  { id: 10, name: "يونس", start: 53, end: 55 },
  { id: 11, name: "هود", start: 56, end: 59 },
  { id: 12, name: "يوسف", start: 60, end: 62 },
  { id: 13, name: "الرعد", start: 63, end: 64 },
  { id: 14, name: "إبراهيم", start: 65, end: 66 },
  { id: 15, name: "الحجر", start: 67, end: 67 },
  { id: 16, name: "النحل", start: 68, end: 71 },
  { id: 17, name: "الإسراء", start: 72, end: 73 },
  { id: 18, name: "الكهف", start: 74, end: 76 },
  { id: 19, name: "مريم", start: 77, end: 78 },
  { id: 20, name: "طه", start: 79, end: 81 },
  { id: 21, name: "الأنبياء", start: 82, end: 83 },
  { id: 22, name: "الحج", start: 84, end: 86 },
  { id: 23, name: "المؤمنون", start: 87, end: 88 },
  { id: 24, name: "النور", start: 89, end: 90 },
  { id: 25, name: "الفرقان", start: 91, end: 92 },
  { id: 26, name: "الشعراء", start: 93, end: 94 },
  { id: 27, name: "النمل", start: 95, end: 96 },
  { id: 28, name: "القصص", start: 97, end: 99 },
  { id: 29, name: "العنكبوت", start: 100, end: 101 },
  { id: 30, name: "الروم", start: 102, end: 103 },
  { id: 31, name: "لقمان", start: 104, end: 104 },
  { id: 32, name: "السجدة", start: 105, end: 105 },
  { id: 33, name: "الأحزاب", start: 106, end: 107 },
  { id: 34, name: "سبأ", start: 108, end: 109 },
  { id: 35, name: "فاطر", start: 110, end: 110 },
  { id: 36, name: "يس", start: 111, end: 112 },
  { id: 37, name: "الصافات", start: 113, end: 113 },
  { id: 38, name: "ص", start: 114, end: 115 },
  { id: 39, name: "الزمر", start: 116, end: 117 },
  { id: 40, name: "غافر", start: 118, end: 119 },
  { id: 41, name: "فصلت", start: 120, end: 121 },
  { id: 42, name: "الشورى", start: 122, end: 122 },
  { id: 43, name: "الزخرف", start: 123, end: 124 },
  { id: 44, name: "الدخان", start: 125, end: 125 },
  { id: 45, name: "الجاثية", start: 126, end: 126 },
  { id: 46, name: "الأحقاف", start: 127, end: 127 },
  { id: 47, name: "محمد", start: 128, end: 128 },
  { id: 48, name: "الفتح", start: 129, end: 129 },
  { id: 49, name: "الحجرات", start: 130, end: 130 },
  { id: 50, name: "ق", start: 131, end: 131 },
  { id: 51, name: "الذاريات", start: 131, end: 131 },
  { id: 52, name: "الطور", start: 132, end: 132 },
  { id: 53, name: "النجم", start: 133, end: 133 },
  { id: 54, name: "القمر", start: 133, end: 133 },
  { id: 55, name: "الرحمن", start: 134, end: 134 },
  { id: 56, name: "الواقعة", start: 135, end: 135 },
  { id: 57, name: "الحديد", start: 135, end: 136 },
  { id: 58, name: "المجادلة", start: 137, end: 137 },
  { id: 59, name: "الحشر", start: 137, end: 137 },
  { id: 60, name: "الممتحنة", start: 138, end: 138 },
  { id: 61, name: "الصف", start: 139, end: 139 },
  { id: 62, name: "الجمعة", start: 139, end: 139 },
  { id: 63, name: "المنافقون", start: 140, end: 140 },
  { id: 64, name: "التغابن", start: 140, end: 140 },
  { id: 65, name: "الطلاق", start: 141, end: 141 },
  { id: 66, name: "التحريم", start: 141, end: 141 },
  { id: 67, name: "الملك", start: 142, end: 142 },
  { id: 68, name: "القلم", start: 142, end: 142 },
  { id: 69, name: "الحاقة", start: 143, end: 143 },
  { id: 70, name: "المعارج", start: 143, end: 143 },
  { id: 71, name: "نوح", start: 144, end: 144 },
  { id: 72, name: "الجن", start: 144, end: 144 },
  { id: 73, name: "المزمل", start: 145, end: 145 },
  { id: 74, name: "المدثر", start: 145, end: 145 },
  { id: 75, name: "القيامة", start: 145, end: 145 },
  { id: 76, name: "الإنسان", start: 146, end: 146 },
  { id: 77, name: "المرسلات", start: 146, end: 146 },
  { id: 78, name: "النبأ", start: 147, end: 147 },
  { id: 79, name: "النازعات", start: 147, end: 147 },
  { id: 80, name: "عبس", start: 147, end: 147 },
  { id: 81, name: "التكوير", start: 148, end: 148 },
  { id: 82, name: "الانفطار", start: 148, end: 148 },
  { id: 83, name: "المطففين", start: 148, end: 148 },
  { id: 84, name: "الانشقاق", start: 148, end: 148 },
  { id: 85, name: "البروج", start: 149, end: 149 },
  { id: 86, name: "الطارق", start: 149, end: 149 },
  { id: 87, name: "الأعلى", start: 149, end: 149 },
  { id: 88, name: "الغاشية", start: 149, end: 149 },
  { id: 89, name: "الفجر", start: 149, end: 149 },
  { id: 90, name: "البلد", start: 150, end: 150 },
  { id: 91, name: "الشمس", start: 150, end: 150 },
  { id: 92, name: "الليل", start: 150, end: 150 },
  { id: 93, name: "الضحى", start: 150, end: 150 },
  { id: 94, name: "الشرح", start: 150, end: 150 },
  { id: 95, name: "التين", start: 150, end: 150 },
  { id: 96, name: "العلق", start: 151, end: 151 },
  { id: 97, name: "القدر", start: 151, end: 151 },
  { id: 98, name: "البينة", start: 151, end: 151 },
  { id: 99, name: "الزلزلة", start: 151, end: 151 },
  { id: 100, name: "العاديات", start: 151, end: 151 },
  { id: 101, name: "القارعة", start: 151, end: 151 },
  { id: 102, name: "التكاثر", start: 151, end: 151 },
  { id: 103, name: "العصر", start: 151, end: 151 },
  { id: 104, name: "الهمزة", start: 152, end: 152 },
  { id: 105, name: "الفيل", start: 152, end: 152 },
  { id: 106, name: "قريش", start: 152, end: 152 },
  { id: 107, name: "الماعون", start: 152, end: 152 },
  { id: 108, name: "الكوثر", start: 152, end: 152 },
  { id: 109, name: "الكافرون", start: 152, end: 152 },
  { id: 110, name: "النصر", start: 152, end: 152 },
  { id: 111, name: "المسد", start: 152, end: 152 },
  { id: 112, name: "الإخلاص", start: 152, end: 152 },
  { id: 113, name: "الفلق", start: 152, end: 152 },
  { id: 114, name: "الناس", start: 152, end: 152 },
];

const TOTAL_PAGES = 152;
const STORAGE_KEY = 'tahajjud_mushaf_progress';

export default function App() {
  const [progress, setProgress] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved progress", e);
      }
    }
    return {};
  });

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const togglePage = (pageNumber: number) => {
    setProgress(prev => ({
      ...prev,
      [pageNumber]: !prev[pageNumber]
    }));
  };

  const readCount = useMemo(() => {
    return Object.values(progress).filter(Boolean).length;
  }, [progress]);

  const percentage = Math.round((readCount / TOTAL_PAGES) * 100);

  const resetProgress = () => {
    setProgress({});
    setShowResetConfirm(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0F1115] text-[#E5E7EB] font-sans selection:bg-green-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F1115]/80 backdrop-blur-md border-b border-white/5 py-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center tracking-tight">
          متتبع قراءة القرآن — مصحف التهجد
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Surah Table */}
        <section className="bg-[#171A21] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 text-sm font-semibold text-[#9CA3AF] w-32">السورة</th>
                  <th className="px-6 py-4 text-sm font-semibold text-[#9CA3AF]">الصفحات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {SURAHS.map((surah) => (
                  <tr key={`${surah.id}-${surah.name}`} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 font-medium text-lg whitespace-nowrap">
                      {surah.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: surah.end - surah.start + 1 }, (_, i) => surah.start + i).map((pageNum) => (
                          <PageSquare
                            key={pageNum}
                            pageNum={pageNum}
                            isRead={!!progress[pageNum]}
                            onToggle={() => togglePage(pageNum)}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Progress Section */}
        <section className="bg-[#171A21] rounded-2xl border border-white/5 p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">الإحصائيات</h2>
              <p className="text-[#9CA3AF] text-sm">
                عدد الصفحات المقروءة: <span className="text-green-500 font-bold">{readCount}</span> / {TOTAL_PAGES}
              </p>
            </div>
            <div className="text-3xl font-bold text-green-500">
              {percentage}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-4 bg-[#2A2F3A] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.4)]"
            />
          </div>

          <div className="pt-4 flex justify-center">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 font-medium"
              >
                <RotateCcw size={18} />
                إعادة ضبط التقدم
              </button>
            ) : (
              <div className="flex items-center gap-4 animate-in fade-in zoom-in duration-200">
                <span className="text-sm text-[#9CA3AF]">هل أنت متأكد؟</span>
                <button
                  onClick={resetProgress}
                  className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                >
                  نعم، إعادة الضبط
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-6 py-2 bg-[#2A2F3A] text-white rounded-xl hover:bg-[#3a4150] transition-colors font-medium"
                >
                  إلغاء
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="py-12 text-center text-[#9CA3AF] text-sm border-t border-white/5">
        <p>مصحف التهجد — تقبل الله منا ومنكم</p>
      </footer>
    </div>
  );
}

interface PageSquareProps {
  pageNum: number;
  isRead: boolean;
  onToggle: () => void;
  key?: React.Key;
}

const PageSquare = ({ pageNum, isRead, onToggle }: PageSquareProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`
        relative w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xs font-mono transition-all duration-200
        ${isRead 
          ? 'bg-[#22C55E] text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]' 
          : 'bg-[#2A2F3A] text-[#9CA3AF] hover:bg-[#3a4150]'}
      `}
      title={`صفحة ${pageNum}`}
    >
      <AnimatePresence mode="wait">
        {isRead ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Check size={20} strokeWidth={3} />
          </motion.div>
        ) : (
          <motion.span
            key="number"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {pageNum}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
