import { FlexProps } from "@chakra-ui/react";

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