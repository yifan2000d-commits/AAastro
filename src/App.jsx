import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Star, 
  Sun, 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  Instagram, 
  BookOpen, 
  Sparkles,
  Heart,
  Briefcase,
  GraduationCap,
  Activity,
  CheckCircle,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';

// --- 数据部分 ---

// 1. 科普文章数据
const episodes = [
  {
    id: 1,
    title: "什么是 D9 (Navamsa) 盘？",
    subtitle: "灵魂的真实归宿与下半生的剧本。D9盘不仅仅是婚姻盘，它是你果实成熟后的样子。",
    content: "D9盘，即Navamsa盘，在印度占星中占据着至关重要的地位。如果说D1本命盘是树的根基，那么D9就是树上的果实。它揭示了你35岁之后逐渐显化出的真实性格、婚姻质量以及灵魂深处的渴望。很多时候，D1盘看起来不错，但如果D9盘无力，那么世俗的成就可能难以转化为内心的满足感...",
    category: "进阶知识",
    readTime: "5 min",
    color: "bg-indigo-50"
  },
  {
    id: 2,
    title: "土星回归 (Saturn Return)",
    subtitle: "30岁前的成人礼。每一次压力都是宇宙在帮你剔除不属于你的东西。",
    content: "土星回归通常发生在28-30岁之间，这是土星绕黄道一周回到你出生时位置的时刻。这段时间通常伴随着巨大的压力、职业变动、关系结束或责任加重。但这并非坏事，土星是严师，它在强迫你面对现实，构建真正属于你自己的生活结构...",
    category: "行星影响",
    readTime: "8 min",
    color: "bg-violet-50"
  },
  {
    id: 3,
    title: "月亮星座的秘密",
    subtitle: "你的情绪安全感来源与潜意识。月亮比太阳更能代表你的心理状态。",
    content: "在印度占星中，月亮（Chandra）的重要性甚至超过太阳。它代表了你的感知模式、情绪反应机制以及你如何滋养自己。了解月亮落在哪个星宿（Nakshatra），能让你明白为什么你在某些情境下会有特定的情绪反应...",
    category: "基础入门",
    readTime: "4 min",
    color: "bg-purple-50"
  },
  {
    id: 4,
    title: "南北交点 (Rahu & Ketu)",
    subtitle: "业力之轴：前世的天赋与今生的渴望。",
    content: "Rahu（北交点）代表了今生我们极其渴望、甚至有些执着要去体验的领域，那里有我们的物质欲望和成长动力；而Ketu（南交点）则代表了我们前世已经精通、今生想要某种程度上'解脱'或'隔离'的领域...",
    category: "业力占星",
    readTime: "6 min",
    color: "bg-fuchsia-50"
  }
];

// 2. 付费服务数据 (根据用户图片更新)
const servicesData = [ // 为了避免变量名冲突，我将原 services 改名为 servicesData
  {
    id: 1,
    title: "感情婚姻分析单项",
    price: "¥ 498",
    icon: <Heart className="text-rose-400" size={24} />,
    desc: "深度解析婚恋业力。包含正缘特质、恋爱婚姻顺利度及结婚时间预测。",
    features: [
      "正缘特质 (是否适合你)",
      "恋爱 & 婚姻顺利度分析",
      "容易踩的坑与注意问题",
      "桃花点、结婚时间预测",
      "D1本命 + D9感情盘深度解析"
    ],
    popular: true,
    color: "border-rose-100 bg-rose-50/50"
  },
  {
    id: 2,
    title: "事业全面分析单项",
    price: "¥ 398",
    icon: <Briefcase className="text-blue-400" size={24} />,
    desc: "深度解析事业财富。包含契合的主业方向、发展趋势及财运周期。",
    features: [
      "契合的主业发展方向",
      "事业瓶颈与解决措施",
      "赚钱、存钱能力分析",
      "财运周期与未来增长点",
      "涉及 AK/AMK 及 D10 事业盘"
    ],
    popular: false,
    color: "border-blue-100 bg-blue-50/50"
  },
  {
    id: 3,
    title: "学业发展分析单项",
    price: "¥ 358",
    icon: <GraduationCap className="text-emerald-400" size={24} />,
    desc: "深度解析学业潜能。包含性格特点、专业选择建议及考运分析。",
    features: [
      "学业方面性格特点与维力",
      "需要注意的问题和建议",
      "专业选择方向建议",
      "未来周期学业运势",
      "D1 + D24 学业分盘解析"
    ],
    popular: false,
    color: "border-emerald-100 bg-emerald-50/50"
  },
  {
    id: 4,
    title: "身心健康分析单项",
    price: "¥ 298",
    icon: <Activity className="text-orange-400" size={24} />,
    desc: "深度解析健康状态。关注身体健康状态、心理模式及保养建议。",
    features: [
      "整体身体健康状态",
      "心理 & 行为模式分析",
      "需注意保养的健康问题",
      "D1 + D30 健康宫位情况",
      "未来短期身体状况预测"
    ],
    popular: false,
    color: "border-orange-100 bg-orange-50/50"
  }
];

