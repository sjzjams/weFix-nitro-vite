
import { ServiceCategoryType, OrderStatus, UserRole } from './types';
import type { ServiceCategory, Technician, Order } from './types';

export const PRIMARY_COLOR = '#07C160';
export const WARNING_COLOR = '#FA5151';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: '1', name: '家电维修', icon: 'washing-machine', type: ServiceCategoryType.APPLIANCE, color: 'bg-blue-100 text-blue-600' },
  { id: '2', name: '水电维修', icon: 'droplet', type: ServiceCategoryType.PLUMBING, color: 'bg-cyan-100 text-cyan-600' },
  { id: '3', name: '电路维修', icon: 'zap', type: ServiceCategoryType.PLUMBING, color: 'bg-yellow-100 text-yellow-600' },
  { id: '4', name: '数码维修', icon: 'smartphone', type: ServiceCategoryType.DIGITAL, color: 'bg-purple-100 text-purple-600' },
  { id: '5', name: '家具维修', icon: 'sofa', type: ServiceCategoryType.CLEANING, color: 'bg-orange-100 text-orange-600' },
  { id: '6', name: '保洁清洗', icon: 'spray-can', type: ServiceCategoryType.CLEANING, color: 'bg-green-100 text-green-600' },
  { id: '7', name: '开锁换锁', icon: 'key', type: ServiceCategoryType.APPLIANCE, color: 'bg-red-100 text-red-600' },
  { id: '8', name: '更多服务', icon: 'grid', type: ServiceCategoryType.APPLIANCE, color: 'bg-gray-100 text-gray-600' },
];

export const NEARBY_TECHNICIANS: Technician[] = [
  {
    id: 't1',
    name: '王师傅',
    rating: 4.9,
    ordersCompleted: 1240,
    distance: '0.5km',
    avatar: 'https://picsum.photos/100/100?random=1',
    tags: ['电路', '水管'],
    isOnline: true,
    balance: 5400
  },
  {
    id: 't2',
    name: '李师傅',
    rating: 4.8,
    ordersCompleted: 850,
    distance: '1.2km',
    avatar: 'https://picsum.photos/100/100?random=2',
    tags: ['空调维修', '家电'],
    isOnline: true,
    balance: 3200
  },
  {
    id: 't3',
    name: '张哥',
    rating: 4.7,
    ordersCompleted: 500,
    distance: '2.0km',
    avatar: 'https://picsum.photos/100/100?random=3',
    tags: ['数码', '电脑'],
    isOnline: false,
    balance: 1500
  },
];

// Mock orders including some unassigned ones for the Technician Pool
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-20231001-001',
    serviceType: '空调维修',
    description: '空调漏水严重，需要紧急处理。',
    status: OrderStatus.PROCESSING,
    technician: NEARBY_TECHNICIANS[1],
    technicianId: 't2',
    clientName: '张先生',
    clientAvatar: 'https://picsum.photos/100/100?random=user1',
    date: '2023-10-24 14:30',
    price: 150,
    address: '阳光花园 3号楼 402室',
  },
  {
    id: 'ORD-20231001-002',
    serviceType: '管道疏通',
    description: '厨房水槽堵塞，下水很慢。',
    status: OrderStatus.COMPLETED,
    technician: NEARBY_TECHNICIANS[0],
    technicianId: 't1',
    clientName: '张先生',
    clientAvatar: 'https://picsum.photos/100/100?random=user1',
    date: '2023-10-20 09:00',
    price: 80,
    address: '阳光花园 3号楼 402室',
    rating: 5,
    comment: '师傅上门很快，技术很好！'
  },
  {
    id: 'ORD-20231001-003',
    serviceType: '笔记本维修',
    description: '屏幕闪烁不定。',
    status: OrderStatus.PENDING,
    clientName: '张先生',
    clientAvatar: 'https://picsum.photos/100/100?random=user1',
    date: '2023-10-25 10:00',
    address: '阳光花园 3号楼 402室',
  },
  // Unassigned orders (The Pool)
  {
    id: 'ORD-POOL-001',
    serviceType: '电路维修',
    description: '客厅灯泡闪烁，开关发热，可能有短路风险。',
    status: OrderStatus.PENDING,
    clientName: '李女士',
    clientAvatar: 'https://picsum.photos/100/100?random=user2',
    date: '2023-10-26 18:00',
    address: '幸福小区 8号楼 101室',
    price: 120
  },
  {
    id: 'ORD-POOL-002',
    serviceType: '水管维修',
    description: '卫生间进水管爆裂，急需上门。',
    status: OrderStatus.PENDING,
    clientName: '王先生',
    clientAvatar: 'https://picsum.photos/100/100?random=user3',
    date: '2023-10-26 19:30',
    address: '碧桂园 5号楼 606室',
    price: 200
  }
];

export const MOCK_ADMIN_STATS = {
    totalUsers: 12050,
    activeOrders: 45,
    totalRevenue: 350200,
    pendingComplaints: 2
};
