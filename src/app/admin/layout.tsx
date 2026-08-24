export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-lenis-prevent="true" className="w-full min-h-screen">
      {children}
    </div>
  );
}
