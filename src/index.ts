import { version } from '../package.json'
import BotDetector from './detector'
import { sources, WindowSizePayload, ProcessPayload, DistinctivePropertiesPayload } from './sources'
import { BotdError, BotDetectorInterface, BotKind, BotDetectionResult } from './types'

/**
 * Sends an unpersonalized AJAX request to collect installation statistics
 */
function monitor() {
  // The FingerprintJS CDN (https://github.com/fingerprintjs/cdn) replaces `window.__fpjs_d_m` with `true`
  if (window.__fpjs_d_m || Math.random() >= 0.001) {
    return
  }
  try {
    const request = new XMLHttpRequest()
    request.open('get', `https://m1.openfpcdn.io/botd/v${version}/npm-monitoring`, true)
    request.send()
  } catch (error) {
    // console.error is ok here because it's an unexpected error handler
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export async function load(options?: Record<keyof any, never>): Promise<BotDetectorInterface> {
  if (options?.monitoring ?? true) {
    monitor()
  }
  const detector = new BotDetector()
  await detector.collect()
  return detector
}

export default { load }

// The exports below are for private usage. They may change unexpectedly. Use them at your own risk.
/** Not documented, out of Semantic Versioning, usage is at your own risk */
export {
  sources,
  BotdError,
  WindowSizePayload,
  ProcessPayload,
  DistinctivePropertiesPayload,
  BotDetectionResult,
  BotKind,
}
