import {
  Clock,
  Users,
  Globe,
  Star,
  Trophy,
  Cpu,
  Speech,
  PhoneCall,
  Share2,
} from 'lucide-react';

export const getStats = (language: 'zh' | 'en') =>
  language === 'zh'
    ? [
        { icon: Users, number: '634120', label: '关注' },
        { icon: Clock, number: '269', label: '天' },
        { icon: Globe, number: '723', label: '在线申请' },
        { icon: PhoneCall, number: '31', label: '电话面试' },
        { icon: Share2, number: '18', label: '内部推荐' },
        { icon: Speech, number: '14', label: '正式面试' },
        { icon: Cpu, number: '5', label: '技术面试' },
        { icon: Trophy, number: '3', label: '成功 Offer' },
      ]
    : [
        { icon: Users, number: '634120', label: 'Viewers' },
        { icon: Clock, number: '269', label: 'Days' },
        { icon: Globe, number: '723', label: 'Applications' },
        { icon: PhoneCall, number: '31', label: 'Phone Screens' },
        { icon: Share2, number: '18', label: 'Referrals' },
        { icon: Speech, number: '14', label: 'Interviews' },
        { icon: Cpu, number: '5', label: 'Tech Interviews' },
        { icon: Trophy, number: '3', label: 'Offers' },
      ];
