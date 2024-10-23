export interface IAuth extends Document {
  email: string;
  password: string;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  image: string;
  orgsId?: string;
  emailVerified: boolean | null;
}


export interface IOrganization extends Document {
  _id: string;
  label: string;
  users: string[];
  show: boolean;
  owner: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderProps {
  toggleSidebar: () => void;
}

