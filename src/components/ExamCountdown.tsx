import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { studentData, getDaysUntil } from '@/data/mockData';

const ExamCountdown = () => {
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
  
  useEffect(() => {
    // 计算初始倒计时
    const initialCountdowns: { [key: string]: number } = {};
    studentData.examSchedule.forEach(exam => {
      initialCountdowns[exam.name] = getDaysUntil(exam.date);
    });
    setCountdowns(initialCountdowns);
    
    // 每天更新倒计时
    const timer = setInterval(() => {
      const updatedCountdowns: { [key: string]: number } = {};
      studentData.examSchedule.forEach(exam => {
        updatedCountdowns[exam.name] = getDaysUntil(exam.date);
      });
      setCountdowns(updatedCountdowns);
    }, 24 * 60 * 60 * 1000); // 24小时后更新
    
    return () => clearInterval(timer);
  }, []);
  
  // 获取下一个即将到来的考试
  const getNextExam = () => {
    return studentData.examSchedule.reduce((next, current) => {
      const nextDays = countdowns[next.name] || getDaysUntil(next.date);
      const currentDays = countdowns[current.name] || getDaysUntil(current.date);
      return currentDays < nextDays ? current : next;
    });
  };
  
  const nextExam = getNextExam();
  const nextExamDays = countdowns[nextExam.name] || getDaysUntil(nextExam.date);

  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-lg"
      whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <i className="fa-solid fa-clock mr-3 text-purple-400"></i>
          考试倒计时
        </h2>
        <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center border border-purple-500/50">
          <i className="fa-solid fa-hourglass-half text-purple-400"></i>
        </div>
      </div>

      {/* 下一个考试 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 mb-6 border border-purple-500/30"
      >
        <h3 className="text-lg font-medium text-white mb-2">{nextExam.name}</h3>
        <div className="flex justify-center items-center">
          <div className="bg-gray-900/70 rounded-lg p-3 text-center min-w-[120px]">
            <p className="text-3xl font-bold text-purple-400">{nextExamDays}</p>
            <p className="text-sm text-gray-400">天</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-300 mt-2">距离{nextExam.name}还有</p>
      </motion.div>
      
      {/* 其他考试 */}
      <div className="space-y-3">
        {studentData.examSchedule
          .filter(exam => exam.name !== nextExam.name)
          .slice(0, 3) // 只显示接下来的3个考试
          .map((exam, index) => (
            <motion.div 
              key={exam.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex justify-between items-center bg-gray-700/70 rounded-lg p-3"
            >
              <div className="flex items-center">
                <i className="fa-solid fa-calendar-days text-blue-400 mr-2"></i>
                <span className="text-white text-sm">{exam.name}</span>
              </div>
              <span className={`text-sm ${countdowns[exam.name]! < 7 ? 'text-red-400' : 'text-gray-300'}`}>
                {countdowns[exam.name] || getDaysUntil(exam.date)}天
              </span>
            </motion.div>
          ))}
      </div>
      
      {/* 学习天数提醒 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-3 bg-blue-900/30 rounded-lg border border-blue-500/20"
      >
        <p className="text-sm text-gray-200 flex items-start">
          <i className="fa-solid fa-lightbulb text-yellow-400 mt-1 mr-2"></i>
          <span>从3月2日起至中考约72天，扣除五次考试时间，实际可用于学习的天数约为{studentData.availableStudyDays}天，合理安排时间哦！</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ExamCountdown;