import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { studentData } from '@/data/mockData';

const MentalHealthSupport = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [moodHistory, setMoodHistory] = useState<{ date: string; mood: string }[]>([]);
  
  // 情绪选项
  const moods = [
    { id: 'happy', label: '开心', icon: 'fa-face-smile', color: 'bg-yellow-500' },
    { id: 'calm', label: '平静', icon: 'fa-face-meh', color: 'bg-blue-500' },
    { id: 'stressed', label: '压力大', icon: 'fa-face-frown', color: 'bg-orange-500' },
    { id: 'sad', label: '难过', icon: 'fa-face-sad-tear', color: 'bg-purple-500' },
    { id: 'anxious', label: '焦虑', icon: 'fa-face-anxious', color: 'bg-red-500' }
  ];
  
  // 加载情绪历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
    
    // 加载当前情绪
    const savedMood = localStorage.getItem('currentMood');
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);
  
  // 保存情绪记录
  const saveMood = (moodId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newMoodRecord = { date: today, mood: moodId };
    
    // 更新情绪历史
    const updatedHistory = [...moodHistory];
    const existingIndex = updatedHistory.findIndex(record => record.date === today);
    
    if (existingIndex >= 0) {
      updatedHistory[existingIndex] = newMoodRecord;
    } else {
      updatedHistory.push(newMoodRecord);
    }
    
    setMoodHistory(updatedHistory);
    setCurrentMood(moodId);
    
    // 保存到本地存储
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    localStorage.setItem('currentMood', moodId);
    
    setShowMoodSelector(false);
    
    // 显示鼓励信息
    const mood = moods.find(m => m.id === moodId);
    if (mood) {
      toast(`今天的心情是${mood.label}，记得照顾好自己哦！`);
    }
  };
  
  // 根据情绪提供建议
  const getMoodAdvice = (moodId: string) => {
    const adviceMap: { [key: string]: string } = {
      happy: '保持好心情，继续加油！',
      calm: '平静的心态很适合学习，继续保持！',
      stressed: '适当休息一下，听听音乐放松心情吧！',
      sad: '如果感到难过，试着和朋友或家人聊聊天吧！',
      anxious: '深呼吸，慢慢来，你已经做得很好了！'
    };
    
    return adviceMap[moodId] || '记得照顾好自己的情绪哦！';
  };
  
  // 获取最近7天的情绪记录
  const getRecentMoodHistory = () => {
    const today = new Date();
    const recentHistory: { date: string; mood: string }[] = [];
    
    // 生成最近7天的日期
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // 查找该日期的情绪记录
      const record = moodHistory.find(item => item.date === dateStr);
      if (record) {
        recentHistory.push(record);
      } else {
        recentHistory.push({ date: dateStr, mood: 'unknown' });
      }
    }
    
    return recentHistory;
  };
  
  const recentHistory = getRecentMoodHistory();

  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-lg"
      whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <i className="fa-solid fa-heart-pulse mr-3 text-purple-400"></i>
          心灵加油站
        </h2>
        <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center border border-purple-500/50">
          <i className="fa-solid fa-brain text-purple-400"></i>
        </div>
      </div>

      {/* 情绪记录 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-700/70 rounded-lg p-4 mb-6"
      >
        <h3 className="text-lg font-medium text-white mb-3">今日心情</h3>
        
        {!showMoodSelector ? (
          <div className="flex justify-center">
            {currentMood ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMoodSelector(true)}
                className="flex flex-col items-center bg-gray-800 p-4 rounded-xl border border-gray-600 transition-all"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  moods.find(m => m.id === currentMood)?.color || 'bg-gray-500'
                }`}>
                  <i className={`fa-solid ${moods.find(m => m.id === currentMood)?.icon || 'fa-question'} text-white text-2xl`}></i>
                </div>
                <span className="text-white">
                  {moods.find(m => m.id === currentMood)?.label || '未记录'}
                </span>
                <p className="text-xs text-gray-400 mt-1">点击更改</p>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMoodSelector(true)}
                className="flex flex-col items-center bg-gray-800 p-4 rounded-xl border border-dashed border-gray-600 transition-all"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 bg-gray-600">
                  <i className="fa-solid fa-plus text-white text-xl"></i>
                </div>
                <span className="text-white">记录今日心情</span>
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <motion.button
                key={mood.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => saveMood(mood.id)}
                className="flex flex-col items-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${mood.color}`}>
                  <i className={`fa-solid ${mood.icon} text-white text-xl`}></i>
                </div>
                <span className="text-xs text-gray-300">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        )}
        
        {/* 情绪建议 */}
        {currentMood && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/20"
          >
            <p className="text-sm text-gray-200">{getMoodAdvice(currentMood)}</p>
          </motion.div>
        )}
      </motion.div>
      
      {/* 情绪趋势 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-md font-medium text-white mb-3">近期心情趋势</h3>
        <div className="bg-gray-700/70 rounded-lg p-4">
          <div className="flex justify-between items-end h-24">
            {recentHistory.map((record, index) => {
              const mood = moods.find(m => m.id === record.mood);
              const date = new Date(record.date);
              const day = date.getDate();
              
              return (
                <motion.div 
                  key={record.date}
                  initial={{ height: 0 }}
                  animate={{ height: record.mood !== 'unknown' ? '80%' : '20%' }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  className="flex flex-col items-center flex-1"
                >
                  <div className={`w-4 rounded-t-lg ${
                    record.mood !== 'unknown' ? (mood?.color || 'bg-gray-500') : 'bg-gray-600'
                  }`}></div>
                  <span className="text-xs text-gray-400 mt-1">{day}日</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      
      {/* 放松建议 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20"
      >
        <h3 className="text-md font-medium text-white mb-2">放松小技巧</h3>
        <p className="text-sm text-gray-300 mb-3">
          感到压力大的时候，可以试试这些简单的放松方法：
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: '深呼吸', icon: 'fa-lungs' },
            { name: '听轻音乐', icon: 'fa-music' },
            { name: '短暂散步', icon: 'fa-person-walking' },
            { name: '伸展运动', icon: 'fa-spa' }
          ].map((activity, index) => (
            <motion.button
              key={activity.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast(`试试${activity.name}来放松一下吧！`)}
              className="flex items-center justify-center p-2 bg-gray-800/70 rounded-lg text-sm text-gray-200 hover:bg-gray-700/70 transition-colors"
            >
              <i className={`fa-solid ${activity.icon} mr-2 text-purple-400`}></i>
              <span>{activity.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MentalHealthSupport;