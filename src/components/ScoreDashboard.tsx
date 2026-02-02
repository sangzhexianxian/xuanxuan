import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { studentData } from '@/data/mockData';

const ScoreDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'ranks'>('overview');
  
  // 准备雷达图数据
  const radarData = studentData.finalExamScores.subjects.map(subject => ({
    subject: subject.name,
    score: subject.score,
    fullMark: subject.name === '语文' || subject.name === '数学' || subject.name === '英语' ? 150 : 70
  }));
  
  // 准备柱状图数据（按科目分数）
  const barData = studentData.finalExamScores.subjects.map(subject => ({
    name: subject.name,
    score: subject.score
  }));
  
  // 准备排名数据
  const rankData = studentData.finalExamScores.subjects.map(subject => ({
    name: subject.name,
    rank: subject.rank
  }));

  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 shadow-lg"
      whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <i className="fa-solid fa-chart-line mr-3 text-purple-400"></i>
          成绩仪表盘
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'overview' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            总览
          </button>
          <button 
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'subjects' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            科目分析
          </button>
          <button 
            onClick={() => setActiveTab('ranks')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'ranks' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            排名情况
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gray-700/70 rounded-xl p-4 text-center">
            <p className="text-gray-300 text-sm mb-1">八门总分</p>
            <p className="text-3xl font-bold text-white">{studentData.finalExamScores.totalScore8}</p>
            <p className="text-gray-400 text-sm mt-1">班级第{studentData.finalExamScores.classRanks.total8}名 | 年级第{studentData.finalExamScores.gradeRanks.total8}名</p>
          </div>
          <div className="bg-gray-700/70 rounded-xl p-4 text-center">
            <p className="text-gray-300 text-sm mb-1">七门总分（不含体育）</p>
            <p className="text-3xl font-bold text-white">{studentData.finalExamScores.totalScore7}</p>
            <p className="text-gray-400 text-sm mt-1">班级第{studentData.finalExamScores.classRanks.total7}名 | 年级第{studentData.finalExamScores.gradeRanks.total7}名</p>
          </div>
          <div className="bg-gray-700/70 rounded-xl p-4 text-center">
            <p className="text-gray-300 text-sm mb-1">三门总分（语数英）</p>
            <p className="text-3xl font-bold text-white">{studentData.finalExamScores.totalScore3}</p>
            <p className="text-gray-400 text-sm mt-1">班级第{studentData.finalExamScores.classRanks.total3}名 | 年级第{studentData.finalExamScores.gradeRanks.total3}名</p>
          </div>
          
          <div className="md:col-span-3 mt-4">
            <h3 className="text-lg font-semibold text-white mb-3">成绩分布雷达图</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="subject" stroke="#ddd" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#ddd" />
                  <Radar name="得分" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="满分" dataKey="fullMark" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'subjects' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">各科目得分情况</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ddd" />
                <YAxis stroke="#ddd" />
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                <Bar dataKey="score" fill="#8884d8" radius={[4, 4, 0, 0]}>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {studentData.finalExamScores.subjects.map((subject, index) => (
              <motion.div 
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/70 rounded-lg p-3 flex justify-between items-center"
              >
                <span className="text-gray-300">{subject.name}</span>
                <span className={`text-xl font-bold ${
                  (subject.name === '语文' || subject.name === '数学' || subject.name === '英语') 
                    ? (subject.score > 120 ? 'text-green-400' : 'text-yellow-400') 
                    : (subject.score > 60 ? 'text-green-400' : 'text-yellow-400')
                }`}>
                  {subject.score}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'ranks' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">各科目年级排名</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#ddd" />
                <YAxis type="category" dataKey="name" stroke="#ddd" />
                <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                <Bar dataKey="rank" fill="#ff7300" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-4 bg-purple-900/40 rounded-lg border border-purple-500/30">
            <h4 className="text-white font-medium mb-2">进步空间分析</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm flex items-start">
                <i className="fa-solid fa-arrow-up text-green-400 mt-1 mr-2"></i>
                <span>英语科目有较大提升空间（年级第{studentData.finalExamScores.subjects.find(s => s.name === '英语')?.rank}名）</span>
              </li>
              <li className="text-gray-300 text-sm flex items-start">
                <i className="fa-solid fa-arrow-up text-green-400 mt-1 mr-2"></i>
                <span>物理科目有较大提升空间（年级第{studentData.finalExamScores.subjects.find(s => s.name === '物理')?.rank}名）</span>
              </li>
              <li className="text-gray-300 text-sm flex items-start">
                <i className="fa-solid fa-arrow-right text-yellow-400 mt-1 mr-2"></i>
                <span>体育表现不错（年级第{studentData.finalExamScores.subjects.find(s => s.name === '体育')?.rank}名），继续保持</span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScoreDashboard;