import { FlexProps } from "@chakra-ui/react";
import mongoose from "mongoose";

export interface IAuth extends Document {
  email: string;
  password: string;
}

export interface IUser extends Document {
  name: string;
  avatar: string;
  createdAt: Date;
  verified: boolean;
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

