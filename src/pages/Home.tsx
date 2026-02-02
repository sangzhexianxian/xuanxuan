import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScoreDashboard from '@/components/ScoreDashboard';
import GoalTracker from '@/components/GoalTracker';
import ExamCountdown from '@/components/ExamCountdown';
import MentalHealthSupport from '@/components/MentalHealthSupport';
import StudyPlan from '@/components/StudyPlan';
import { studentData, getRandomQuote, getRandomMentalHealthTip } from '@/data/mockData';

export default function Home() {
  const [dailyQuote, setDailyQuote] = useState('');
  const [mentalHealthTip, setMentalHealthTip] = useState('');
  const [showJournalHint, setShowJournalHint] = useState(false);

  useEffect(() => {
    // 加载每日鼓励语录
    setDailyQuote(getRandomQuote());
    
    // 随机显示心理健康提示
    const randomShowTip = Math.random() > 0.3; // 70%概率显示
    if (randomShowTip) {
      setMentalHealthTip(getRandomMentalHealthTip());
    }
    
    // 随机提示写日记
    const randomShowJournal = Math.random() > 0.7; // 30%概率显示
    if (randomShowJournal) {
      setTimeout(() => {
        setShowJournalHint(true);
        setTimeout(() => setShowJournalHint(false), 10000); // 10秒后消失
      }, 5000);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部欢迎区 - 融合第五人格元素 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center"
      >
        <div className="flex justify-center mb-4">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
          >
            <i className="fa-solid fa-newspaper text-4xl text-white"></i>
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          你好，{studentData.name}！
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-xl text-gray-300">初三的旅程，我们一起加油！</p>
          <motion.div 
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5
            }}
            className="ml-2 text-yellow-400"
          >
            <i className="fa-solid fa-star"></i>
          </motion.div>
        </div>
        
        {/* 每日鼓励语录 */}
        {dailyQuote && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-xl max-w-2xl mx-auto border border-purple-500/30"
          >
            <p className="text-lg italic text-gray-100">{dailyQuote}</p>
          </motion.div>
        )}
      </motion.div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：成绩仪表盘 */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="lg:col-span-2"
        >
          <ScoreDashboard />
        </motion.div>
        
        {/* 右侧：目标追踪和倒计时 */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <GoalTracker />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <ExamCountdown />
          </motion.div>
        </div>
      </div>
      
      {/* 底部：学习计划和心理健康支持 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <StudyPlan />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <MentalHealthSupport />
        </motion.div>
      </div>
      
      {/* 随机心理健康提示（底部悬浮） */}
      {mentalHealthTip && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg max-w-xs z-50 border border-white/20"
        >
          <p className="text-white text-sm">{mentalHealthTip}</p>
        </motion.div>
      )}
      
      {/* 写日记提示 */}
      {showJournalHint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 left-8 p-4 bg-gradient-to-r from-pink-600 to-orange-600 rounded-lg shadow-lg z-50 border border-white/20"
        >
          <p className="text-white text-sm">今天过得怎么样？试试记录下你的感受吧！</p>
        </motion.div>
      )}
    </div>
  );
}