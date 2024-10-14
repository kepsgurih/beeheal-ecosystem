import { FlexProps } from "@chakra-ui/react";

export interface IAuth extends Document {
  email: string;
  password: string;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
  emailVerified: boolean | null;
}

export interface IUserState {
  __v: string;
  _id: string;
  avatar: string;
  createdAt: string;
  email: string;
  name: string;
}

export interface IOrganization extends Document {
  org_id: string;
  label: string;
}

export interface SidebarItemProps extends FlexProps {
  icon: React.ReactElement;
  children: React.ReactNode;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderProps {
  toggleSidebar: () => void;
}

