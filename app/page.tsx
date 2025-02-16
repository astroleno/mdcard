'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';

// 预设的颜色选项
const colorPresets = {
  nature: ['#8DB6A6', '#9FBBA2', '#B1C09F', '#C4C69B', '#D6CB98', '#E8D094'],
  warm: ['#AA391C', '#BE3F2E', '#F47043', '#FFB304', '#CE9B02', '#C67C31'],
  cool: ['#0D0443', '#0D065B', '#0D0774', '#090881', '#0A099F'],
  dream: ['#FF61D2', '#FE90AF', '#F9B9B7', '#BEB4D2', '#9B8BBA'],
  aurora: ['#082B40', '#1D566E', '#5AA6A6', '#7EBEA3', '#A3D89F'],
  sunset: ['#FF5F6D', '#FFC371', '#FF9A9E', '#FAD0C4', '#FCD181'],
  ocean: ['#1A2980', '#26D0CE', '#20B2AA', '#48D1CC', '#40E0D0'],
  forest: ['#134E5E', '#1D6640', '#2E8B57', '#3CB371', '#71B280']
};

const cardStyles = [
  { name: '半透明', class: 'card-translucent' },
  { name: '磨砂玻璃', class: 'card-frosted' },
  { name: '发光边框', class: 'card-glow' }
];

interface StyleConfig {
  gradientAngle: number;
  gradientColors: string[];
  cardSpacing: {
    avatar: number;
    content: number;
    timestamp: number;
  };
  fontSize: {
    username: number;
    content: number;
    timestamp: number;
  };
  textColor: {
    username: string;
    content: string;
    timestamp: string;
  };
}

