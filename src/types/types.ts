export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: IEmailUser[]
  username: string;
  imageUrl: string;
  emailVerified: boolean;
  lastActiveAt: string;
  privateMetadata: {
    role?: string
  }
  organization?: { id: string; name: string };
}

export interface IEmailUser {
  emailAddress: string;
  verification: { status: boolean }
}

export interface IUserSimple {
  userid: string;
  name: string;
  avatar: string;
}

export interface IUserSimpleEmail {
  userid: string;
  name: string;
  avatar: string;
  email: string
}

export interface IUser2 extends Document {
  _id: string;
  name: string;
  email: string;
  image: string;
  orgsId?: {
    label: string
  } | "";
  emailVerified: boolean | null;
}
export interface IEmotion {
  _id: string;
  userId: string;
  avatar: string;
  fullName: string;
  emotionType: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  position: number;
  assigned: IUserSimpleEmail[]
  sprint: number;
  owner: IUserSimpleEmail;
  priority?: number;
  endAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IOrganization {
  _id: string;
  label: string;
  users: IUserSimple[];
  show: boolean;
  owner: IUserSimple;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderProps {
  toggleSidebar: () => void;
}

