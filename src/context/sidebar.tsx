"use client"

import { createContext, ReactNode, useContext, useState } from 'react';
import { SidebarContextType } from '@/types';

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode}) => {
	const [isHidden, setHidden] = useState<boolean>(true);

	return (
		<SidebarContext.Provider value={{isHidden, setHidden}}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SidebarContext);

	if (!context) throw new Error("useSidebar must be used within an SidebarProvider");
	else return context;
};