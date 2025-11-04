import clsx from 'clsx'
import { DynamicIcon } from 'lucide-react/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface Props {
  className?: string
  name: keyof typeof dynamicIconImports
  color: 'red' | 'blue' | 'green'
}

export const Icon = (props: Props) => {
  const { name, color } = props
  let hexcolor
  switch (color) {
    case 'blue':
      hexcolor = '#4040adff'
      break
    case 'green':
      hexcolor = '#1d7a4fff'
      break
    case 'red':
      hexcolor = '#d56b1aff'
      break

    default:
      hexcolor = 'white'
      break
  }
  return <DynamicIcon name={name} color={hexcolor} size={48} />
}
