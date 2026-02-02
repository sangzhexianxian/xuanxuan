import { useState } from 'react';
import { motion } from 'framer-motion';
import { studentData, studyTips } from '@/data/mockData';

const StudyPlan = () => {
  const [activeDay, setActiveDay] = useState(0);
  
  // 生成每周学习计划模板
  const generateWeeklyPlan = () => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const plan = days.map(day => ({
      day,
      subjects: [
        { name: '语文', duration: 60, priority: Math.random() > 0.3 ? 'high' : 'medium' },
        { name: '数学', duration: 75, priority: Math.random() > 0.3 ? 'high' : 'medium' },
        { name: '英语', duration: 60, priority: Math.random() > 0.2 ? 'high' : 'medium' },
        { name: '物理', duration: 45, priority: Math.random() > 0.2 ? 'high' : 'medium' },
        { name: '化学', duration: 45, priority: Math.random() > 0.4 ? 'high' : 'medium' },
        { name: '历史', duration: 30, priority: Math.random() > 0.5 ? 'medium' : 'low' },
        { name: '政治', duration: 30, priority: Math.random() > 0.5 ? 'medium' : 'low' }
      ].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }).slice(0, 4) // 每天安排4个科目
    }));
    
    return plan;
  };
  
  const weeklyPlan = generateWeeklyPlan();
  
  // 获取随机学习建议
  const getRandomStudyTip = () => {
    const randomIndex = Math.floor(Math.random() * studyTips.length);
    return studyTips[randomIndex];
  };

  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-lg"
      whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <i className="fa-solid fa-calendar-check mr-3 text-purple-400"></i>
          学习计划
        </h2>
        <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center border border-purple-500/50">
          <i className="fa-solid fa-book text-purple-400"></i>
        </div>
      </div>

      {/* 学习时间概览 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-700/70 rounded-lg p-4 mb-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm mb-1">总剩余学习天数</p>
            <p className="text-xl font-bold text-white">{studentData.availableStudyDays}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">每日建议学习时间</p>
            <p className="text-xl font-bold text-white">6-8小时</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">目标提升名次</p>
            <p className="text-xl font-bold text-white">
              {studentData.finalExamScores.gradeRanks.total8 - studentData.goals.finalExam.rank}
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* 每日学习计划选择器 */}
      <div className="mb-6">
        <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
          {weeklyPlan.map((day, index) => (
            <motion.button
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeDay === index 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {day.day}
            </motion.button>
          ))}
        </div>
        
        {/* 显示选中日期的学习计划 */}
        <motion.div 
          key={activeDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-700/70 rounded-lg p-4"
        >
          <h3 className="text-lg font-medium text-white mb-3">{weeklyPlan[activeDay].day}学习计划</h3>
          <div className="space-y-3">
            {weeklyPlan[activeDay].subjects.map((subject, index) => (
              <motion.div 
                key={subject.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex justify-between items-center p-2 hover:bg-gray-600/70 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    subject.priority === 'high' ? 'bg-red-400' : 
                    subject.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}></span>
                  <span className="text-white">{subject.name}</span>
                </div>
                <span className="text-gray-300 text-sm">{subject.duration}分钟</span>
              </motion.div>
            ))}
          </div>
          
          {/* 今日建议 */}
          <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
            <p className="text-sm text-gray-200 flex items-start">
              <i className="fa-solid fa-lightbulb text-yellow-400 mt-1 mr-2"></i>
              <span>{getRandomStudyTip()}</span>
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* 班主任提醒事项 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <h3 className="text-md font-medium text-white mb-3">班主任提醒事项</h3>
        <ul className="space-y-2">
          {[
            '关注下学期时间安排',
            '准备期初考试',
            '按时提交寒假作业',
            '加强体育锻炼（重点：排球）',
            '注意假期安全'
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-start text-sm text-gray-300"
            >
              <i className="fa-solid fa-circle-check text-green-400 mt-1 mr-2"></i>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default StudyPlan;