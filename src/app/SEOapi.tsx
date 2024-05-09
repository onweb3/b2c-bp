
export async function SeoCall({
	type = "landingPage",
	name = "attraction",
	slug,
}: {
	type: string;
	name: string;
	slug?: string;
}) {
	
	try {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/initial/b2c`,
			{ next: { revalidate: 30 } }
		);

		const config = await resp?.json()
		let url = "";
		if (slug) {
			url = `${config?.data?.NEXT_PUBLIC_SERVER_URL}/api/v1/seo/search?type=${type}&name=${name}&slug=${slug}`;
		} else {
			url = `${config?.data?.NEXT_PUBLIC_SERVER_URL}/api/v1/seo/search?type=${type}&name=${name}`;
		}
		const response = await fetch(url, {
			method: "GET",
			cache: "no-store",
		});

		const data = await response.json();

		return data;
	} catch (error) {
		// console.log(error);
		console.log(error);
	}
}
