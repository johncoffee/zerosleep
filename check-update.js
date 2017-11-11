
export async function getVersion (url) {
  const response = await fetch(url)

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

export function isSemVerBigger (subject, reference) {
  return (subject.major > reference.major ||
    subject.minor > reference.minor ||
    subject.patch > reference.patch)
}