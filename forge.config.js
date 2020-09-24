require('dotenv').config();

module.exports = {
  packagerConfig: {},
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      platforms: ['linux'],
      config: {
        repository: {
          owner: 'jonathangomz',
          name: 'notionlx'
        },
        prerelease: true,
        draft: true,
        authToken: process.env.GITHUB_TOKEN
      }
    }
  ],
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin'
      ]
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          name: 'NotionLX',
          productName: 'NotionLX',
          maintainer: 'Jonathan Gómez',
          homepage: 'https://jonathangomz.github.io/notionlx',
          icon: 'src/icons/icon.png',
          description: 'Simple Notion app for Linux',
          productDescription: "This is an unofficial and open source app to use Notion on Linux. It's in early version so still don't have some much support."
        }
      }
    }
  ]
}