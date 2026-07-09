import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nihongopath.surajindoriya.in'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/kana`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/kanji`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/vocabulary`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/grammar`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
    },
  ]
}