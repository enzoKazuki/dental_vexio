import { AlertProvider, AuthProvider, SidebarProvider } from "@/context";

export const Providers = ({ children }: { children: React.ReactNode}) => {
   return (
		<AuthProvider>
			<AlertProvider>
				<SidebarProvider>
					{children}
				</SidebarProvider>
			</AlertProvider>
		</AuthProvider>
   );
};