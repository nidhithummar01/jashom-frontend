/** Support Board chat — fixed HTTPS origin; vendor updates init.js so SRI is not maintained. */
const SUPPORT_BOARD_SRC =
  'https://cloud.board.support/account/js/init.js?id=1425557347'

/** Loads Support Board after idle (keeps third-party script out of index.html for Sonar SRI rule). */
export function loadSupportBoard(): void {
  if (typeof document === 'undefined') return
  if (document.querySelector('script[data-jashom-support-board]')) return

  const s = document.createElement('script')
  s.id = 'chat-init'
  s.async = true
  s.src = SUPPORT_BOARD_SRC // NOSONAR
  s.dataset.jashomSupportBoard = '1'
  document.body.appendChild(s)
}
