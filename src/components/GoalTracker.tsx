import { useState } from 'react';
import { motion } from 'framer-motion';
import { studentData } from '@/data/mockData';

const GoalTracker = () => {
  const [goals, setGoals] = useState(studentData.goals);
  
  // 目标进度计算
  const calculateProgress = (currentRank: number, targetRank: number) => {
    // 假设当前排名是九年级期末的年级排名
    const initialRank = studentData.finalExamScores.gradeRanks.total8;
    const totalImprovement = initialRank - targetRank;
    const currentImprovement = initialRank - currentRank;
    return Math.min(Math.max(Math.round((currentImprovement / totalImprovement) * 100), 0), 100);
  };
  
  // 模拟当前进度数据（实际应用中可以从本地存储或API获取）
  const progressData = {
    startExam: { currentRank: 450, progress: calculateProgress(450, goals.startExam.rank) },
    mock1: { currentRank: 470, progress: calculateProgress(470, goals.mock1.rank) },
    mock2: { currentRank: 480, progress: calculateProgress(480, goals.mock2.rank) },
    mock3: { currentRank: 485, progress: calculateProgress(485, goals.mock3.rank) },
    finalExam: { currentRank: 495, progress: calculateProgress(495, goals.finalExam.rank) }
  };

  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-lg"
      whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <i className="fa-solid fa-bullseye mr-3 text-purple-400"></i>
          目标追踪
        </h2>
        <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center border border-purple-500/50">
          <i className="fa-solid fa-clipboard-check text-purple-400"></i>
        </div>
      </div>

      <div className="space-y-6">
        {/* 总体目标 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">中考目标</h3>
            <span className="text-sm bg-green-900/40 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
              年级前{goals.finalExam.rank}名
            </span>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressData.finalExam.progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
            ></motion.div>
          </div>
          <p className="text-right text-sm text-gray-400 mt-1">当前进度: {progressData.finalExam.progress}%</p>
        </div>
        
        {/* 阶段性目标 */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-300">阶段性目标</h3>
          
          {[
            { key: 'startExam', name: '期初考试', icon: 'fa-calendar-check' },
            { key: 'mock1', name: '一模', icon: 'fa-flag' },
            { key: 'mock2', name: '二模', icon: 'fa-flag' },
            { key: 'mock3', name: '三模', icon: 'fa-flag' }
          ].map((exam, index) => (
            <motion.div 
              key={exam.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-700/70 rounded-lg p-3"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <i className={`fa-solid ${exam.icon} text-purple-400 mr-2`}></i>
                  <span className="text-white">{exam.name}</span>
                </div>
                <span className="text-sm bg-blue-900/40 text-blue-400 px-2 py-1 rounded-full border border-blue-500/30">
                  年级前{goals[exam.key as keyof typeof goals].rank}名
                </span>
              </div>
              <div className="relative h-1.5 bg-gray-600 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressData[exam.key as keyof typeof progressData].progress}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
         {/* 激励信息 - 融合第五人格元素 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20 mt-4"
        >
          <p className="text-sm text-gray-200 italic">
            "就像你喜欢的记者一样，每一步探索都在接近真相。中考的真相就是：你的努力终将得到回报！继续前进吧，小侦探！"
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GoalTracker;