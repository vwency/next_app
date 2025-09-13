export interface MainMenuProps {
  contentRef?: React.RefObject<HTMLDivElement | null>
  isOpen: boolean
  toggleMenu: () => void
}
