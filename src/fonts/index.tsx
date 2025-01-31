
import localFont from 'next/font/local';

const Metropolis = localFont({
  src: [
    {
      path: './Metropolis-Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: './Metropolis-ExtraLight.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: './Metropolis-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './Metropolis-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './Metropolis-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Metropolis-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './Metropolis-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './Metropolis-ExtraBold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: './Metropolis-Black.woff2',
      weight: '900',
      style: 'normal'
    }
  ]
})

export {
  Metropolis
}