// --- 组件部分 ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 新增状态：控制文章详情弹窗
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 导航栏组件
  const Navigation = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer font-serif" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-400 rounded-full flex items-center justify-center text-white shadow-lg">
            <Moon size={18} fill="currentColor" />
          </div>
          {/* 修改这里：品牌名称 */}
          <span className={`text-xl font-bold tracking-wide ${scrolled || activeTab !== 'home' ? 'text-slate-800' : 'text-slate-800 md:text-white'}`}>
            AA ASTRO
          </span>
        </div>

        <div className={`hidden md:flex gap-8 text-sm font-medium tracking-wider ${scrolled || activeTab !== 'home' ? 'text-slate-600' : 'text-white/90'}`}>
          {/* 修改这里：导航菜单项，Readings 改为 Services */}
          {['Home', 'Episodes', 'Services', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className="hover:text-violet-500 transition-colors uppercase text-xs tracking-widest"
            >
              {item}
            </button>
          ))}
        </div>

        <button 
          className="md:hidden text-slate-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu className={scrolled || activeTab !== 'home' ? 'text-slate-800' : 'text-slate-800 md:text-white'} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-8 px-6 flex flex-col gap-6 md:hidden">
          {['Home', 'Episodes', 'Services', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => {
                setActiveTab(item.toLowerCase());
                setIsMenuOpen(false);
              }}
              className="text-left text-lg font-serif text-slate-800"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  // 文章详情弹窗组件
  const EpisodeModal = () => {
    if (!selectedEpisode) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEpisode(null)}></div>
        <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setSelectedEpisode(null)}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-500" />
          </button>
          
          <span className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-bold tracking-widest uppercase mb-6">
            {selectedEpisode.category}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4 leading-tight">
            {selectedEpisode.title}
          </h2>
          
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-8 pb-8 border-b border-slate-100">
            <BookOpen size={16} />
            <span>阅读时间: {selectedEpisode.readTime}</span>
          </div>
          
          <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed">
            <p className="font-medium text-lg text-slate-800 mb-6">{selectedEpisode.subtitle}</p>
            <p>{selectedEpisode.content}</p>
            <p className="mt-4">（此处为演示内容，实际网站将展示完整占星文章...）</p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <button 
              onClick={() => setSelectedEpisode(null)}
              className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <ArrowLeft size={16} /> 返回列表
            </button>
            <button 
              onClick={() => {
                setSelectedEpisode(null);
                setActiveTab('services'); // 修改跳转目标为 services
              }}
              className="bg-violet-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              预约相关解读
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 首页Hero组件
  const Hero = () => (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* ... existing background animations ... */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"></div>
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-violet-200 text-xs tracking-widest uppercase mb-6 border border-white/10">
          <Sparkles size={14} />
          Vedic Astrology & Conscious Living
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
          解读星图中的<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-fuchsia-200 italic">
            灵魂蓝图
          </span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
          在这里，我们不只是预测未来，而是通过古老的印度占星智慧，
          帮助你理清当下的混乱，找到属于你的人生节奏。
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setActiveTab('services')} // 修改跳转
            className="px-8 py-4 bg-white text-slate-900 rounded-full font-medium hover:bg-violet-50 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            预约咨询 <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => setActiveTab('episodes')}
            className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all"
          >
            探索知识库
          </button>
        </div>
      </div>
    </div>
  );

  // 文章列表组件
  const Episodes = () => (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">星际科普</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            深入浅出的印度占星知识库，从基础概念到进阶技法，带你读懂星星的语言。
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {episodes.map((episode) => (
            <div 
              key={episode.id} 
              onClick={() => setSelectedEpisode(episode)}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 transition-transform group-hover:scale-150 ${episode.color}`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold tracking-widest text-violet-600 uppercase bg-violet-50 px-3 py-1 rounded-full">
                    {episode.category}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <BookOpen size={14} /> {episode.readTime}
                  </span>
                </div>
                
                <h3 className="text-2xl font-serif text-slate-800 mb-3 group-hover:text-violet-700 transition-colors">
                  {episode.title}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">
                  {episode.subtitle}
                </p>
                
                <div className="flex items-center text-violet-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  阅读全文 <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 服务列表组件 (原 Readings，现改为 Services)
  const Services = () => (
    <div className="pt-32 pb-20 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">咨询服务</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            针对不同的人生领域，提供深度的单项解析报告。
            <br />文字报告 + 语音答疑，助你清晰看见未来路径。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${service.color} ${service.popular ? 'border-violet-200 ring-1 ring-violet-100' : 'border-slate-100'}`}
            >
              {/* ... existing card content ... */}
              {service.popular && (
                <div className="absolute top-0 right-0 bg-rose-500 text-white px-4 py-1 rounded-bl-xl rounded-tr-3xl text-xs font-bold tracking-widest uppercase shadow-sm">
                  热门推荐
                </div>
              )}
              
              <div className="flex items-start justify-between mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-slate-700">
                  {service.icon}
                </div>
                <div className="text-3xl font-serif text-slate-800">{service.price}</div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-slate-800">{service.title}</h3>
              <p className="text-sm leading-relaxed mb-6 text-slate-600 min-h-[40px]">
                {service.desc}
              </p>
              
              <div className="bg-white/60 rounded-xl p-5 mb-8 backdrop-blur-sm">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="min-w-4 mt-0.5">
                        <Star size={14} className="text-violet-400" fill="currentColor" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full py-4 rounded-xl font-medium transition-all bg-white border border-slate-200 text-slate-700 hover:bg-violet-600 hover:text-white hover:border-violet-600 shadow-sm hover:shadow-lg">
                预约咨询
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <p className="text-slate-400 text-sm mb-4">需要全盘综合解析或流年大运？</p>
           <button className="text-violet-600 font-medium border-b border-violet-200 hover:border-violet-600 transition-all">
             查看更多高阶服务
           </button>
        </div>
      </div>
    </div>
  );

  // 联系/订阅组件
  const Contact = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubscribe = (e) => {
      e.preventDefault(); // 阻止默认提交刷新页面
      if (!email) return;
      
      setStatus('loading');
      // 模拟网络请求
      setTimeout(() => {
        setStatus('success');
        setEmail('');
      }, 1500);
    };

    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
          
          {status === 'success' ? (
             <div className="py-12 animate-in fade-in zoom-in duration-500">
               <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle size={32} />
               </div>
               <h2 className="text-2xl font-serif text-slate-800 mb-2">订阅成功！</h2>
               <p className="text-slate-500">感谢订阅，请留意你的收件箱。</p>
               <button 
                 onClick={() => setStatus('idle')}
                 className="mt-8 text-sm text-violet-600 font-medium hover:text-violet-800"
               >
                 返回
               </button>
             </div>
          ) : (
            <>
              <Mail size={48} className="mx-auto text-violet-500 mb-6" />
              <h2 className="text-3xl font-serif text-slate-800 mb-4">订阅我们的周刊</h2>
              <p className="text-slate-500 mb-8">
                每周一发送，包含本周星象预警、转运建议以及最新的印占科普文章。
                <br/>无垃圾邮件，随时可退订。
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-12">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  required
                  className="flex-1 px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : '订阅'}
                </button>
              </form>

              <div className="border-t border-slate-100 pt-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">或者直接联系我们</h3>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-2 text-slate-600 group">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                      <MessageCircle size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">微信: aa_astro</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 font-serif text-slate-200">
          <Moon size={16} fill="currentColor" />
          {/* 修改这里：页脚品牌名 */}
          <span className="font-bold tracking-wide">AA ASTRO</span>
        </div>
        
        <div className="text-sm">
          {/* 修改这里：页脚版权年份和名称 */}
          © 2024 AA Astro. All rights reserved.
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">隐私政策</a>
          <a href="#" className="hover:text-white transition-colors">服务条款</a>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-violet-200">
      <Navigation />
      <EpisodeModal />
      
      <main>
        {activeTab === 'home' && (
          <>
            <Hero />
            <Episodes />
            <Services /> {/* 原 Readings 组件 */}
            <Contact />
          </>
        )}
        {activeTab === 'episodes' && <Episodes />}
        {activeTab === 'services' && <Services />} {/* 对应 Services 状态 */}
        {activeTab === 'contact' && <Contact />}
      </main>

      {activeTab !== 'home' && <Footer />}
    </div>
  );
};

export default App;