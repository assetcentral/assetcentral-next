import { CurrencyProvider } from "@/components/marketing/CurrencyProvider";
import { Footer } from "@/components/marketing/Footer";
import { Nav } from "@/components/marketing/Nav";
import { AttributionTracker } from "@/components/marketing/AttributionTracker";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      {/* First-touch attribution capture — writes a .assetcentral.ai
          cookie with UTMs + referrer + landing URL so the dashboard's
          signup form can attribute correctly across the cross-subdomain
          hop. Renders nothing; runs only on first visit. */}
      <AttributionTracker />
      <Nav />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer />
    </CurrencyProvider>
  );
}
