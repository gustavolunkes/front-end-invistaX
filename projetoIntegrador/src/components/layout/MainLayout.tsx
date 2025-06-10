import Header from './Header';
import { cn } from '../../lib/utils';
import { Tabs, TabsContent } from '../../components/ui/tabs';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const MainLayout = ({ children = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background w-full">
    <Header />
      <Tabs defaultValue="default">
        <TabsContent value="default" className="flex-1">
          <main className={cn(
            "flex-1 p-6 transition-all duration-300"
          )}>
            {children}
          </main>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainLayout;

