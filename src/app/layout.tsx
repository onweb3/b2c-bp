import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import { Metadata, ResolvingMetadata } from "next";
import BasicLayout from "./rootLayout";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["300", "400", "500", "600", "700"],
});

// export const metadata: Metadata = {
// 	title: {
// 		default: `Travel Agency in Dubai | Best Tourism Company UAE | ${config?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
// 		template: `%s | ${config?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
// 	},
// 	keywords: [
// 		"travel agency in dubai",
// 		"tourism company in dubai",
// 		"best travel company in dubai",
// 		"tour agency",
// 		"travel and tours",
// 		"travels in dubai",
// 		"tour and travel agency",
// 		"travel agency dubai",
// 		"travel agency uae",
// 	],
// 	description: `Explore Dubai with our tour and travel agency in UAE. Visa services, hotel booking, and airport transfers available. Experienced team. Best services. Contact today!`,
// };

export async function generateMetadata(
	_params: any, // Removed the parameter since it's not needed
	parent: ResolvingMetadata
): Promise<Metadata> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/initial/b2c`,
		{ method: "GET", cache: "no-store" }
	);
	const config = await response.json();

	return {
		title: {
			default: `Travel Agency in Dubai | Best Tourism Company UAE | ${config?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
			template: `%s | ${config?.data?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
		},
		description: `Explore Dubai with our tour and travel agency in UAE. Visa services, hotel booking, and airport transfers available. Experienced team. Best services. Contact today!`,
		keywords: [
			"travel agency in dubai",
			"tourism company in dubai",
			"best travel company in dubai",
			"tour agency",
			"travel and tours",
			"travels in dubai",
			"tour and travel agency",
			"travel agency dubai",
			"travel agency uae",
		],
		openGraph: {
			title: {
				default: `Travel Agency in Dubai | Best Tourism Company UAE | ${config?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
				template: `%s | ${config?.data?.NEXT_PUBLIC_TITLE_SHORT_NAME}`,
			},
			description: `Explore Dubai with our tour and travel agency in UAE. Visa services, hotel booking, and airport transfers available. Experienced team. Best services. Contact today!`,
		},
	};
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: any;
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/initial/b2c`,
		{ method: "GET", cache: "no-store" }
	);
	const config = await response.json();

	return (
		<html lang="en" className={poppins.className}>
			<link
				rel="icon"
				id="companyLogo"
				type="image/svg+xml"
				href={config?.data?.NEXT_PUBLIC_COMPANY_FAVICON}
			/>

			<meta
				name="google-site-verification"
				content="mtr51gMXbd74XW1bqxsw8XXibfrM0itOD0jub1u-dmw"
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
			/>

			{/* Google Tag Manager */}
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${config?.data?.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID}`}
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${config?.data?.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID}');
          `,
				}}
			></script>
			{/* End Google Tag Manager */}

			{/* Tawk.to Script */}
			<script
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `
            var Tawk_API = Tawk_API || {};
            Tawk_LoadStart = new Date();
            (function () {
              var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/64a7dfde94cf5d49dc6219cb/1h4ns505j';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
				}}
			/>
			{/* End of Tawk.to Script */}

			<body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
				<BasicLayout children={children} params={params} />
			</body>
		</html>
	);
}
