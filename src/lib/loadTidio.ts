/** Tidio chat bundle — fixed HTTPS origin; vendor updates file so SRI is not maintained. */
const TIDIO_SRC = 'https://code.tidio.co/l1k0czafg1ylrp4862vjcronz9re151y.js'

/** Loads Tidio after idle (same timing as previous index.html async script). */
export function loadTidio(): void {
  if (typeof document === 'undefined') return
  if (document.querySelector('script[data-jashom-tidio]')) return

  const s = document.createElement('script')
  s.async = true
  s.src = TIDIO_SRC // NOSONAR
  s.dataset.jashomTidio = '1'
  document.body.appendChild(s)
}
