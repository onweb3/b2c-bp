const title =
`Travel Agency in Dubai | Best Tourism Company UAE | ${process.env.NEXT_PUBLIC_TITLE_SHORT_NAME}`

function capitalizeFirstLetters(text: string) {
  const words = text.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

export async function fetchTitle({
  type = "landingPage",
  name = "attraction",
  slug
}: {
  type: string,
  name: string,
  slug?: string
})  {
  try {
      let url = ""
      if (slug) {
          url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/seo/search?type=${type}&name=${name}&slug=${slug}`
      } else {
          url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/seo/search?type=${type}&name=${name}`
      }
      const response = await fetch(url, { cache: "no-store" })

  const data = await response.json()
      if(data.title){

        return data?.title
      }else{
        return title
      }

  } catch (error) {
      console.log(error);
      
  }

}

// main urls....start

export async function baseUrls(baseUrl:string) {
  const visaTitle = "Apply Dubai Tourist Visa Application Online - MyTravellersChoice"
  const homePages = [{page: '', title: title}, { page:"visa", title: visaTitle}];
  const mainUrls = homePages.map(page => `
  <url>
    <loc>${baseUrl}/${page.page}</loc>
     <title>${page?.title}</title>
  </url>
`)
  return mainUrls
}


// attractions...start

async function getDestinations() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/home/initial-data`,
      { next: { revalidate: 10 } }
    );
    return await response.json();
  } catch (err: any) {
    console.log(err, "initial-data");
  }
}

async function getAttractionDestinations() {
  const response = await getDestinations();
  return response;
}

export const attractionDestinaton = getAttractionDestinations();
export const destinationUrl = async (baseUrl: string) => {
  try {
    const attraction = await attractionDestinaton;
    const currentYear = new Date().getFullYear();

    let attractionUrls;
    if (attraction) {
      attractionUrls = attraction?.destinations.map(
        (elem: any) => `
            <url>
              <loc>${baseUrl}/${elem.slug}</loc>
               <title>Explore ${capitalizeFirstLetters(
                 elem.name
               )} Tours ${currentYear}, Day Trips, Attractions and Activities in ${capitalizeFirstLetters(
          elem.name
        )} | Traveller's Choice</title>
            </url>
          `
      );
    }

    return attractionUrls;
  } catch (error) {
    console.log(error);
  }
};
// Attraction details
export const allAttractions = async () => {
  const attraction = await attractionDestinaton;

  const findAttractions = async (destination: string) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/v1/attractions/all?limit=${500}&skip=${0}&destination=${destination}`
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const attractionList = await Promise.all(
    attraction?.destinations.map((elem: any) => findAttractions(elem.name))
  );

  return attractionList;
};

export const attractionDetails = async () => {
  const allAttractionsDetails = await allAttractions();

  const data = allAttractionsDetails?.flatMap(
    (elem) => elem?.attractions?.data ?? []
  );

  return data;
};

export async function attractionDetailsUrl(baseUrl: string) {
  const attractionUrls = await attractionDetails();
  let allAttractionUrls: any[] = [];

  for (let i = 0; i < attractionUrls.length; i++) {
    const elem = attractionUrls[i];
    try {
      if (!elem?.slug.includes("&") && !elem?.title.includes("&")) {
        allAttractionUrls.push(
          `<url>
                  <loc>${baseUrl}/${elem?.destination?.slug}/${elem?.slug}</loc>
                   <title>${elem?.title} ${capitalizeFirstLetters(
            elem?.destination.name
          )} Tickets | At Best Deals and Offers | Traveller's Choice</title>
                </url>`
        );
      }
    } catch (error) {
      console.error(`Error processing item ${i}: ${error}`);
    }
  }

  return allAttractionUrls;
}
// attractions end

// visa pages starts.......

export const visaDetinationNationalityroutes = async (baseUrl: string) => {
  const visaNationality = async () => {
    try {
      const nationality = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/visa/all/nationality`
      );
      return nationality.json();
    } catch (error) {
      console.log(error);
    }
  };

  const visaDetination = async () => {
    try {
      const destination = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/visa/all`
      );
      return destination.json();
    } catch (error) {
      console.log(error);
    }
  };

  const destination = await visaDetination();
  const nationality = await visaNationality();
  const combinedArray: any[] = [];

  nationality.forEach((nationality: any) => {
    destination.forEach((destination: any) => {
      combinedArray.push({ nationality, destination });
    });
  });

  const url = combinedArray
    .filter(
      (elem) =>
        !elem.destination.slug.includes("&") &&
        !elem.nationality.slug.includes("&")
    )
    .map(
      (elem) => `
                <url>
                  <loc>${baseUrl}/${elem.destination.slug}?nationality=${
        elem.nationality.slug
      }</loc>
                  <title>United Arab Emirates (UAE) Visa Information for ${elem.nationality.slug.toUpperCase()} Nationals | Apply Online - Traveller's Choice</title>
                </url>
              `
    );

  return url;
};
// visa pages end...

//static pages...

export function staticUrls(baseUrl: string) {
  const staticPages = [
    "login",
    "signup",
    "privacy-policy",
    "contact",
  ];

  return staticPages?.map(
    (page) => `
      <url>
      <loc>${baseUrl}/${page}</loc>
       <title>${title}</title>
    </url>
      `
  );
}
