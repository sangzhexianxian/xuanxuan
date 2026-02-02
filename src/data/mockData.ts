// 学生成绩数据
export const studentData = {
  name: "郭净轩",
  currentGrade: "九年级",
  finalExamScores: {
    subjects: [
      { name: "语文", score: 124.5, rank: 437 },
      { name: "数学", score: 124, rank: 388 },
      { name: "英语", score: 127, rank: 674 },
      { name: "历史", score: 63, rank: 376 },
      { name: "政治", score: 63, rank: 345 },
      { name: "物理", score: 61, rank: 576 },
      { name: "化学", score: 51, rank: 389 },
      { name: "体育", score: 19, rank: 194 }
    ],
    totalScore8: 632.5,
    totalScore7: 613.5,
    totalScore3: 375.5,
    classRanks: {
      total8: 34,
      total7: 33,
      total3: 33
    },
    gradeRanks: {
      total8: 495,
      total7: 503,
      total3: 532
    }
  },
  goals: {
    startExam: { rank: 400, completed: false },
    mock1: { rank: 350, completed: false },
    mock2: { rank: 300, completed: false },
    mock3: { rank: 275, completed: false },
    finalExam: { rank: 250, completed: false }
  },
  examSchedule: [
    { name: "期初考试", date: "2026-03-05" },
    { name: "百日宣誓", date: "2026-03-10" },
    { name: "一模", date: "2026-03-24" },
    { name: "市模", date: "2026-04-23" },
    { name: "体育中考", date: "2026-05-10" },
    { name: "二模", date: "2026-05-15" },
    { name: "三模", date: "2026-06-03" }
  ],
  availableStudyDays: 61.5,
  currentMood: null,
  // 第五人格相关内容
  favoriteGame: "第五人格",
  favoriteCharacter: "记者"
};

// 鼓励语录数据
export const encouragingQuotes = [
  "每一步都在靠近目标，你已经很棒了！",
  "即使进步很小，也是向上的力量！",
  "你比自己想象的更坚强、更聪明！",
  "今天的努力，是明天成功的伏笔！",
  "别着急，慢慢来，你会达到目标的！",
  "你的坚持，终将美好！",
  "每一次跌倒，都是为了更稳地站起！",
  "你值得拥有更好的未来！",
  "相信自己，你能做到！",
  "困难只是暂时的，胜利就在前方！",
  // 第五人格风格的鼓励语录
  "就像记者追寻真相一样，你也在追寻知识的真相，继续前进吧！",
  "在知识的庄园里，你就是最勇敢的探索者！",
  "每解决一个难题，都是一次成功的破译！",
  "即使遇到困难，也要像记者一样保持冷静和智慧！",
  "中考的庄园等待着你的胜利，准备好了吗？"
];

// 心理健康提示
export const mentalHealthTips = [
  "记得每天抽10分钟做深呼吸放松",
  "适量运动可以帮助缓解压力",
  "保持充足的睡眠对学习很重要",
  "和朋友聊聊天，分享你的感受",
  "试着把烦恼写在纸上，然后放下它",
  "做一些你喜欢的事情，给自己充电",
  "专注于当下，不要过度担心未来",
  "记得欣赏自己的每一点进步"
];

// 学习建议
export const studyTips = [
  "制定每日学习计划，但不要安排太满",
  "每学习45分钟，休息10分钟",
  "针对薄弱科目制定专项提升计划",
  "利用思维导图整理知识点",
  "定期复习比临时抱佛脚更有效",
  "多做真题，熟悉考试题型",
  "建立错题本，避免重复犯错",
  "尝试不同的学习方法，找到最适合自己的"
];

// 获取当前日期
export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 计算距离目标日期的天数
export const getDaysUntil = (targetDate: string) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffTime = Math.abs(target.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};

// 获取随机鼓励语录
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * encouragingQuotes.length);
  return encouragingQuotes[randomIndex];
};

// 获取随机心理健康提示
export const getRandomMentalHealthTip = () => {
  const randomIndex = Math.floor(Math.random() * mentalHealthTips.length);
  return mentalHealthTips[randomIndex];
};