export default function Home() {
  const [markdown, setMarkdown] = useState(`# 对酒行

## 李白

松子栖金华，安期入蓬海。
此人古之仙，羽化竟何在？`);
  const [author, setAuthor] = useState('琅环');
  const [cardStyle, setCardStyle] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState('nature');
  const [showStyleSettings, setShowStyleSettings] = useState(false);
  const [showContentSettings, setShowContentSettings] = useState(false);
  
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    gradientAngle: 0,
    gradientColors: colorPresets.nature,
    cardSpacing: {
      avatar: 24,
      content: 24,
      timestamp: 24
    },
    fontSize: {
      username: 20,
      content: 18,
      timestamp: 14
    },
    textColor: {
      username: '#FFFFFF',
      content: '#FFFFFF',
      timestamp: 'rgba(255, 255, 255, 0.6)'
    }
  });

  // 使用 useState 和 useEffect 来处理时间，避免 hydration 错误
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // 使用 24 小时制避免上午/下午的问题
      setCurrentTime(now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
      setCurrentDate(now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    };
    updateDateTime();
  }, []);

  const handleExport = async () => {
    const element = document.getElementById('export-wrapper');
    if (element) {
      try {
        const dataUrl = await toPng(element, {
          quality: 1,
          pixelRatio: 3
        });

        const link = document.createElement('a');
        link.download = 'markdown-card.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('导出图片失败:', error);
      }
    }
  };

  const gradientStyle = {
    background: `linear-gradient(${styleConfig.gradientAngle}deg, ${styleConfig.gradientColors.join(', ')})`
  };

  // 动画配置
  const contentAnimation = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  };

  return (
    <main className="min-h-screen p-8" style={gradientStyle}>
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {/* 编辑区 */}
          <div className="space-y-4">
            {/* 样式设置卡片 */}
            <div className="bg-white/30 backdrop-blur-sm rounded-lg">
              <button
                onClick={() => setShowStyleSettings(!showStyleSettings)}
                className="w-full px-4 py-3 text-left flex justify-between items-center text-white"
              >
                <h2 className="text-xl font-bold">样式设置</h2>
                <span className="text-2xl">{showStyleSettings ? '−' : '+'}</span>
              </button>
              
              {/* 快捷选项（始终显示） */}
              <div className="px-4 py-2 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {Object.keys(colorPresets).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setSelectedPreset(preset);
                        setStyleConfig({
                          ...styleConfig,
                          gradientColors: colorPresets[preset as keyof typeof colorPresets]
                        });
                      }}
                      className={`px-3 py-1 rounded ${
                        selectedPreset === preset ? 'bg-white/50' : 'bg-white/20'
                      } text-white text-sm`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {showStyleSettings && (
                  <motion.div
                    {...contentAnimation}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-6">
                      {/* 卡片样式 */}
                      <div>
                        <label className="block mb-2 text-white">卡片样式</label>
                        <div className="flex gap-2">
                          {cardStyles.map((style, index) => (
                            <button
                              key={index}
                              onClick={() => setCardStyle(index)}
                              className={`px-4 py-2 rounded ${
                                cardStyle === index ? 'bg-white/50' : 'bg-white/20'
                              } text-white`}
                            >
                              {style.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 渐变角度 */}
                      <div>
                        <label className="block mb-2 text-white">渐变角度: {styleConfig.gradientAngle}°</label>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={styleConfig.gradientAngle}
                          onChange={(e) => setStyleConfig({
                            ...styleConfig,
                            gradientAngle: parseInt(e.target.value)
                          })}
                          className="w-full"
                        />
                      </div>

                      {/* 间距设置 */}
                      <div>
                        <label className="block mb-2 text-white">间距设置</label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-white/60">头像间距</label>
                            <input
                              type="number"
                              value={styleConfig.cardSpacing.avatar}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                cardSpacing: {
                                  ...styleConfig.cardSpacing,
                                  avatar: parseInt(e.target.value)
                                }
                              })}
                              className="w-full px-2 py-1 bg-white/20 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/60">内容间距</label>
                            <input
                              type="number"
                              value={styleConfig.cardSpacing.content}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                cardSpacing: {
                                  ...styleConfig.cardSpacing,
                                  content: parseInt(e.target.value)
                                }
                              })}
                              className="w-full px-2 py-1 bg-white/20 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/60">时间戳间距</label>
                            <input
                              type="number"
                              value={styleConfig.cardSpacing.timestamp}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                cardSpacing: {
                                  ...styleConfig.cardSpacing,
                                  timestamp: parseInt(e.target.value)
                                }
                              })}
                              className="w-full px-2 py-1 bg-white/20 rounded text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 字体大小设置 */}
                      <div>
                        <label className="block mb-2 text-white">字体大小</label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-white/60">用户名</label>
                            <input
                              type="number"
                              value={styleConfig.fontSize.username}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                fontSize: {
                                  ...styleConfig.fontSize,
                                  username: parseInt(e.target.value)
                                }
                              })}
                              className="w-full px-2 py-1 bg-white/20 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/60">正文</label>
                            <input
                              type="number"
                              value={styleConfig.fontSize.content}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                fontSize: {
                                  ...styleConfig.fontSize,
                                  content: parseInt(e.target.value)
                                }
                              })}
                              className="w-full px-2 py-1 bg-white/20 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/60">时间戳</label>
                            <input
                              type="number"
                              value={styleConfig.fontSize.timestamp}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                fontSize: {
                                  ...styleConfig.fontSize,
                                  timestamp: parseInt(e.target.value)
                                }
                              })}
                              className="w-full px-2 py-1 bg-white/20 rounded text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 文字颜色设置 */}
                      <div>
                        <label className="block mb-2 text-white">文字颜色</label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-white/60">用户名</label>
                            <input
                              type="color"
                              value={styleConfig.textColor.username}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                textColor: {
                                  ...styleConfig.textColor,
                                  username: e.target.value
                                }
                              })}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/60">正文</label>
                            <input
                              type="color"
                              value={styleConfig.textColor.content}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                textColor: {
                                  ...styleConfig.textColor,
                                  content: e.target.value
                                }
                              })}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/60">时间戳</label>
                            <input
                              type="color"
                              value={styleConfig.textColor.timestamp}
                              onChange={(e) => setStyleConfig({
                                ...styleConfig,
                                textColor: {
                                  ...styleConfig.textColor,
                                  timestamp: e.target.value
                                }
                              })}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 内容设置卡片 */}
            <div className="bg-white/30 backdrop-blur-sm rounded-lg">
              <button
                onClick={() => setShowContentSettings(!showContentSettings)}
                className="w-full px-4 py-3 text-left flex justify-between items-center text-white"
              >
                <h2 className="text-xl font-bold">内容设置</h2>
                <span className="text-2xl">{showContentSettings ? '−' : '+'}</span>
              </button>
              
              <AnimatePresence>
                {showContentSettings && (
                  <motion.div
                    {...contentAnimation}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-6">
                      {/* 作者输入 */}
                      <div>
                        <label className="block mb-2 text-white">作者</label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-white/30 backdrop-blur-sm text-white placeholder-white/50"
                          placeholder="输入作者"
                        />
                      </div>

                      {/* 正文输入 */}
                      <div>
                        <label className="block mb-2 text-white">正文内容</label>
                        <textarea
                          value={markdown}
                          onChange={(e) => setMarkdown(e.target.value)}
                          className="w-full h-[200px] p-4 rounded-lg bg-white/30 backdrop-blur-sm text-white placeholder-white/50"
                          placeholder="在这里输入正文内容..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 预览区 */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden">
              <div id="export-wrapper" style={gradientStyle}>
                <motion.div
                  id="export-container"
                  className={`card ${cardStyles[cardStyle].class} max-w-2xl mx-auto rounded-2xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* 作者信息 */}
                  <div 
                    className="flex items-center gap-4"
                    style={{ marginBottom: styleConfig.cardSpacing.avatar }}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                      {author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h2 style={{
                        fontSize: `${styleConfig.fontSize.username}px`,
                        color: styleConfig.textColor.username
                      }}>
                        {author}
                      </h2>
                    </div>
                  </div>

                  {/* 内容区域 */}
                  <div 
                    className="markdown-content"
                    style={{
                      fontSize: `${styleConfig.fontSize.content}px`,
                      color: styleConfig.textColor.content,
                      marginBottom: styleConfig.cardSpacing.content
                    }}
                  >
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                  </div>

                  {/* 时间戳 */}
                  <div style={{
                    fontSize: `${styleConfig.fontSize.timestamp}px`,
                    color: styleConfig.textColor.timestamp,
                    marginTop: styleConfig.cardSpacing.timestamp
                  }}>
                    {currentTime} · {currentDate}
                  </div>
                </motion.div>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="w-full py-2 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-lg transition-colors text-white"
            >
              导出为图片
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
