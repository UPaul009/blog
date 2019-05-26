import styled from 'styled-components';

const MenuButton = styled.button<{ open: boolean }>`
  position: ${props => (props.open ? 'fixed' : 'absolute')};
  top: constant(safe-area-inset-top);
  top: env(safe-area-inset-top);
  top: 2rem;
  left: constant(safe-area-inset-left);
  left: env(safe-area-inset-left);
  left: 2rem;
  appearance: none;
  height: 4rem;
  width: 4rem;
  background: none;
  border: none;
  padding: 0;
  z-index: 4;
  cursor: pointer;
  overflow: hidden;

  @supports (padding: max(0rem)) {
    left: max(2rem, env(safe-area-inset-left));
    top: max(2rem, env(safe-area-inset-top));
  }

  span {
    width: 100%;
    height: 0.2rem;
    background: ${props => (props.open ? 'transparent' : 'white')};
    display: block;
    position: relative;
    border-radius: 0.5rem;
    transition-property: background;
    transition-timing-function: ${props => (props.open ? 'ease-in' : 'open')};
    transition-duration: ${props => (props.open ? '350ms' : '150ms')};
    left: 0;

    &::before,
    &::after {
      content: '';
      width: 100%;
      height: 0.2rem;
      position: absolute;
      left: 0;
      background: white;
      border-radius: 0.5rem;
      transition: 150ms all ease;
      will-change: transform;
    }

    &::before {
      top: ${props => (props.open ? 0 : '-1rem')};
      transform: ${props => (props.open ? 'rotate(45deg)' : 'none')};
      transition-property: all;
      transition-timing-function: ${props => (props.open ? 'ease-in' : 'open')};
      transition-duration: ${props => (props.open ? '350ms' : '150ms')};
    }

    &::after {
      top: ${props => (props.open ? 0 : '1rem')};
      transition-property: all;
      transition-timing-function: ${props => (props.open ? 'ease-in' : 'open')};
      transition-duration: ${props => (props.open ? '350ms' : '150ms')};
      transform: ${props => (props.open ? 'rotate(-45deg)' : 'none')};
    }
  }
`;

export default MenuButton;
