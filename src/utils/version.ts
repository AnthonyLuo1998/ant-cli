import axios from 'axios'
export async function getNpmLatestVersion(packageName: string) {
  if (!packageName) return
  const url = `https://registry.npmjs.org/${packageName}`
  const { data } = await axios.get(url)
  return data['dist-tags']['latest']
}
