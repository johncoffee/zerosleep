
export async function getVersion (url) {
  const response = await fetch(url)
  if (response.status !== 200) {
    throw {message: `${url} responded ${response.status} (not 200 OK)`}
  }

  const text = await response.text()

  let matches = text.match(/version":\s*"(\d+)\.(\d+)\.(\d+)"/)
  if (matches && matches[1] && matches[2] && matches[3]) {
    const semver = {
      major: parseInt(matches[1], 10),
      minor: parseInt(matches[2], 10),
      patch: parseInt(matches[3], 10)
    }
    return semver
  }

  console.debug(text)
  console.debug(matches)
  throw {message: 'Failed getting version; bad version string'}
}

export function isMajorGreater (subject, reference) {
  return (subject.major > reference.major)
}