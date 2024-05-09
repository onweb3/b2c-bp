// src/app/sitemap.ts
import { GetServerSideProps } from "next";
import { Home } from "@/data/general/types";
import { MetadataRoute } from "next";
import {baseUrls,staticUrls, visaDetinationNationalityroutes,destinationUrl,attractionDetailsUrl } from "./sitemapconstants";

const baseUrl = 'mytravellerschoice.com';

export const getServerSideProps:GetServerSideProps<{}> = async (ctx)=>{
    ctx.res.setHeader('Content-Type','text/xml')
    const xml =await sitemap()
    ctx.res.write(xml)
    ctx.res.end()
    return {
        props:{}
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

 const baseUrl = 'mytravellerschoice.com';

  const mainUrls =await baseUrls(baseUrl)
  const staticurls = staticUrls(baseUrl)
  const visaDetinationNationalityUrls = await visaDetinationNationalityroutes(baseUrl)
  const destinations = await destinationUrl(baseUrl)
  const allAttraction = await attractionDetailsUrl(baseUrl)

  return [
    {
      url: `${mainUrls}`
    },
    {
      url: `${staticurls}`
    },
    {
      url: `${destinations}`
    },
    {
      url: `${allAttraction}`
    },
    {
      url: `${visaDetinationNationalityUrls}`
    },
  ];
}
