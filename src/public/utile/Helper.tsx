import { css, keyframes } from 'styled-components'

export const media = {
    desktop: (...args: any[]) => css`
    @media (min-width: 1025px) {
      ${ css.call(undefined, ...args)}
    }
  `,
    tablet: (...args: any[]) => css`
    @media (max-width: 1024px) {
      ${ css.call(undefined, ...args)}
    }
  `,
    phone: (...args: any[]) => css`
    @media (max-width: 568px) {
      ${ css.call(undefined, ...args)}
    }
  `
}