import styled from 'styled-components'

export const Overlay = styled.div`
  ${({ isOpen }) => isOpen && `
    opacity: 1;
  `}

  ${({ isOpen }) => !isOpen && `
    opacity: 0;
    pointer-events: none;
  `}

  transition: opacity .3s;
  background: rgba(0, 31, 60,.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 110;
  overflow: auto;
`

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  justify-content: center;
`

export const Title = styled.div`
  font-size: 24px;
  line-height: 1.33333;
  white-space: normal;
  font-weight: 600;
  min-height: 40px;
  padding: 0;
`

export const Dialog = styled.div`
  position: relative;
  padding: 30px 40px 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 4px 8px rgba(16,22,26,.2), 0 18px 46px 6px rgba(16,22,26,.2);
  background: #fff;
  width: ${({ defaultWidth }) => (defaultWidth || '500px')};
  pointer-events: all;
  user-select: text;
  z-index: 111;

  /* appearance */
  transition: transform .3s cubic-bezier(0.54, 1.12, 0.38, 1.11);
  &.popup-enter {
    transform: scale(0.5);
  }
  &.popup-enter-active {
    transform: scale(1);
  }
  &.popup-exit {
    transform: scale(1);
    transition: transform .3s linear;
  }
  &.popup-exit-active {
    transform: scale(0.5);
  }

  &:focus {
    outline: 0;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 5px 10px;
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  outline: none;
  background: #fff;

  :not(:hover) {
    fill: rgb(92, 112, 128);
  }

  svg {
    width: 11;
    height: 11;
  }
`
