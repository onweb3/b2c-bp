"use client";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";
import ClientCommons from "./ClientCommons";
import { ReduxProvider } from "@/redux/provider";
import FetchInitialData from "./FetchInitialData";
import FetchUserData from "./fetchUserData";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import SectionDowloadApp from "./(home)/SectionDowloadApp";
import FooterNav from "@/components/FooterNav";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import StickyBanner from "@/components/StickyBanner/StickyBanner";
import MobileMainNav from "./(client-components)/(Header)/MobileMainNav";
import { SeoCall } from "./SEOapi";

function BasicLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: any;
}) {
	const pathname = usePathname();
	
	useEffect(() => {
		if (pathname && pathname.startsWith("/b2b")) {
			window.location.replace("https://b2b.mytravellerschoice.com");
		}
	}, [pathname]);

	return (
		<div>
			{" "}
			<SessionProvider>
				<ReduxProvider>
					<ClientCommons />
					<FetchInitialData />
					<FetchUserData />
					<SiteHeader />
					<MobileMainNav />
					{children}
					<SectionDowloadApp />
					<FooterNav />
					<Footer />
				</ReduxProvider>
			</SessionProvider>
		</div>
	);
}

export default BasicLayout;
