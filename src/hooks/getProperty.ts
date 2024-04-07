import { useCallback } from 'react'
import type { RefObject } from 'react'

// 引数のtargetProperty をDOMRectのもつPropertyに限定する
type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>

// RefObjectの型は div, span, p, input などのさまざまなHTML要素に対応できるようにextendsで制限をかけつつ抽象化
export const useGetElementProperty = <T extends HTMLElement>(
  elementRef: RefObject<T>
): any => {
  const getElementProperty = useCallback(
    (targetProperty: DOMRectProperty): number => {
      const clientRect = elementRef.current?.getBoundingClientRect()
      /* eslint-disable-next-line */
      if (clientRect) {
        return clientRect[targetProperty]
      }

      // clientRect が undefined のときはデフォルトで0を返すようにする
      return 0
    },
    [elementRef]
  )

  return {
    getElementProperty
  }
}
