import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, ArrowLeft, Image as ImageIcon, PhoneCall, Video, MessageSquare, UserPlus, Wallet, History, ShieldAlert, Users as UsersIcon, Volume2, Sun, Sparkles, Utensils, HeartPulse, ChevronRight } from 'lucide-react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { HealthView } from './views/HealthView';
import { ServiceView } from './views/ServiceView';
import { ProfileView } from './views/ProfileView';
import { SOSModal } from './components/SOSModal';
import { MedicationDetail } from './views/MedicationDetail';
import { VoiceAssistant } from './components/VoiceAssistant';
import { BookingView } from './views/BookingView';
import { GameView } from './views/GameView';
import { SmartHomeView } from './views/SmartHomeView';

// New Sub-views (Inline for simplicity or can be separate files)
const EmergencyContactsView = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-stone-50">
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 pt-12 safe-area-top flex items-center gap-4">
      <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform">
        <ArrowLeft size={28} />
      </button>
      <h2 className="text-2xl font-bold">紧急联系人</h2>
    </div>
    <div className="p-6 space-y-4 pb-32">
      {[
        { name: '大儿子 (张建国)', phone: '139 1234 5678', relation: '长子' },
        { name: '小女儿 (张美玲)', phone: '137 8765 4321', relation: '次女' },
        { name: '社区管家 (小王)', phone: '150 0000 1111', relation: '管家' },
      ].map((contact, i) => (
        <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-stone-900">{contact.name}</p>
            <p className="text-stone-500 font-medium mt-1">{contact.relation} · {contact.phone}</p>
          </div>
          <button className="p-4 bg-red-50 text-red-600 rounded-2xl active:scale-90 transition-transform">
            <PhoneCall size={24} />
          </button>
        </div>
      ))}
      <button className="w-full py-6 border-2 border-dashed border-stone-200 rounded-[32px] text-stone-400 font-bold flex items-center justify-center gap-2">
        <UserPlus size={24} /> 添加联系人
      </button>
    </div>
  </div>
);

const FamilyMembersView = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-stone-50">
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 pt-12 safe-area-top flex items-center gap-4">
      <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform">
        <ArrowLeft size={28} />
      </button>
      <h2 className="text-2xl font-bold">我的家属</h2>
    </div>
    <div className="p-6 grid grid-cols-1 gap-4">
      {[
        { name: '张建国', role: '管理员', relation: '儿子', avatar: 'son' },
        { name: '张美玲', role: '成员', relation: '女儿', avatar: 'daughter' },
        { name: '李芳', role: '成员', relation: '儿媳', avatar: 'user1' },
      ].map((member, i) => (
        <div key={i} className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100 flex items-center gap-4">
          <img src={`https://picsum.photos/seed/${member.avatar}/100/100`} alt="avatar" className="w-16 h-16 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{member.name}</span>
              <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md text-xs font-bold">{member.role}</span>
            </div>
            <p className="text-stone-500 font-medium">{member.relation}</p>
          </div>
          <ChevronRight className="text-stone-300" />
        </div>
      ))}
    </div>
  </div>
);

