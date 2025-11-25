
export enum UserRole {
  USER = 'USER',
  TECHNICIAN = 'TECHNICIAN',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = '待接单',
  ACCEPTED = '已接单',
  PROCESSING = '进行中',
  COMPLETED = '已完成',
  CANCELLED = '已取消'
}

export enum ServiceCategoryType {
  APPLIANCE = 'Appliance',
  PLUMBING = 'Plumbing',
  DIGITAL = 'Digital',
  CLEANING = 'Cleaning'
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  type: ServiceCategoryType;
  color: string;
}

export interface Technician {
  id: string;
  name: string;
  rating: number;
  ordersCompleted: number;
  distance: string; // e.g., "0.8km"
  avatar: string;
  tags: string[];
  isOnline: boolean;
  balance?: number;
}

export interface Order {
  id: string;
  serviceType: string;
  description: string;
  status: OrderStatus;
  technician?: Technician; // If undefined, it's unassigned (Pending)
  technicianId?: string;
  userId?: string;
  clientName?: string;
  clientAvatar?: string;
  date: string;
  price?: number;
  address: string;
  images?: string[];
  rating?: number;
  comment?: string;
  isPaid?: boolean; // New field for payment status
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isSelf: boolean;
  type: 'text' | 'image' | 'location';
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  balance?: number;
}
