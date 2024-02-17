export function extractUrl(url: string): string {
  const splitedUrl = url.split('/')
  let file = splitedUrl[splitedUrl.length - 1]
  let folder = splitedUrl[splitedUrl.length - 2]

  return folder + '/' + file.split('.')[0]
}