const WalletView = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-stone-50">
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 pt-12 safe-area-top flex items-center gap-4">
      <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform">
        <ArrowLeft size={28} />
      </button>
      <h2 className="text-2xl font-bold">我的钱包</h2>
    </div>
    <div className="p-6">
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-8 rounded-[48px] text-white shadow-xl mb-8 relative overflow-hidden">
        <p className="text-stone-400 font-medium mb-2">账户余额 (元)</p>
        <h3 className="text-5xl font-black">256.00</h3>
        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-white text-stone-900 py-4 rounded-2xl font-bold active:scale-95 transition-transform">充值</button>
          <button className="flex-1 bg-stone-700 text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform">提现</button>
        </div>
        <Wallet className="absolute -right-8 -bottom-8 text-white/10" size={160} />
      </div>
      <h4 className="text-xl font-bold mb-4">收支明细</h4>
      <div className="space-y-4">
        {[
          { title: '助餐服务支出', date: '今天 11:30', amount: '-15.00', type: 'expense' },
          { title: '充值', date: '昨天 09:00', amount: '+200.00', type: 'income' },
          { title: '助洁服务支出', date: '3月5日', amount: '-50.00', type: 'expense' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100 flex items-center justify-between">
            <div>
              <p className="font-bold text-stone-900">{item.title}</p>
              <p className="text-stone-400 text-sm mt-1">{item.date}</p>
            </div>
            <span className={`text-xl font-black ${item.type === 'income' ? 'text-emerald-500' : 'text-stone-900'}`}>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OrderHistoryView = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-stone-50">
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 pt-12 safe-area-top flex items-center gap-4">
      <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform">
        <ArrowLeft size={28} />
      </button>
      <h2 className="text-2xl font-bold">历史订单</h2>
    </div>
    <div className="p-6 space-y-4">
      {[
        { title: '助餐服务', status: '已完成', date: '2024-03-08 11:30', price: '¥15.00', icon: Utensils },
        { title: '助洁服务', status: '已完成', date: '2024-03-05 14:00', price: '¥50.00', icon: Sparkles },
        { title: '助医服务', status: '已取消', date: '2024-03-01 09:00', price: '¥0.00', icon: HeartPulse },
      ].map((order, i) => {
        const Icon = order.icon;
        return (
          <div key={i} className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600">
                  <Icon size={20} />
                </div>
                <span className="font-bold text-lg">{order.title}</span>
              </div>
              <span className={`font-bold ${order.status === '已完成' ? 'text-emerald-500' : 'text-stone-400'}`}>{order.status}</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-stone-400 text-sm">
                下单时间：{order.date}
              </div>
              <span className="text-xl font-black text-stone-900">{order.price}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isCallMenuOpen, setIsCallMenuOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState<{ name: string; type: 'voice' | 'video' } | null>(null);
  const [isLeavingMessage, setIsLeavingMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [subView, setSubView] = useState<{ type: string; id?: string } | null>(null);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const mainScrollPos = React.useRef(0);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSubView = (type: string, id?: string) => {
    mainScrollPos.current = window.scrollY;
    setSubView({ type, id });
    window.scrollTo(0, 0);
  };

  const closeSubView = () => {
    setSubView(null);
    setTimeout(() => {
      window.scrollTo({ top: mainScrollPos.current, behavior: 'instant' as any });
    }, 0);
  };

  const renderView = () => {
    if (subView?.type === 'medication') {
      return <MedicationDetail onBack={closeSubView} />;
    }
    if (subView?.type === 'booking' && subView.id) {
      return <BookingView serviceId={subView.id} onBack={closeSubView} />;
    }
    if (subView?.type === 'game') {
      return <GameView onBack={closeSubView} />;
    }
    if (subView?.type === 'emergency_contacts') {
      return <EmergencyContactsView onBack={closeSubView} />;
    }
    if (subView?.type === 'family_members') {
      return <FamilyMembersView onBack={closeSubView} />;
    }
    if (subView?.type === 'wallet') {
      return <WalletView onBack={closeSubView} />;
    }
    if (subView?.type === 'order_history') {
      return <OrderHistoryView onBack={closeSubView} />;
    }
    if (subView?.type === 'smart_home') {
      return <SmartHomeView onBack={closeSubView} />;
    }
    if (subView?.type === 'gallery') {
      return (
        <div className="min-h-screen bg-stone-50">
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 pt-12 safe-area-top flex items-center gap-4">
            <button onClick={closeSubView} className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform">
              <ArrowLeft size={28} />
            </button>
            <h2 className="text-2xl font-bold">亲情相册</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-2 rounded-3xl shadow-sm border border-stone-100">
                <img 
                  src={`https://picsum.photos/seed/family${i}/400/400`} 
                  alt="Family" 
                  className="w-full aspect-square object-cover rounded-2xl mb-2"
                  referrerPolicy="no-referrer"
                />
                <p className="text-center font-bold text-stone-700">美好瞬间 {i}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (subView?.type === 'notifications') {
      return (
        <div className="min-h-screen bg-stone-50">
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 pt-12 safe-area-top flex items-center gap-4">
            <button onClick={closeSubView} className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform">
              <ArrowLeft size={28} />
            </button>
            <h2 className="text-2xl font-bold">消息通知</h2>
          </div>
          <div className="p-6 space-y-4">
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100 flex items-start gap-4 active:bg-stone-50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <History size={24} />
              </div>
              <div>
                <p className="font-bold text-stone-800 text-lg">系统提醒</p>
                <p className="text-stone-500">您的助餐预约已确认，请准时于 11:30 用餐。</p>
                <p className="text-stone-400 text-sm mt-2">10分钟前</p>
              </div>
            </motion.div>
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100 flex items-start gap-4 active:bg-stone-50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ImageIcon size={24} />
              </div>
              <div>
                <p className="font-bold text-stone-800 text-lg">亲情互动</p>
                <p className="text-stone-500">小女儿给您发了一张新照片，快去看看吧！</p>
                <p className="text-stone-400 text-sm mt-2">1小时前</p>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            onSOS={() => setIsSOSOpen(true)} 
            onMedicationDetail={() => openSubView('medication')} 
            onGameEntry={() => openSubView('game')}
            onGalleryOpen={() => openSubView('gallery')}
            onCallOpen={() => setIsCallMenuOpen(true)}
            onSmartHomeOpen={() => openSubView('smart_home')}
            onTasksComplete={() => setShowAchievementPopup(true)}
          />
        );
      case 'health':
        return <HealthView />;
      case 'services':
        return <ServiceView 
          onSelectService={(id) => openSubView('booking', id)} 
          onShowHistory={() => openSubView('order_history')}
        />;
      case 'profile':
        return <ProfileView 
          onEmergencyContacts={() => openSubView('emergency_contacts')}
          onFamilyMembers={() => openSubView('family_members')}
          onWallet={() => openSubView('wallet')}
        />;
      default:
        return (
          <HomeView 
            onSOS={() => setIsSOSOpen(true)} 
            onMedicationDetail={() => openSubView('medication')} 
            onGameEntry={() => openSubView('game')}
            onGalleryOpen={() => openSubView('gallery')}
            onCallOpen={() => setIsCallMenuOpen(true)}
            onTasksComplete={() => setShowAchievementPopup(true)}
          />
        );
    }
  };

  return (
    <div className="iphone-15-container font-sans overflow-x-hidden">
      {!subView && <Header onNotificationClick={() => openSubView('notifications')} />}
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={subView?.type || activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Action Buttons */}
      {!subView && (
        <div className="fixed inset-x-6 bottom-28 flex items-center justify-between z-40 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-[70px] h-[70px] bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white pointer-events-auto"
            onClick={() => setIsCallMenuOpen(true)}
          >
            <PhoneCall size={32} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-[70px] h-[70px] bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white pointer-events-auto"
            onClick={() => setIsVoiceOpen(true)}
          >
            <Mic size={36} />
          </motion.button>
        </div>
      )}

      {/* Call Menu Modal */}
      <AnimatePresence>
        {isCallMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => {
              setIsCallMenuOpen(false);
              setSelectedContact(null);
              setIsLeavingMessage(false);
              setMessageSent(false);
            }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-stone-50 w-full max-w-lg rounded-t-[48px] flex flex-col max-h-[85vh] relative shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            >
                {/* Fixed Header */}
                <div className="p-6 pb-2 border-b border-stone-100 flex flex-col items-center">
                  <div className="w-12 h-1.5 bg-stone-200 rounded-full mb-6" />
                  <div className="w-full flex items-center justify-between relative">
                    <button 
                      onClick={() => {
                        if (isLeavingMessage) {
                          setIsLeavingMessage(false);
                        } else if (selectedContact) {
                          setSelectedContact(null);
                        } else {
                          setIsCallMenuOpen(false);
                        }
                      }}
                      className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-90 transition-transform"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <h3 className="text-2xl font-bold absolute left-1/2 -translate-x-1/2">
                      {selectedContact ? `呼叫 ${selectedContact}` : '快速拨号'}
                    </h3>
                    {!selectedContact && <button className="text-blue-600 font-bold text-lg">编辑</button>}
                    {selectedContact && <div className="w-12" />} {/* Spacer */}
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 pt-4 pb-24 overflow-y-auto no-scrollbar">
                  {!selectedContact ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { name: '大儿子', avatar: 'son', relation: '长子' },
                          { name: '小女儿', avatar: 'daughter', relation: '次女' },
                          { name: '儿媳妇', avatar: 'user1', relation: '亲人' },
                          { name: '社区医生', avatar: 'user2', relation: '医疗' },
                        ].map((contact) => (
                          <motion.button
                            key={contact.name}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedContact(contact.name)}
                            className="bg-white p-6 rounded-[40px] shadow-sm border border-stone-100 flex flex-col items-center gap-3 active:bg-stone-50 transition-colors"
                          >
                            <div className="relative">
                              <img src={`https://picsum.photos/seed/${contact.avatar}/150/150`} alt={contact.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md" referrerPolicy="no-referrer" />
                              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white" />
                            </div>
                            <div className="text-center">
                              <p className="font-black text-xl text-stone-900">{contact.name}</p>
                              <p className="text-stone-400 font-bold text-sm">{contact.relation}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                      <button className="w-full py-6 border-2 border-dashed border-stone-200 rounded-[32px] text-stone-400 font-bold flex items-center justify-center gap-2">
                        <UserPlus size={24} /> 添加常用联系人
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="grid grid-cols-3 gap-4">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setIsCalling({ name: selectedContact, type: 'voice' });
                            setIsCallMenuOpen(false);
                          }}
                          className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 flex flex-col items-center gap-3 text-blue-600"
                        >
                          <PhoneCall size={32} />
                          <span className="font-bold">语音通话</span>
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setIsCalling({ name: selectedContact, type: 'video' });
                            setIsCallMenuOpen(false);
                          }}
                          className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 flex flex-col items-center gap-3 text-emerald-600"
                        >
                          <Video size={32} />
                          <span className="font-bold">视频通话</span>
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsLeavingMessage(true)}
                          className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 flex flex-col items-center gap-3 text-amber-600"
                        >
                          <MessageSquare size={32} />
                          <span className="font-bold">留言</span>
                        </motion.button>
                      </div>
                      
                      <AnimatePresence>
                        {isLeavingMessage && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 space-y-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-bold text-stone-600">选择留言内容</h4>
                                <button 
                                  onClick={() => setIsLeavingMessage(false)}
                                  className="text-stone-400 font-bold"
                                >
                                  取消
                                </button>
                              </div>
                              
                              {messageSent ? (
                                <motion.div 
                                  initial={{ scale: 0.9, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="bg-emerald-50 p-8 rounded-[32px] text-center border border-emerald-100"
                                >
                                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles size={32} />
                                  </div>
                                  <p className="text-emerald-700 font-black text-xl">留言已发送成功！</p>
                                  <p className="text-emerald-600/70 font-bold mt-1">孩子们会尽快看到的</p>
                                </motion.div>
                              ) : (
                                <>
                                  <div className="grid grid-cols-2 gap-3">
                                    {[
                                      '我很好，放心吧',
                                      '有空回个电话',
                                      '想你们了',
                                      '晚点再联系',
                                      '记得按时吃饭',
                                      '药快吃完了'
                                    ].map((phrase) => (
                                      <motion.button
                                        key={phrase}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                          setMessageSent(true);
                                          setTimeout(() => {
                                            setMessageSent(false);
                                            setIsLeavingMessage(false);
                                            setIsCallMenuOpen(false);
                                            setSelectedContact(null);
                                          }, 2000);
                                        }}
                                        className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm text-stone-700 font-bold text-base active:bg-stone-50"
                                      >
                                        {phrase}
                                      </motion.button>
                                    ))}
                                  </div>
                                  
                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-6 bg-amber-500 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-3 shadow-lg shadow-amber-200"
                                  >
                                    <Mic size={28} />
                                    按住 语音留言
                                  </motion.button>
                                </>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!isLeavingMessage && (
                        <button 
                          onClick={() => {
                            setIsCallMenuOpen(false);
                            setSelectedContact(null);
                          }}
                          className="w-full py-5 bg-stone-200 text-stone-600 rounded-2xl font-black text-xl"
                        >
                          取消
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!subView && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}
      
      {/* Calling Screen */}
      <AnimatePresence>
        {isCalling && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-stone-900 z-[100] flex flex-col items-center justify-between py-16 px-8 text-white"
          >
            <div className="text-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden mx-auto mb-6 shadow-2xl"
              >
                <img src={`https://picsum.photos/seed/${isCalling.name}/200/200`} alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
              <h3 className="text-4xl font-black mb-2">{isCalling.name}</h3>
              <p className="text-stone-400 text-xl font-medium">正在呼叫{isCalling.type === 'video' ? '视频' : '语音'}...</p>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full max-w-sm">
              <div className="flex flex-col items-center gap-2">
                <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20">
                  <Mic size={28} />
                </button>
                <span className="text-sm font-bold text-stone-400">静音</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20">
                  <Video size={28} />
                </button>
                <span className="text-sm font-bold text-stone-400">摄像头</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20">
                  <Volume2 size={28} />
                </button>
                <span className="text-sm font-bold text-stone-400">免提</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCalling(null)}
              className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-900/40"
            >
              <PhoneCall size={36} className="rotate-[135deg]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
      <VoiceAssistant isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievementPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-8"
            onClick={() => setShowAchievementPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-[48px] p-10 text-center shadow-2xl max-w-sm relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Sparkles size={48} fill="currentColor" />
              </div>
              <h3 className="text-3xl font-black text-stone-900 mb-4">太棒了！</h3>
              <p className="text-stone-500 text-lg font-bold leading-relaxed mb-8">
                您已经完成了今日的所有健康计划！坚持就是胜利，为您点赞！👍
              </p>
              <button
                onClick={() => setShowAchievementPopup(false)}
                className="w-full bg-stone-900 text-white py-5 rounded-2xl text-xl font-black shadow-xl shadow-stone-200 active:scale-95 transition-transform"
              >
                收下鼓励
              </button>
              
              {/* Decorative elements */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -right-8 -top-8 text-amber-50/50"
              >
                <Sun size={120} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
